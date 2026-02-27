import { useState } from 'react';
import { MuscleGroup, MusclePriority, ExperienceLevel } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { MuscleGroupPicker } from './MuscleGroupPicker';
import { generatePlan } from '../../engine/planGenerator';
import { useAppState } from '../../storage/AppContext';
import { getSplitForDays } from '../../data/splitTemplates';
import { getExerciseById } from '../../data/exercises';

const defaultPriorities = (): Record<MuscleGroup, MusclePriority> => {
  const p = {} as Record<MuscleGroup, MusclePriority>;
  for (const m of Object.values(MuscleGroup)) {
    p[m] = 'maintain';
  }
  return p;
};

export function AutoPlanWizard({ onComplete }: { onComplete: () => void }) {
  const { state, dispatch } = useAppState();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<ExperienceLevel>(state.userProfile.experienceLevel);
  const [days, setDays] = useState(4);
  const [weeks, setWeeks] = useState(5);
  const [priorities, setPriorities] = useState<Record<MuscleGroup, MusclePriority>>(defaultPriorities);
  const [planName, setPlanName] = useState('');

  function handleGenerate() {
    const plan = generatePlan({
      name: planName || `${getSplitForDays(days).name} Mesocycle`,
      daysPerWeek: days,
      experienceLevel: level,
      musclePriorities: priorities,
      mesocycleWeeks: weeks,
    });
    dispatch({ type: 'SET_MESOCYCLE', payload: plan });
    onComplete();
  }

  const split = getSplitForDays(days);

  return (
    <div className="space-y-6">
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Experience Level</h2>
          <p className="text-text-secondary text-sm">This affects volume recommendations</p>
          <div className="grid grid-cols-3 gap-3">
            {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`p-3 rounded-xl border text-sm font-medium capitalize transition-colors ${
                  level === l ? 'bg-accent/20 border-accent text-accent' : 'bg-bg-card border-border text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <Button onClick={() => setStep(1)} className="w-full">Next</Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Training Frequency</h2>
          <p className="text-text-secondary text-sm">How many days per week can you train?</p>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`p-3 rounded-xl border text-lg font-bold transition-colors ${
                  days === d ? 'bg-accent/20 border-accent text-accent' : 'bg-bg-card border-border text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {d}x
              </button>
            ))}
          </div>
          <p className="text-text-muted text-sm text-center">Suggested split: {split.name}</p>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text-secondary">Mesocycle Length</h3>
            <div className="grid grid-cols-3 gap-2">
              {[4, 5, 6].map(w => (
                <button
                  key={w}
                  onClick={() => setWeeks(w)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    weeks === w ? 'bg-accent/20 border-accent text-accent' : 'bg-bg-card border-border text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  {w} weeks
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(0)} className="flex-1">Back</Button>
            <Button onClick={() => setStep(2)} className="flex-1">Next</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Muscle Priorities</h2>
          <p className="text-text-secondary text-sm">Tap to cycle: Maintain → Focus → Exclude</p>
          <MuscleGroupPicker priorities={priorities} onChange={setPriorities} />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
            <Button onClick={() => setStep(3)} className="flex-1">Review Plan</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Review Plan</h2>
          <input
            type="text"
            value={planName}
            onChange={e => setPlanName(e.target.value)}
            placeholder={`${split.name} Mesocycle`}
            className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          />
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              {level} · {days}x/week · {weeks} weeks · {split.name}
            </p>
          </div>
          {split.days.map((day, i) => {
            const dayExercises = generatePlan({
              name: '',
              daysPerWeek: days,
              experienceLevel: level,
              musclePriorities: priorities,
              mesocycleWeeks: weeks,
            }).trainingDays[i];

            return (
              <Card key={i}>
                <h3 className="font-semibold text-sm mb-2">{day.name}</h3>
                <div className="space-y-1">
                  {dayExercises?.exercises.map((ex, j) => {
                    const def = getExerciseById(ex.exerciseId);
                    return (
                      <p key={j} className="text-xs text-text-secondary">
                        {def?.name ?? ex.exerciseId} — {ex.sets.length} sets × {ex.sets[0]?.reps} reps
                      </p>
                    );
                  })}
                </div>
              </Card>
            );
          })}
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">Back</Button>
            <Button onClick={handleGenerate} className="flex-1">Start Mesocycle</Button>
          </div>
        </div>
      )}
    </div>
  );
}

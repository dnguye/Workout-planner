import { useState } from 'react';
import { TrainingDay, PlannedExercise, ExerciseDefinition, Mesocycle, MuscleGroup, MusclePriority, MesocycleWeek } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ExercisePicker } from './ExercisePicker';
import { useAppState } from '../../storage/AppContext';
import { getExerciseById } from '../../data/exercises';
import { getVolumeLandmarks } from '../../data/volumeLandmarks';

export function CustomPlanEditor({ onComplete }: { onComplete: () => void }) {
  const { state, dispatch } = useAppState();
  const [planName, setPlanName] = useState('Custom Plan');
  const [days, setDays] = useState<TrainingDay[]>([
    { id: crypto.randomUUID(), name: 'Day 1', exercises: [] },
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [weeks, setWeeks] = useState(5);

  function addDay() {
    setDays([...days, { id: crypto.randomUUID(), name: `Day ${days.length + 1}`, exercises: [] }]);
  }

  function removeDay(idx: number) {
    if (days.length <= 1) return;
    setDays(days.filter((_, i) => i !== idx));
  }

  function addExercise(dayIdx: number, exercise: ExerciseDefinition) {
    const planned: PlannedExercise = {
      exerciseId: exercise.id,
      sets: Array.from({ length: 3 }, () => ({
        weight: null,
        reps: Math.round((exercise.repRangeLow + exercise.repRangeHigh) / 2),
        rir: 3,
      })),
    };
    const updated = [...days];
    updated[dayIdx] = { ...updated[dayIdx], exercises: [...updated[dayIdx].exercises, planned] };
    setDays(updated);
  }

  function removeExercise(dayIdx: number, exIdx: number) {
    const updated = [...days];
    updated[dayIdx] = {
      ...updated[dayIdx],
      exercises: updated[dayIdx].exercises.filter((_, i) => i !== exIdx),
    };
    setDays(updated);
  }

  function updateDayName(idx: number, name: string) {
    const updated = [...days];
    updated[idx] = { ...updated[idx], name };
    setDays(updated);
  }

  function updateSetCount(dayIdx: number, exIdx: number, count: number) {
    const updated = [...days];
    const ex = updated[dayIdx].exercises[exIdx];
    const def = getExerciseById(ex.exerciseId);
    const midReps = def ? Math.round((def.repRangeLow + def.repRangeHigh) / 2) : 10;

    if (count > ex.sets.length) {
      ex.sets = [...ex.sets, ...Array.from({ length: count - ex.sets.length }, () => ({ weight: null, reps: midReps, rir: 3 }))];
    } else {
      ex.sets = ex.sets.slice(0, count);
    }
    setDays(updated);
  }

  function handleCreate() {
    const level = state.userProfile.experienceLevel;
    const priorities: Record<MuscleGroup, MusclePriority> = {} as Record<MuscleGroup, MusclePriority>;
    for (const m of Object.values(MuscleGroup)) {
      priorities[m] = 'maintain';
    }

    const mesoWeeks: MesocycleWeek[] = Array.from({ length: weeks }, (_, i) => {
      const isDeload = i === weeks - 1;
      const targetRIR = isDeload ? 4 : Math.max(0, Math.round(3 - (i / Math.max(1, weeks - 2)) * 3));
      return {
        weekNumber: i + 1,
        isDeload,
        targetRIR,
        muscleSetTargets: Object.values(MuscleGroup).map(m => {
          const lm = getVolumeLandmarks(m, level);
          return { muscle: m, sets: isDeload ? Math.round(lm.mev * 0.5) : lm.mev };
        }),
      };
    });

    const mesocycle: Mesocycle = {
      id: crypto.randomUUID(),
      name: planName,
      weeks: mesoWeeks,
      trainingDays: days,
      musclePriorities: priorities,
      daysPerWeek: days.length,
      status: 'active',
      currentWeek: 1,
      currentDayIndex: 0,
      experienceLevel: level,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'SET_MESOCYCLE', payload: mesocycle });
    onComplete();
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={planName}
        onChange={e => setPlanName(e.target.value)}
        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary text-lg font-semibold focus:outline-none focus:border-accent"
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-text-secondary">Weeks:</label>
        <select
          value={weeks}
          onChange={e => setWeeks(Number(e.target.value))}
          className="bg-bg-primary border border-border rounded-lg px-3 py-1.5 text-text-primary text-sm focus:outline-none focus:border-accent"
        >
          {[4, 5, 6].map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      {days.map((day, dayIdx) => (
        <Card key={day.id}>
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              value={day.name}
              onChange={e => updateDayName(dayIdx, e.target.value)}
              className="bg-transparent font-semibold text-sm focus:outline-none border-b border-transparent focus:border-accent"
            />
            {days.length > 1 && (
              <button onClick={() => removeDay(dayIdx)} className="text-text-muted hover:text-danger text-xs">Remove</button>
            )}
          </div>
          <div className="space-y-2">
            {day.exercises.map((ex, exIdx) => {
              const def = getExerciseById(ex.exerciseId);
              return (
                <div key={exIdx} className="flex items-center justify-between bg-bg-primary rounded-lg px-3 py-2">
                  <div>
                    <span className="text-sm font-medium">{def?.name ?? ex.exerciseId}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="text-xs text-text-muted">Sets:</label>
                      <select
                        value={ex.sets.length}
                        onChange={e => updateSetCount(dayIdx, exIdx, Number(e.target.value))}
                        className="bg-bg-card border border-border rounded px-2 py-0.5 text-xs text-text-primary"
                      >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => removeExercise(dayIdx, exIdx)} className="text-text-muted hover:text-danger">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setActiveDayIdx(dayIdx); setPickerOpen(true); }}
            className="mt-2 w-full"
          >
            + Add Exercise
          </Button>
        </Card>
      ))}

      <Button variant="secondary" onClick={addDay} className="w-full">+ Add Training Day</Button>
      <Button onClick={handleCreate} className="w-full" disabled={days.every(d => d.exercises.length === 0)}>
        Create Mesocycle
      </Button>

      <ExercisePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={ex => addExercise(activeDayIdx, ex)}
      />
    </div>
  );
}

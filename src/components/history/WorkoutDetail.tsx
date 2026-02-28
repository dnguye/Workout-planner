import { WorkoutLog } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface WorkoutDetailProps {
  log: WorkoutLog;
  onBack: () => void;
}

export function WorkoutDetail({ log, onBack }: WorkoutDetailProps) {
  const date = new Date(log.date);

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-accent text-sm flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>

      <div>
        <h2 className="text-xl font-bold">{log.dayName}</h2>
        <p className="text-sm text-text-secondary">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          {' · '}{log.durationMinutes} min · Week {log.mesocycleWeek}
        </p>
      </div>

      {log.exercises.map((ex, i) => {
        const def = getExerciseById(ex.exerciseId);
        return (
          <Card key={i}>
            <h3 className="font-semibold text-sm mb-2">{def?.name ?? ex.exerciseId}</h3>
            <div className="space-y-0">
              <div className="flex gap-4 text-xs text-text-muted pb-1 border-b border-border mb-1">
                <span className="w-8">Set</span>
                <span className="w-16 text-center">Weight</span>
                <span className="w-12 text-center">Reps</span>
                <span className="w-12 text-center">RIR</span>
                <span className="flex-1">Notes</span>
              </div>
              {ex.sets.map((set, j) => (
                <div key={j} className="flex gap-4 text-sm py-1">
                  <span className="w-8 text-text-muted">{j + 1}</span>
                  <span className="w-16 text-center">{set.weight}</span>
                  <span className="w-12 text-center">{set.reps}</span>
                  <span className="w-12 text-center text-text-secondary">{set.rir}</span>
                  <span className="flex-1 text-xs italic text-text-secondary truncate">{set.notes ?? ''}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

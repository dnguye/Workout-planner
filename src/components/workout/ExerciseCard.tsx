import { useState, useRef } from 'react';
import { LoggedSet, ProgressionSuggestion, PlannedExercise, WorkoutLog } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { getProgressionSuggestion, getRestTime } from '../../engine/progressionEngine';
import { Badge } from '../ui/Badge';
import { RestTimer } from './RestTimer';

interface ExerciseCardProps {
  planned: PlannedExercise;
  targetRIR: number;
  previousLogs: WorkoutLog[];
  loggedSets: LoggedSet[];
  onSetLogged: (setIndex: number, set: LoggedSet) => void;
  weightUnit: string;
}

export function ExerciseCard({ planned, targetRIR, previousLogs, loggedSets, onSetLogged, weightUnit }: ExerciseCardProps) {
  const def = getExerciseById(planned.exerciseId);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const suggestionsRef = useRef<ProgressionSuggestion[]>(
    planned.sets.map((_, i) =>
      getProgressionSuggestion(planned.exerciseId, targetRIR, previousLogs, i)
    )
  );

  if (!def) return null;

  function handleLog(setIndex: number) {
    const suggestion = suggestionsRef.current[setIndex];
    const weight = (document.getElementById(`weight-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;
    const reps = (document.getElementById(`reps-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;
    const rir = (document.getElementById(`rir-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;

    onSetLogged(setIndex, {
      weight: parseFloat(weight) || suggestion.weight || 0,
      reps: parseInt(reps) || suggestion.reps,
      rir: parseInt(rir) ?? suggestion.rir,
    });

    setShowRestTimer(true);
  }

  const allLogged = loggedSets.length >= planned.sets.length;

  return (
    <div className={`bg-bg-card rounded-xl border border-border p-4 ${allLogged ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{def.name}</h3>
          <p className="text-xs text-text-muted">{def.repRangeLow}-{def.repRangeHigh} reps · RIR {targetRIR}</p>
        </div>
        <Badge color={def.type === 'compound' ? 'blue' : 'default'}>{def.type}</Badge>
      </div>

      {suggestionsRef.current[0]?.reason && (
        <p className="text-xs text-accent mb-3 bg-accent/10 rounded-lg px-3 py-1.5">
          {suggestionsRef.current[0].reason}
        </p>
      )}

      <div className="space-y-0">
        <div className="flex items-center gap-2 pb-1 mb-1 border-b border-border">
          <span className="text-xs text-text-muted w-6 text-center">Set</span>
          <span className="text-xs text-text-muted w-20 text-center">{weightUnit}</span>
          <span className="text-xs text-text-muted w-16 text-center">Reps</span>
          <span className="text-xs text-text-muted w-14 text-center">RIR</span>
          <span className="w-9" />
        </div>

        {planned.sets.map((_, i) => {
          const logged = loggedSets[i] ?? null;
          const suggestion = suggestionsRef.current[i];
          const isLogged = logged !== null;

          return (
            <div key={i} className={`flex items-center gap-2 py-1.5 ${isLogged ? 'opacity-50' : ''}`}>
              <span className="text-xs text-text-muted w-6 text-center">{i + 1}</span>
              <input
                id={`weight-${planned.exerciseId}-${i}`}
                type="number"
                defaultValue={logged?.weight ?? suggestion.weight ?? ''}
                placeholder={weightUnit}
                className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-20 text-text-primary focus:outline-none focus:border-accent"
                disabled={isLogged}
              />
              <input
                id={`reps-${planned.exerciseId}-${i}`}
                type="number"
                defaultValue={logged?.reps ?? suggestion.reps}
                className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-16 text-text-primary focus:outline-none focus:border-accent"
                disabled={isLogged}
              />
              <input
                id={`rir-${planned.exerciseId}-${i}`}
                type="number"
                defaultValue={logged?.rir ?? suggestion.rir}
                className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-14 text-text-primary focus:outline-none focus:border-accent"
                disabled={isLogged}
              />
              {!isLogged ? (
                <button
                  onClick={() => handleLog(i)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </button>
              ) : (
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-success/20 text-success shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showRestTimer && (
        <RestTimer
          initialSeconds={getRestTime(planned.exerciseId)}
          onDismiss={() => setShowRestTimer(false)}
        />
      )}
    </div>
  );
}

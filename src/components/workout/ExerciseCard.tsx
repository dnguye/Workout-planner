import { useState, useRef } from 'react';
import { LoggedSet, ProgressionSuggestion, PlannedExercise, WorkoutLog } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { getProgressionSuggestion, getRestTime } from '../../engine/progressionEngine';
import { Badge } from '../ui/Badge';
import { RestTimer } from './RestTimer';
import { MuscleIcon } from '../illustrations/MuscleIcons';

interface ExerciseCardProps {
  planned: PlannedExercise;
  targetRIR: number;
  previousLogs: WorkoutLog[];
  loggedSets: LoggedSet[];
  onSetLogged: (setIndex: number, set: LoggedSet) => void;
  onSetUndone: (setIndex: number) => void;
  weightUnit: string;
}

export function ExerciseCard({ planned, targetRIR, previousLogs, loggedSets, onSetLogged, onSetUndone, weightUnit }: ExerciseCardProps) {
  const def = getExerciseById(planned.exerciseId);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [lastLoggedIndex, setLastLoggedIndex] = useState<number | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const suggestionsRef = useRef<ProgressionSuggestion[]>(
    planned.sets.map((_, i) =>
      getProgressionSuggestion(planned.exerciseId, targetRIR, previousLogs, i)
    )
  );

  if (!def) return null;

  function toggleNotes(setIndex: number) {
    setExpandedNotes(prev => {
      const next = new Set(prev);
      if (next.has(setIndex)) next.delete(setIndex);
      else next.add(setIndex);
      return next;
    });
  }

  function handleLog(setIndex: number) {
    const suggestion = suggestionsRef.current[setIndex];
    const weight = (document.getElementById(`weight-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;
    const reps = (document.getElementById(`reps-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;
    const rir = (document.getElementById(`rir-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value;
    const notes = (document.getElementById(`notes-${planned.exerciseId}-${setIndex}`) as HTMLInputElement)?.value?.trim();

    const parsedRir = parseInt(rir);
    const loggedSet: LoggedSet = {
      weight: parseFloat(weight) || suggestion.weight || 0,
      reps: parseInt(reps) || suggestion.reps,
      rir: isNaN(parsedRir) ? suggestion.rir : parsedRir,
    };
    if (notes) loggedSet.notes = notes;
    onSetLogged(setIndex, loggedSet);

    setExpandedNotes(prev => {
      const next = new Set(prev);
      next.delete(setIndex);
      return next;
    });
    setLastLoggedIndex(setIndex);
    setShowRestTimer(true);
  }

  const allLogged = loggedSets.length >= planned.sets.length;

  return (
    <div className={`bg-bg-card rounded-xl border border-border p-4 ${allLogged ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-start gap-2">
          <MuscleIcon muscle={def.primaryMuscle} className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm">{def.name}</h3>
            <p className="text-xs text-text-muted">{def.repRangeLow}-{def.repRangeHigh} reps · RIR {targetRIR}</p>
          </div>
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
          <span className="w-7" />
        </div>

        {planned.sets.map((_, i) => {
          const logged = loggedSets[i] ?? null;
          const suggestion = suggestionsRef.current[i];
          const isLogged = logged !== null;
          const notesOpen = expandedNotes.has(i);

          return (
            <div key={i}>
              <div className={`flex items-center gap-2 py-1.5 ${isLogged ? 'opacity-50' : ''}`}>
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
                {!isLogged && (
                  <button
                    onClick={() => toggleNotes(i)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors shrink-0 ${notesOpen ? 'bg-accent/20 text-accent' : 'text-text-muted hover:text-text-secondary'}`}
                    title="Add note"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                )}
                {isLogged && <span className="w-7" />}
              </div>
              {!isLogged && notesOpen && (
                <div className="ml-8 mr-2 mb-1">
                  <input
                    id={`notes-${planned.exerciseId}-${i}`}
                    type="text"
                    maxLength={200}
                    placeholder="Add a note for this set..."
                    className="w-full bg-bg-primary border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent"
                  />
                </div>
              )}
              {isLogged && logged.notes && (
                <p className="ml-8 text-xs italic text-text-secondary mb-1">{logged.notes}</p>
              )}
            </div>
          );
        })}
      </div>

      {showRestTimer && (
        <RestTimer
          initialSeconds={getRestTime(planned.exerciseId)}
          onDismiss={() => setShowRestTimer(false)}
          onUndo={lastLoggedIndex !== null ? () => {
            onSetUndone(lastLoggedIndex);
            setLastLoggedIndex(null);
            setShowRestTimer(false);
          } : undefined}
        />
      )}
    </div>
  );
}

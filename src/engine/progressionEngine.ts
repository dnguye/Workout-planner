import { LoggedSet, ProgressionSuggestion, WorkoutLog } from '../types';
import { getExerciseById } from '../data/exercises';

export function getProgressionSuggestion(
  exerciseId: string,
  targetRIR: number,
  previousLogs: WorkoutLog[],
  setIndex: number
): ProgressionSuggestion {
  const exerciseDef = getExerciseById(exerciseId);
  if (!exerciseDef) {
    return { weight: null, reps: 10, rir: targetRIR, reason: 'Exercise not found' };
  }

  const { repRangeLow, repRangeHigh } = exerciseDef;
  const midReps = Math.round((repRangeLow + repRangeHigh) / 2);

  // Find last logged data for this exercise
  const lastLog = findLastExerciseLog(exerciseId, previousLogs);

  if (!lastLog || !lastLog.sets[setIndex]) {
    return {
      weight: null,
      reps: midReps,
      rir: targetRIR,
      reason: 'First session — start with moderate weight',
    };
  }

  const prevSet = lastLog.sets[setIndex];
  return calculateProgression(prevSet, repRangeLow, repRangeHigh, targetRIR);
}

function findLastExerciseLog(exerciseId: string, logs: WorkoutLog[]) {
  // Search logs in reverse chronological order
  const sorted = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  for (const log of sorted) {
    const ex = log.exercises.find(e => e.exerciseId === exerciseId);
    if (ex) return ex;
  }
  return null;
}

function calculateProgression(
  prevSet: LoggedSet,
  repRangeLow: number,
  repRangeHigh: number,
  targetRIR: number
): ProgressionSuggestion {
  const { weight, reps, rir } = prevSet;

  // If hit top of rep range with target RIR or less → increase weight, reset reps
  if (reps >= repRangeHigh && rir <= targetRIR) {
    const newWeight = Math.round(weight * 1.05 * 4) / 4; // Round to nearest 0.25
    return {
      weight: newWeight,
      reps: repRangeLow,
      rir: targetRIR,
      reason: `Hit ${reps} reps at top of range — increase weight to ${newWeight}`,
    };
  }

  // If RIR is too high (set was too easy) → add reps
  if (rir > targetRIR + 1) {
    const addReps = Math.min(2, repRangeHigh - reps);
    return {
      weight,
      reps: Math.min(reps + addReps, repRangeHigh),
      rir: targetRIR,
      reason: `Previous set felt easy (RIR ${rir}) — add reps`,
    };
  }

  // Default: add 1 rep at same weight
  if (reps < repRangeHigh) {
    return {
      weight,
      reps: reps + 1,
      rir: targetRIR,
      reason: 'Add 1 rep at same weight',
    };
  }

  // At top of range but didn't meet RIR threshold → keep same
  return {
    weight,
    reps,
    rir: targetRIR,
    reason: 'Maintain current performance',
  };
}

export function getRestTime(exerciseId: string): number {
  const def = getExerciseById(exerciseId);
  if (!def) return 120;
  return def.type === 'compound' ? 150 : 90;
}

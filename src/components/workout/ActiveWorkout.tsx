import { useState, useEffect, useRef } from 'react';
import { Mesocycle, LoggedSet, LoggedExercise, WorkoutLog } from '../../types';
import { getCurrentDay, getCurrentWeekInfo, advanceToNextWorkout } from '../../engine/mesocycleManager';
import { ExerciseCard } from './ExerciseCard';
import { WorkoutSummary } from './WorkoutSummary';
import { Button } from '../ui/Button';
import { useAppState } from '../../storage/AppContext';

interface ActiveWorkoutProps {
  mesocycle: Mesocycle;
}

export function ActiveWorkout({ mesocycle }: ActiveWorkoutProps) {
  const { state, dispatch } = useAppState();
  const session = state.activeWorkoutSession;
  const [completed, setCompleted] = useState(false);
  const [, setTick] = useState(0);

  const resumedAtRef = useRef(Date.now());
  const initialAccumulatedRef = useRef(session?.accumulatedMs ?? 0);
  const sessionActiveRef = useRef(true);

  const currentDay = getCurrentDay(mesocycle);
  const weekInfo = getCurrentWeekInfo(mesocycle);

  // Timer tick — updates every second
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Save accumulated time on unmount (pause)
  useEffect(() => {
    return () => {
      if (!sessionActiveRef.current) return;
      const totalAccumulated = initialAccumulatedRef.current + (Date.now() - resumedAtRef.current);
      dispatch({ type: 'UPDATE_WORKOUT_SESSION', payload: { accumulatedMs: totalAccumulated } });
    };
  }, [dispatch]);

  if (completed || !session) {
    return <WorkoutSummary logs={state.workoutLogs} mesocycleId={mesocycle.id} />;
  }

  const elapsed = initialAccumulatedRef.current + (Date.now() - resumedAtRef.current);

  function formatElapsed(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function handleSetLogged(exerciseId: string, setIndex: number, set: LoggedSet) {
    const existing = session!.exerciseLogs[exerciseId] || [];
    const updated = [...existing];
    updated[setIndex] = set;
    dispatch({
      type: 'UPDATE_WORKOUT_SESSION',
      payload: { exerciseLogs: { ...session!.exerciseLogs, [exerciseId]: updated } },
    });
  }

  function handleFinish() {
    const exercises: LoggedExercise[] = currentDay.exercises.map(ex => ({
      exerciseId: ex.exerciseId,
      sets: (session!.exerciseLogs[ex.exerciseId] || []).filter(Boolean),
    })).filter(ex => ex.sets.length > 0);

    const finalElapsed = initialAccumulatedRef.current + (Date.now() - resumedAtRef.current);

    const log: WorkoutLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      mesocycleId: mesocycle.id,
      mesocycleWeek: mesocycle.currentWeek,
      dayIndex: mesocycle.currentDayIndex,
      dayName: currentDay.name,
      exercises,
      durationMinutes: Math.round(finalElapsed / 60000),
    };

    dispatch({ type: 'LOG_WORKOUT', payload: log });
    const updated = advanceToNextWorkout(mesocycle);
    dispatch({ type: 'UPDATE_MESOCYCLE', payload: updated });
    dispatch({ type: 'CLEAR_WORKOUT_SESSION' });
    sessionActiveRef.current = false;
    setCompleted(true);
  }

  const exerciseLogs = session.exerciseLogs;
  const totalSets = currentDay.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const loggedSetsCount = Object.values(exerciseLogs).reduce((sum, sets) => sum + sets.filter(Boolean).length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{currentDay.name}</h1>
          <p className="text-sm text-text-secondary">
            Week {weekInfo.weekNumber} {weekInfo.isDeload ? '(Deload)' : ''} · RIR {weekInfo.targetRIR}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-bold text-accent">{formatElapsed(elapsed)}</p>
          <p className="text-xs text-text-muted">{loggedSetsCount}/{totalSets} sets</p>
        </div>
      </div>

      <div className="w-full bg-bg-secondary rounded-full h-2">
        <div
          className="bg-accent rounded-full h-2 transition-all"
          style={{ width: `${totalSets > 0 ? (loggedSetsCount / totalSets) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-4">
        {currentDay.exercises.map(ex => (
          <ExerciseCard
            key={ex.exerciseId}
            planned={ex}
            targetRIR={weekInfo.targetRIR}
            previousLogs={state.workoutLogs}
            loggedSets={exerciseLogs[ex.exerciseId] || []}
            onSetLogged={(setIdx, set) => handleSetLogged(ex.exerciseId, setIdx, set)}
            weightUnit={state.userProfile.weightUnit}
          />
        ))}
      </div>

      <Button
        onClick={handleFinish}
        className="w-full"
        disabled={loggedSetsCount === 0}
      >
        Finish Workout ({loggedSetsCount}/{totalSets} sets logged)
      </Button>
    </div>
  );
}

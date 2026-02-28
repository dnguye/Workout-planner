import { useAppState } from '../storage/AppContext';
import { ActiveWorkout } from '../components/workout/ActiveWorkout';
import { Button } from '../components/ui/Button';
import { EmptyPlanIllustration, MesocycleCompleteIllustration } from '../components/illustrations';
import { useNavigate } from 'react-router-dom';
import { getCurrentDay, getCurrentWeekInfo } from '../engine/mesocycleManager';
import { getExerciseById } from '../data/exercises';
import { Mesocycle } from '../types';
import { Badge } from '../components/ui/Badge';
import { MuscleIcon } from '../components/illustrations/MuscleIcons';

function WorkoutStartScreen({ mesocycle, onStart }: { mesocycle: Mesocycle; onStart: () => void }) {
  const currentDay = getCurrentDay(mesocycle);
  const weekInfo = getCurrentWeekInfo(mesocycle);
  const totalSets = currentDay.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <div className="space-y-5">
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">{currentDay.name}</h1>
        <p className="text-sm text-text-secondary mt-1">
          Week {weekInfo.weekNumber} {weekInfo.isDeload ? '(Deload)' : ''} · RIR {weekInfo.targetRIR}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {currentDay.exercises.length} exercises · {totalSets} sets
        </p>
      </div>

      <div className="space-y-2">
        {currentDay.exercises.map(ex => {
          const def = getExerciseById(ex.exerciseId);
          if (!def) return null;
          return (
            <div key={ex.exerciseId} className="bg-bg-card rounded-xl border border-border p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MuscleIcon muscle={def.primaryMuscle} className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-sm font-medium">{def.name}</p>
                  <p className="text-xs text-text-muted">{def.repRangeLow}-{def.repRangeHigh} reps</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge color={def.type === 'compound' ? 'blue' : 'default'}>{ex.sets.length} sets</Badge>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={onStart} className="w-full">
        Start Workout
      </Button>
    </div>
  );
}

export function WorkoutPage() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  if (!state.activeMesocycle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <EmptyPlanIllustration className="w-36 h-36" />
        <h1 className="text-xl font-bold">No Active Plan</h1>
        <p className="text-text-secondary text-sm">Create a mesocycle first to start a workout</p>
        <Button onClick={() => navigate('/plan')}>Create Plan</Button>
      </div>
    );
  }

  if (state.activeMesocycle.status === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <MesocycleCompleteIllustration className="w-36 h-36" />
        <h1 className="text-xl font-bold">Mesocycle Complete!</h1>
        <p className="text-text-secondary text-sm">Great work! Create a new plan to keep training.</p>
        <Button onClick={() => navigate('/plan')}>New Plan</Button>
      </div>
    );
  }

  if (!state.activeWorkoutSession) {
    return (
      <WorkoutStartScreen
        mesocycle={state.activeMesocycle}
        onStart={() => dispatch({ type: 'START_WORKOUT_SESSION' })}
      />
    );
  }

  return <ActiveWorkout mesocycle={state.activeMesocycle} />;
}

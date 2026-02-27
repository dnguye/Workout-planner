import { Mesocycle } from '../../types';
import { getCurrentDay, getCurrentWeekInfo } from '../../engine/mesocycleManager';
import { getExerciseById } from '../../data/exercises';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface NextWorkoutCardProps {
  mesocycle: Mesocycle;
}

export function NextWorkoutCard({ mesocycle }: NextWorkoutCardProps) {
  const navigate = useNavigate();
  const currentDay = getCurrentDay(mesocycle);
  const weekInfo = getCurrentWeekInfo(mesocycle);

  if (!currentDay) return null;

  return (
    <Card>
      <h3 className="text-sm text-text-muted mb-1">Next Workout</h3>
      <h2 className="text-lg font-bold mb-1">{currentDay.name}</h2>
      <p className="text-xs text-text-secondary mb-3">
        Week {weekInfo.weekNumber} · RIR {weekInfo.targetRIR} · {currentDay.exercises.length} exercises
      </p>
      <div className="space-y-1 mb-4">
        {currentDay.exercises.slice(0, 4).map(ex => {
          const def = getExerciseById(ex.exerciseId);
          return (
            <p key={ex.exerciseId} className="text-xs text-text-muted">
              {def?.name ?? ex.exerciseId} — {ex.sets.length}×{ex.sets[0]?.reps}
            </p>
          );
        })}
        {currentDay.exercises.length > 4 && (
          <p className="text-xs text-text-muted">+{currentDay.exercises.length - 4} more...</p>
        )}
      </div>
      <Button onClick={() => navigate('/workout')} className="w-full">
        Start Workout
      </Button>
    </Card>
  );
}

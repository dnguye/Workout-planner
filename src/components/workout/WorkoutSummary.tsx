import { WorkoutLog, MuscleGroup } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { WorkoutCompleteIllustration } from '../illustrations';
import { MuscleIcon } from '../illustrations/MuscleIcons';

interface WorkoutSummaryProps {
  logs: WorkoutLog[];
  mesocycleId: string;
}

export function WorkoutSummary({ logs, mesocycleId }: WorkoutSummaryProps) {
  const navigate = useNavigate();
  const lastLog = logs.filter(l => l.mesocycleId === mesocycleId).slice(-1)[0];

  if (!lastLog) {
    return <p className="text-text-muted text-center">No workout logged</p>;
  }

  // Calculate volume per muscle
  const muscleVolume: Record<string, number> = {};
  let totalSets = 0;
  let totalReps = 0;

  for (const ex of lastLog.exercises) {
    const def = getExerciseById(ex.exerciseId);
    if (!def) continue;
    const setCount = ex.sets.length;
    totalSets += setCount;
    totalReps += ex.sets.reduce((sum, s) => sum + s.reps, 0);
    muscleVolume[def.primaryMuscle] = (muscleVolume[def.primaryMuscle] || 0) + setCount;
    for (const sec of def.secondaryMuscles) {
      muscleVolume[sec] = (muscleVolume[sec] || 0) + setCount * 0.5;
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <WorkoutCompleteIllustration className="w-28 h-28 mx-auto mb-2" />
        <h2 className="text-xl font-bold">Workout Complete!</h2>
        <p className="text-text-secondary text-sm">{lastLog.dayName} · {lastLog.durationMinutes} min</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{totalSets}</p>
          <p className="text-xs text-text-muted">Total Sets</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{totalReps}</p>
          <p className="text-xs text-text-muted">Total Reps</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-accent">{lastLog.durationMinutes}</p>
          <p className="text-xs text-text-muted">Minutes</p>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-sm mb-3">Volume by Muscle</h3>
        <div className="space-y-2">
          {Object.entries(muscleVolume)
            .sort(([, a], [, b]) => b - a)
            .map(([muscle, sets]) => (
              <div key={muscle} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary flex items-center gap-1.5">
                  <MuscleIcon muscle={muscle as MuscleGroup} className="w-4 h-4" />
                  {muscle}
                </span>
                <Badge color="blue">{sets} sets</Badge>
              </div>
            ))}
        </div>
      </Card>

      <Button onClick={() => navigate('/')} className="w-full">Back to Dashboard</Button>
    </div>
  );
}

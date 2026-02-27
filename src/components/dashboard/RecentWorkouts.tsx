import { WorkoutLog } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { NoWorkoutsIllustration } from '../illustrations';

interface RecentWorkoutsProps {
  logs: WorkoutLog[];
}

export function RecentWorkouts({ logs }: RecentWorkoutsProps) {
  const recent = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  if (recent.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center py-4">
          <NoWorkoutsIllustration className="w-24 h-24 mb-2" />
          <p className="text-text-muted text-sm">No workouts logged yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Recent Workouts</h3>
      {recent.map(log => {
        const totalSets = log.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
        const date = new Date(log.date);
        return (
          <Card key={log.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{log.dayName}</p>
              <p className="text-xs text-text-muted">
                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {' · '}Week {log.mesocycleWeek}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{totalSets} sets</Badge>
              <Badge>{log.durationMinutes}m</Badge>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

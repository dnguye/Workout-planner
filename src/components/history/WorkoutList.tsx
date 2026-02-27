import { useState } from 'react';
import { WorkoutLog, MuscleGroup } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { WorkoutDetail } from './WorkoutDetail';

interface WorkoutListProps {
  logs: WorkoutLog[];
}

export function WorkoutList({ logs }: WorkoutListProps) {
  const [selectedLog, setSelectedLog] = useState<WorkoutLog | null>(null);
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>('all');

  const sorted = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered = muscleFilter === 'all'
    ? sorted
    : sorted.filter(log =>
        log.exercises.some(ex => {
          const def = getExerciseById(ex.exerciseId);
          return def?.primaryMuscle === muscleFilter;
        })
      );

  if (selectedLog) {
    return <WorkoutDetail log={selectedLog} onBack={() => setSelectedLog(null)} />;
  }

  return (
    <div className="space-y-3">
      <select
        value={muscleFilter}
        onChange={e => setMuscleFilter(e.target.value as MuscleGroup | 'all')}
        className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
      >
        <option value="all">All Muscles</option>
        {Object.values(MuscleGroup).map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {filtered.length === 0 ? (
        <Card>
          <p className="text-text-muted text-sm text-center py-8">No workouts found</p>
        </Card>
      ) : (
        filtered.map(log => {
          const totalSets = log.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
          const date = new Date(log.date);
          return (
            <Card key={log.id} onClick={() => setSelectedLog(log)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{log.dayName}</p>
                  <p className="text-xs text-text-muted">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-text-muted">Week {log.mesocycleWeek} · {log.exercises.length} exercises</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge>{totalSets} sets</Badge>
                  <Badge>{log.durationMinutes}m</Badge>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}

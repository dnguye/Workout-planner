import { useMemo, useState } from 'react';
import { WorkoutLog, LoggedSet } from '../../types';
import { exercises } from '../../data/exercises';
import { Card } from '../ui/Card';
import { NoChartDataIllustration } from '../illustrations';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ProgressionChartProps {
  logs: WorkoutLog[];
}

export function ProgressionChart({ logs }: ProgressionChartProps) {
  const [selectedExercise, setSelectedExercise] = useState('');

  const exercisesInLogs = useMemo(() => {
    const ids = new Set<string>();
    logs.forEach(l => l.exercises.forEach(ex => ids.add(ex.exerciseId)));
    return exercises.filter(e => ids.has(e.id));
  }, [logs]);

  const chartData = useMemo(() => {
    if (!selectedExercise) return [];
    return logs
      .filter(l => l.exercises.some(ex => ex.exerciseId === selectedExercise))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(l => {
        const ex = l.exercises.find(e => e.exerciseId === selectedExercise)!;
        const validSets = ex.sets.filter((s): s is LoggedSet => s != null);
        if (validSets.length === 0) return null;
        const bestSet = validSets.reduce((best, s) => (s.weight > best.weight ? s : best), validSets[0]);
        const avgWeight = validSets.reduce((sum, s) => sum + s.weight, 0) / validSets.length;
        const totalVolume = validSets.reduce((sum, s) => sum + s.weight * s.reps, 0);
        return {
          date: new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          topWeight: bestSet?.weight ?? 0,
          avgWeight: Math.round(avgWeight * 10) / 10,
          volume: Math.round(totalVolume),
          topReps: bestSet?.reps ?? 0,
        };
      })
      .filter(Boolean);
  }, [logs, selectedExercise]);

  return (
    <Card>
      <h3 className="font-semibold text-sm mb-3">Exercise Progression</h3>
      <select
        value={selectedExercise}
        onChange={e => setSelectedExercise(e.target.value)}
        className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent mb-3"
      >
        <option value="">Select exercise...</option>
        {exercisesInLogs.map(e => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>

      {chartData.length > 1 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333350" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9999b3' }} />
            <YAxis tick={{ fontSize: 10, fill: '#9999b3' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#222233', border: '1px solid #333350', borderRadius: '8px' }}
              labelStyle={{ color: '#e8e8f0' }}
            />
            <Line type="monotone" dataKey="topWeight" stroke="#6366f1" name="Top Weight" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="volume" stroke="#22c55e" name="Volume" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center py-4">
          <NoChartDataIllustration className="w-24 h-24 mb-2" />
          <p className="text-text-muted text-xs">
            {selectedExercise ? 'Need at least 2 sessions to chart' : 'Select an exercise to view progression'}
          </p>
        </div>
      )}
    </Card>
  );
}

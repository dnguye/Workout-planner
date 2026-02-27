import { useMemo } from 'react';
import { WorkoutLog, ExperienceLevel } from '../../types';
import { calculateWeeklyVolume } from '../../engine/volumeCalculator';
import { Card } from '../ui/Card';
import { NoChartDataIllustration } from '../illustrations';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface VolumeHistoryProps {
  logs: WorkoutLog[];
  mesocycleId: string;
  totalWeeks: number;
  experienceLevel: ExperienceLevel;
}

export function VolumeHistory({ logs, mesocycleId, totalWeeks }: VolumeHistoryProps) {
  const chartData = useMemo(() => {
    return Array.from({ length: totalWeeks }, (_, i) => {
      const week = i + 1;
      const vol = calculateWeeklyVolume(logs, week, mesocycleId);
      const totalSets = Object.values(vol).reduce((sum, v) => sum + v, 0);
      return { week: `W${week}`, totalSets: Math.round(totalSets) };
    });
  }, [logs, mesocycleId, totalWeeks]);

  return (
    <Card>
      <h3 className="font-semibold text-sm mb-3">Weekly Total Volume</h3>
      {chartData.some(d => d.totalSets > 0) ? (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333350" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9999b3' }} />
            <YAxis tick={{ fontSize: 10, fill: '#9999b3' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#222233', border: '1px solid #333350', borderRadius: '8px' }}
              labelStyle={{ color: '#e8e8f0' }}
            />
            <Bar dataKey="totalSets" fill="#6366f1" name="Total Sets" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center py-4">
          <NoChartDataIllustration className="w-24 h-24 mb-2" />
          <p className="text-text-muted text-xs">No volume data yet</p>
        </div>
      )}
    </Card>
  );
}

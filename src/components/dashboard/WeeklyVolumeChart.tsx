import { MuscleGroup, WorkoutLog, ExperienceLevel } from '../../types';
import { getMuscleVolumeStatuses, MuscleVolumeStatus } from '../../engine/volumeCalculator';
import { Card } from '../ui/Card';

interface WeeklyVolumeChartProps {
  logs: WorkoutLog[];
  mesocycleId: string;
  currentWeek: number;
  experienceLevel: ExperienceLevel;
}

const muscleLabels: Record<MuscleGroup, string> = {
  [MuscleGroup.Chest]: 'Chest',
  [MuscleGroup.Back]: 'Back',
  [MuscleGroup.Shoulders]: 'Shoulders',
  [MuscleGroup.Biceps]: 'Biceps',
  [MuscleGroup.Triceps]: 'Triceps',
  [MuscleGroup.Quads]: 'Quads',
  [MuscleGroup.Hamstrings]: 'Hams',
  [MuscleGroup.Glutes]: 'Glutes',
  [MuscleGroup.Calves]: 'Calves',
  [MuscleGroup.Abs]: 'Abs',
  [MuscleGroup.Forearms]: 'Forearms',
  [MuscleGroup.Traps]: 'Traps',
  [MuscleGroup.RearDelts]: 'Rear Delts',
};

const zoneColors: Record<MuscleVolumeStatus['zone'], string> = {
  below_mv: 'bg-zone-mv',
  mv_to_mev: 'bg-zone-mev',
  mev_to_mav: 'bg-zone-mav',
  mav: 'bg-zone-mav',
  above_mrv: 'bg-zone-over',
};

export function WeeklyVolumeChart({ logs, mesocycleId, currentWeek, experienceLevel }: WeeklyVolumeChartProps) {
  const statuses = getMuscleVolumeStatuses(logs, currentWeek, mesocycleId, experienceLevel);
  const maxMRV = Math.max(...statuses.map(s => s.landmarks.mrv));

  return (
    <Card>
      <h3 className="font-semibold text-sm mb-3">Weekly Volume (Sets)</h3>
      <div className="flex gap-2 text-xs text-text-muted mb-3 flex-wrap">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zone-mv" /> &lt;MV</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zone-mev" /> MV-MEV</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zone-mav" /> MEV-MRV</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zone-over" /> &gt;MRV</span>
      </div>
      <div className="space-y-2">
        {statuses
          .filter(s => s.totalSets > 0 || s.landmarks.mev > 0)
          .map(s => (
            <div key={s.muscle} className="flex items-center gap-2">
              <span className="text-xs text-text-muted w-16 truncate">{muscleLabels[s.muscle]}</span>
              <div className="flex-1 relative h-5 bg-bg-primary rounded">
                {/* MEV marker */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-zone-mev/40"
                  style={{ left: `${(s.landmarks.mev / maxMRV) * 100}%` }}
                />
                {/* MRV marker */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-zone-over/40"
                  style={{ left: `${(s.landmarks.mrv / maxMRV) * 100}%` }}
                />
                {/* Volume bar */}
                <div
                  className={`h-full rounded transition-all ${zoneColors[s.zone]}`}
                  style={{ width: `${Math.min((s.totalSets / maxMRV) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs font-mono text-text-secondary w-6 text-right">{s.totalSets}</span>
            </div>
          ))}
      </div>
    </Card>
  );
}

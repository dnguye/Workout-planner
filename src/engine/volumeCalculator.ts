import { MuscleGroup, WorkoutLog, ExperienceLevel, VolumeLandmarks } from '../types';
import { getExerciseById } from '../data/exercises';
import { getVolumeLandmarks } from '../data/volumeLandmarks';

export interface MuscleVolumeStatus {
  muscle: MuscleGroup;
  totalSets: number;
  landmarks: VolumeLandmarks;
  zone: 'below_mv' | 'mv_to_mev' | 'mev_to_mav' | 'mav' | 'above_mrv';
}

export function calculateWeeklyVolume(
  logs: WorkoutLog[],
  weekNumber: number,
  mesocycleId: string
): Record<MuscleGroup, number> {
  const volume: Record<string, number> = {};
  for (const m of Object.values(MuscleGroup)) {
    volume[m] = 0;
  }

  const weekLogs = logs.filter(l => l.mesocycleId === mesocycleId && l.mesocycleWeek === weekNumber);

  for (const log of weekLogs) {
    for (const ex of log.exercises) {
      const def = getExerciseById(ex.exerciseId);
      if (!def) continue;
      const setCount = ex.sets.length;
      volume[def.primaryMuscle] = (volume[def.primaryMuscle] || 0) + setCount;
      for (const sec of def.secondaryMuscles) {
        volume[sec] = (volume[sec] || 0) + setCount * 0.5;
      }
    }
  }

  return volume as Record<MuscleGroup, number>;
}

export function getVolumeZone(sets: number, landmarks: VolumeLandmarks): MuscleVolumeStatus['zone'] {
  if (sets < landmarks.mv) return 'below_mv';
  if (sets < landmarks.mev) return 'mv_to_mev';
  if (sets < landmarks.mavLow) return 'mev_to_mav';
  if (sets <= landmarks.mrv) return 'mav';
  return 'above_mrv';
}

export function getMuscleVolumeStatuses(
  logs: WorkoutLog[],
  weekNumber: number,
  mesocycleId: string,
  level: ExperienceLevel
): MuscleVolumeStatus[] {
  const weeklyVolume = calculateWeeklyVolume(logs, weekNumber, mesocycleId);

  return Object.values(MuscleGroup).map(muscle => {
    const landmarks = getVolumeLandmarks(muscle, level);
    const totalSets = weeklyVolume[muscle] || 0;
    return {
      muscle,
      totalSets: Math.round(totalSets * 10) / 10,
      landmarks,
      zone: getVolumeZone(totalSets, landmarks),
    };
  });
}

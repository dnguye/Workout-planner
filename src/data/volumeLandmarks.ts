import { MuscleGroup, VolumeLandmarks, ExperienceLevel } from '../types';

const intermediateLandmarks: Record<MuscleGroup, VolumeLandmarks> = {
  [MuscleGroup.Chest]:       { mv: 6,  mev: 8,  mavLow: 12, mavHigh: 18, mrv: 22 },
  [MuscleGroup.Back]:        { mv: 6,  mev: 8,  mavLow: 12, mavHigh: 18, mrv: 23 },
  [MuscleGroup.Shoulders]:   { mv: 4,  mev: 6,  mavLow: 10, mavHigh: 16, mrv: 22 },
  [MuscleGroup.Biceps]:      { mv: 4,  mev: 6,  mavLow: 10, mavHigh: 16, mrv: 20 },
  [MuscleGroup.Triceps]:     { mv: 4,  mev: 6,  mavLow: 8,  mavHigh: 14, mrv: 18 },
  [MuscleGroup.Quads]:       { mv: 6,  mev: 8,  mavLow: 12, mavHigh: 18, mrv: 22 },
  [MuscleGroup.Hamstrings]:  { mv: 4,  mev: 6,  mavLow: 10, mavHigh: 14, mrv: 18 },
  [MuscleGroup.Glutes]:      { mv: 0,  mev: 4,  mavLow: 8,  mavHigh: 14, mrv: 18 },
  [MuscleGroup.Calves]:      { mv: 4,  mev: 6,  mavLow: 8,  mavHigh: 14, mrv: 18 },
  [MuscleGroup.Abs]:         { mv: 0,  mev: 4,  mavLow: 8,  mavHigh: 16, mrv: 20 },
  [MuscleGroup.Forearms]:    { mv: 2,  mev: 4,  mavLow: 6,  mavHigh: 10, mrv: 14 },
  [MuscleGroup.Traps]:       { mv: 0,  mev: 4,  mavLow: 8,  mavHigh: 14, mrv: 20 },
  [MuscleGroup.RearDelts]:   { mv: 0,  mev: 4,  mavLow: 8,  mavHigh: 14, mrv: 20 },
};

function scaleLandmarks(landmarks: VolumeLandmarks, factor: number): VolumeLandmarks {
  return {
    mv:      Math.round(landmarks.mv * factor),
    mev:     Math.round(landmarks.mev * factor),
    mavLow:  Math.round(landmarks.mavLow * factor),
    mavHigh: Math.round(landmarks.mavHigh * factor),
    mrv:     Math.round(landmarks.mrv * factor),
  };
}

export function getVolumeLandmarks(muscle: MuscleGroup, level: ExperienceLevel): VolumeLandmarks {
  const base = intermediateLandmarks[muscle];
  switch (level) {
    case 'beginner':     return scaleLandmarks(base, 0.7);
    case 'intermediate': return base;
    case 'advanced':     return scaleLandmarks(base, 1.15);
  }
}

export function getAllVolumeLandmarks(level: ExperienceLevel): Record<MuscleGroup, VolumeLandmarks> {
  const result = {} as Record<MuscleGroup, VolumeLandmarks>;
  for (const muscle of Object.values(MuscleGroup)) {
    result[muscle] = getVolumeLandmarks(muscle, level);
  }
  return result;
}

import { MuscleGroup, SRAData } from '../types';

export const sraRecoveryData: SRAData[] = [
  { muscle: MuscleGroup.Chest,      recoveryHoursLow: 48, recoveryHoursHigh: 72, frequencyMin: 2, frequencyMax: 3 },
  { muscle: MuscleGroup.Back,       recoveryHoursLow: 48, recoveryHoursHigh: 72, frequencyMin: 2, frequencyMax: 4 },
  { muscle: MuscleGroup.Shoulders,  recoveryHoursLow: 48, recoveryHoursHigh: 72, frequencyMin: 2, frequencyMax: 3 },
  { muscle: MuscleGroup.Biceps,     recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 2, frequencyMax: 4 },
  { muscle: MuscleGroup.Triceps,    recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 2, frequencyMax: 4 },
  { muscle: MuscleGroup.Quads,      recoveryHoursLow: 48, recoveryHoursHigh: 96, frequencyMin: 2, frequencyMax: 3 },
  { muscle: MuscleGroup.Hamstrings, recoveryHoursLow: 48, recoveryHoursHigh: 72, frequencyMin: 2, frequencyMax: 3 },
  { muscle: MuscleGroup.Glutes,     recoveryHoursLow: 48, recoveryHoursHigh: 72, frequencyMin: 2, frequencyMax: 3 },
  { muscle: MuscleGroup.Calves,     recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 3, frequencyMax: 5 },
  { muscle: MuscleGroup.Abs,        recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 3, frequencyMax: 5 },
  { muscle: MuscleGroup.Forearms,   recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 2, frequencyMax: 4 },
  { muscle: MuscleGroup.Traps,      recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 2, frequencyMax: 4 },
  { muscle: MuscleGroup.RearDelts,  recoveryHoursLow: 36, recoveryHoursHigh: 48, frequencyMin: 2, frequencyMax: 4 },
];

export function getSRAData(muscle: MuscleGroup): SRAData {
  return sraRecoveryData.find(d => d.muscle === muscle)!;
}

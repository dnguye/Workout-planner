import { MuscleGroup, SplitTemplate } from '../types';

const M = MuscleGroup;

export const splitTemplates: SplitTemplate[] = [
  {
    id: 'full_body_2',
    name: 'Full Body 2x',
    daysPerWeek: 2,
    days: [
      { name: 'Full Body A', muscleGroups: [M.Chest, M.Back, M.Shoulders, M.Quads, M.Hamstrings, M.Glutes, M.Biceps, M.Triceps, M.Abs] },
      { name: 'Full Body B', muscleGroups: [M.Chest, M.Back, M.Shoulders, M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.RearDelts, M.Abs] },
    ],
  },
  {
    id: 'full_body_3',
    name: 'Full Body 3x',
    daysPerWeek: 3,
    days: [
      { name: 'Full Body A', muscleGroups: [M.Chest, M.Back, M.Quads, M.Shoulders, M.Biceps, M.Abs] },
      { name: 'Full Body B', muscleGroups: [M.Chest, M.Back, M.Hamstrings, M.Glutes, M.Triceps, M.Calves] },
      { name: 'Full Body C', muscleGroups: [M.Chest, M.Back, M.Quads, M.Shoulders, M.RearDelts, M.Abs] },
    ],
  },
  {
    id: 'ppl_3',
    name: 'Push/Pull/Legs 3x',
    daysPerWeek: 3,
    days: [
      { name: 'Push', muscleGroups: [M.Chest, M.Shoulders, M.Triceps] },
      { name: 'Pull', muscleGroups: [M.Back, M.Biceps, M.RearDelts, M.Forearms, M.Traps] },
      { name: 'Legs', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
    ],
  },
  {
    id: 'upper_lower_4',
    name: 'Upper/Lower 4x',
    daysPerWeek: 4,
    days: [
      { name: 'Upper A', muscleGroups: [M.Chest, M.Back, M.Shoulders, M.Biceps, M.Triceps] },
      { name: 'Lower A', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
      { name: 'Upper B', muscleGroups: [M.Chest, M.Back, M.Shoulders, M.RearDelts, M.Traps] },
      { name: 'Lower B', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
    ],
  },
  {
    id: 'ulppl_5',
    name: 'Upper/Lower + PPL 5x',
    daysPerWeek: 5,
    days: [
      { name: 'Upper', muscleGroups: [M.Chest, M.Back, M.Shoulders, M.Biceps, M.Triceps] },
      { name: 'Lower', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
      { name: 'Push', muscleGroups: [M.Chest, M.Shoulders, M.Triceps] },
      { name: 'Pull', muscleGroups: [M.Back, M.Biceps, M.RearDelts, M.Forearms, M.Traps] },
      { name: 'Legs', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
    ],
  },
  {
    id: 'ppl_6',
    name: 'Push/Pull/Legs 6x',
    daysPerWeek: 6,
    days: [
      { name: 'Push A', muscleGroups: [M.Chest, M.Shoulders, M.Triceps] },
      { name: 'Pull A', muscleGroups: [M.Back, M.Biceps, M.RearDelts, M.Traps] },
      { name: 'Legs A', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
      { name: 'Push B', muscleGroups: [M.Chest, M.Shoulders, M.Triceps] },
      { name: 'Pull B', muscleGroups: [M.Back, M.Biceps, M.RearDelts, M.Forearms] },
      { name: 'Legs B', muscleGroups: [M.Quads, M.Hamstrings, M.Glutes, M.Calves, M.Abs] },
    ],
  },
];

export function getSplitForDays(days: number): SplitTemplate {
  if (days <= 2) return splitTemplates.find(s => s.id === 'full_body_2')!;
  if (days === 3) return splitTemplates.find(s => s.id === 'ppl_3')!;
  if (days === 4) return splitTemplates.find(s => s.id === 'upper_lower_4')!;
  if (days === 5) return splitTemplates.find(s => s.id === 'ulppl_5')!;
  return splitTemplates.find(s => s.id === 'ppl_6')!;
}

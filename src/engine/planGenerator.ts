import {
  MuscleGroup, Mesocycle, MesocycleWeek, TrainingDay, PlannedExercise,
  ExperienceLevel, MusclePriority, MuscleSetTarget,
} from '../types';
import { getSplitForDays } from '../data/splitTemplates';
import { getVolumeLandmarks } from '../data/volumeLandmarks';
import { getCompoundExercises, getIsolationExercises } from '../data/exercises';

interface PlanConfig {
  name: string;
  daysPerWeek: number;
  experienceLevel: ExperienceLevel;
  musclePriorities: Record<MuscleGroup, MusclePriority>;
  mesocycleWeeks: number;
}

export function generatePlan(config: PlanConfig): Mesocycle {
  const { name, daysPerWeek, experienceLevel, musclePriorities, mesocycleWeeks } = config;
  const split = getSplitForDays(daysPerWeek);

  // Build training days with exercises
  const trainingDays: TrainingDay[] = split.days.map((day, idx) => {
    const activeMuscles = day.muscleGroups.filter(m => musclePriorities[m] !== 'exclude');
    const exercises = selectExercisesForDay(activeMuscles, musclePriorities, experienceLevel, split.daysPerWeek, idx);

    return {
      id: crypto.randomUUID(),
      name: day.name,
      exercises,
    };
  });

  // Build week-by-week progression
  const weeks = buildWeekProgression(mesocycleWeeks, musclePriorities, experienceLevel, daysPerWeek);

  return {
    id: crypto.randomUUID(),
    name,
    weeks,
    trainingDays,
    musclePriorities,
    daysPerWeek,
    status: 'active',
    currentWeek: 1,
    currentDayIndex: 0,
    experienceLevel,
    createdAt: new Date().toISOString(),
  };
}

function selectExercisesForDay(
  muscles: MuscleGroup[],
  priorities: Record<MuscleGroup, MusclePriority>,
  level: ExperienceLevel,
  _daysPerWeek: number,
  dayIndex: number
): PlannedExercise[] {
  const planned: PlannedExercise[] = [];

  for (const muscle of muscles) {
    const priority = priorities[muscle];
    if (priority === 'exclude') continue;

    const compounds = getCompoundExercises(muscle);
    const isolations = getIsolationExercises(muscle);

    const landmarks = getVolumeLandmarks(muscle, level);
    const setsPerSession = priority === 'focus'
      ? Math.ceil(landmarks.mev / Math.max(2, Math.floor(_daysPerWeek / 2)))
      : Math.ceil(landmarks.mv / Math.max(1, Math.floor(_daysPerWeek / 2)));

    const targetSets = Math.max(2, Math.min(setsPerSession, 5));

    // Pick exercises - compound first if available, vary by day index
    if (compounds.length > 0) {
      const compoundIdx = dayIndex % compounds.length;
      const compoundSets = Math.min(targetSets, priority === 'focus' ? 4 : 3);
      planned.push(makeExercise(compounds[compoundIdx].id, compoundSets, compounds[compoundIdx].repRangeLow, compounds[compoundIdx].repRangeHigh));

      const remainingSets = targetSets - compoundSets;
      if (remainingSets > 0 && isolations.length > 0) {
        const isoIdx = dayIndex % isolations.length;
        planned.push(makeExercise(isolations[isoIdx].id, remainingSets, isolations[isoIdx].repRangeLow, isolations[isoIdx].repRangeHigh));
      }
    } else if (isolations.length > 0) {
      const isoIdx = dayIndex % isolations.length;
      planned.push(makeExercise(isolations[isoIdx].id, targetSets, isolations[isoIdx].repRangeLow, isolations[isoIdx].repRangeHigh));
    }
  }

  return planned;
}

function makeExercise(exerciseId: string, sets: number, repLow: number, repHigh: number): PlannedExercise {
  const midReps = Math.round((repLow + repHigh) / 2);
  return {
    exerciseId,
    sets: Array.from({ length: sets }, () => ({
      weight: null,
      reps: midReps,
      rir: 3,
    })),
  };
}

function buildWeekProgression(
  totalWeeks: number,
  priorities: Record<MuscleGroup, MusclePriority>,
  level: ExperienceLevel,
  daysPerWeek: number
): MesocycleWeek[] {
  const weeks: MesocycleWeek[] = [];
  const rampWeeks = totalWeeks - 1; // Last week is deload

  for (let w = 1; w <= totalWeeks; w++) {
    const isDeload = w === totalWeeks;
    // RIR ramps down: week 1 = 3-4, last training week = 0-1, deload = 4
    const targetRIR = isDeload ? 4 : Math.max(0, Math.round(3 - ((w - 1) / Math.max(1, rampWeeks - 1)) * 3));

    const muscleSetTargets: MuscleSetTarget[] = Object.values(MuscleGroup)
      .filter(m => priorities[m] !== 'exclude')
      .map(muscle => {
        const lm = getVolumeLandmarks(muscle, level);
        const isFocus = priorities[muscle] === 'focus';

        if (isDeload) {
          return { muscle, sets: Math.round(lm.mev * 0.5) };
        }

        const startSets = isFocus ? lm.mev : lm.mv;
        const endSets = isFocus ? lm.mavHigh : lm.mev;
        const progress = (w - 1) / Math.max(1, rampWeeks - 1);
        const weekSets = Math.round(startSets + (endSets - startSets) * progress);

        return { muscle, sets: weekSets };
      });

    weeks.push({ weekNumber: w, isDeload, targetRIR, muscleSetTargets });
  }

  return weeks;
}

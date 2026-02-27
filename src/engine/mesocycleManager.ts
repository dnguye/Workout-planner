import { Mesocycle, WorkoutLog } from '../types';

export function advanceToNextWorkout(mesocycle: Mesocycle): Mesocycle {
  const nextDayIndex = mesocycle.currentDayIndex + 1;

  if (nextDayIndex >= mesocycle.trainingDays.length) {
    // Move to next week
    const nextWeek = mesocycle.currentWeek + 1;
    if (nextWeek > mesocycle.weeks.length) {
      return { ...mesocycle, status: 'completed' };
    }
    return { ...mesocycle, currentWeek: nextWeek, currentDayIndex: 0 };
  }

  return { ...mesocycle, currentDayIndex: nextDayIndex };
}

export function getCurrentWeekInfo(mesocycle: Mesocycle) {
  const week = mesocycle.weeks.find(w => w.weekNumber === mesocycle.currentWeek);
  return week ?? mesocycle.weeks[0];
}

export function getCurrentDay(mesocycle: Mesocycle) {
  return mesocycle.trainingDays[mesocycle.currentDayIndex];
}

export function getMesocycleProgress(mesocycle: Mesocycle): number {
  const totalWorkouts = mesocycle.weeks.length * mesocycle.trainingDays.length;
  const completedWorkouts = (mesocycle.currentWeek - 1) * mesocycle.trainingDays.length + mesocycle.currentDayIndex;
  return Math.round((completedWorkouts / totalWorkouts) * 100);
}

export function getWorkoutsForWeek(logs: WorkoutLog[], mesocycleId: string, week: number): WorkoutLog[] {
  return logs.filter(l => l.mesocycleId === mesocycleId && l.mesocycleWeek === week);
}

export function triggerDeload(mesocycle: Mesocycle): Mesocycle {
  const deloadWeek = mesocycle.weeks.find(w => w.isDeload);
  if (!deloadWeek) return mesocycle;
  return {
    ...mesocycle,
    currentWeek: deloadWeek.weekNumber,
    currentDayIndex: 0,
  };
}

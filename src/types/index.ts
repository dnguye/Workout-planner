export enum MuscleGroup {
  Chest = 'Chest',
  Back = 'Back',
  Shoulders = 'Shoulders',
  Biceps = 'Biceps',
  Triceps = 'Triceps',
  Quads = 'Quads',
  Hamstrings = 'Hamstrings',
  Glutes = 'Glutes',
  Calves = 'Calves',
  Abs = 'Abs',
  Forearms = 'Forearms',
  Traps = 'Traps',
  RearDelts = 'RearDelts',
}

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type WeightUnit = 'lbs' | 'kg';
export type MusclePriority = 'focus' | 'maintain' | 'exclude';
export type MesocycleStatus = 'active' | 'completed' | 'planned';
export type ExerciseType = 'compound' | 'isolation';
export type MovementPattern = 'horizontal_push' | 'vertical_push' | 'horizontal_pull' | 'vertical_pull' | 'hip_hinge' | 'squat' | 'lunge' | 'curl' | 'extension' | 'lateral_raise' | 'fly' | 'calf_raise' | 'ab_flexion' | 'shrug' | 'reverse_fly' | 'press' | 'row';

export interface VolumeLandmarks {
  mv: number;
  mev: number;
  mavLow: number;
  mavHigh: number;
  mrv: number;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  type: ExerciseType;
  movementPattern: MovementPattern;
  repRangeLow: number;
  repRangeHigh: number;
}

export interface PlannedSet {
  weight: number | null;
  reps: number;
  rir: number;
}

export interface PlannedExercise {
  exerciseId: string;
  sets: PlannedSet[];
}

export interface TrainingDay {
  id: string;
  name: string;
  exercises: PlannedExercise[];
}

export interface MuscleSetTarget {
  muscle: MuscleGroup;
  sets: number;
}

export interface MesocycleWeek {
  weekNumber: number;
  isDeload: boolean;
  targetRIR: number;
  muscleSetTargets: MuscleSetTarget[];
}

export interface Mesocycle {
  id: string;
  name: string;
  weeks: MesocycleWeek[];
  trainingDays: TrainingDay[];
  musclePriorities: Record<MuscleGroup, MusclePriority>;
  daysPerWeek: number;
  status: MesocycleStatus;
  currentWeek: number;
  currentDayIndex: number;
  experienceLevel: ExperienceLevel;
  createdAt: string;
}

export interface LoggedSet {
  weight: number;
  reps: number;
  rir: number;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: LoggedSet[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  mesocycleId: string;
  mesocycleWeek: number;
  dayIndex: number;
  dayName: string;
  exercises: LoggedExercise[];
  durationMinutes: number;
}

export interface UserProfile {
  experienceLevel: ExperienceLevel;
  weightUnit: WeightUnit;
  onboardingComplete: boolean;
}

export interface ActiveWorkoutSession {
  accumulatedMs: number;
  exerciseLogs: Record<string, LoggedSet[]>;
}

export interface AppState {
  userProfile: UserProfile;
  activeMesocycle: Mesocycle | null;
  mesocycleHistory: Mesocycle[];
  workoutLogs: WorkoutLog[];
  activeWorkoutSession: ActiveWorkoutSession | null;
}

export interface SplitTemplate {
  id: string;
  name: string;
  daysPerWeek: number;
  days: { name: string; muscleGroups: MuscleGroup[] }[];
}

export interface SRAData {
  muscle: MuscleGroup;
  recoveryHoursLow: number;
  recoveryHoursHigh: number;
  frequencyMin: number;
  frequencyMax: number;
}

export interface ProgressionSuggestion {
  weight: number | null;
  reps: number;
  rir: number;
  reason: string;
}

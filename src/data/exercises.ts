import { ExerciseDefinition, MuscleGroup as M, ExerciseType, MovementPattern } from '../types';

const C: ExerciseType = 'compound';
const I: ExerciseType = 'isolation';

export const exercises: ExerciseDefinition[] = [
  // === CHEST ===
  { id: 'bb_bench_press',      name: 'Barbell Bench Press',       primaryMuscle: M.Chest, secondaryMuscles: [M.Triceps, M.Shoulders], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 5, repRangeHigh: 12 },
  { id: 'db_bench_press',      name: 'Dumbbell Bench Press',      primaryMuscle: M.Chest, secondaryMuscles: [M.Triceps, M.Shoulders], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'incline_bb_bench',    name: 'Incline Barbell Bench',     primaryMuscle: M.Chest, secondaryMuscles: [M.Shoulders, M.Triceps], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 6, repRangeHigh: 12 },
  { id: 'incline_db_bench',    name: 'Incline Dumbbell Bench',    primaryMuscle: M.Chest, secondaryMuscles: [M.Shoulders, M.Triceps], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'db_fly',              name: 'Dumbbell Fly',              primaryMuscle: M.Chest, secondaryMuscles: [], type: I, movementPattern: 'fly' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'cable_fly',           name: 'Cable Fly',                 primaryMuscle: M.Chest, secondaryMuscles: [], type: I, movementPattern: 'fly' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'pec_deck',            name: 'Pec Deck Machine',          primaryMuscle: M.Chest, secondaryMuscles: [], type: I, movementPattern: 'fly' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'machine_chest_press', name: 'Machine Chest Press',       primaryMuscle: M.Chest, secondaryMuscles: [M.Triceps, M.Shoulders], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'dips_chest',          name: 'Dips (Chest Focus)',        primaryMuscle: M.Chest, secondaryMuscles: [M.Triceps, M.Shoulders], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 6, repRangeHigh: 15 },

  // === BACK ===
  { id: 'bb_row',              name: 'Barbell Row',               primaryMuscle: M.Back, secondaryMuscles: [M.Biceps, M.RearDelts], type: C, movementPattern: 'horizontal_pull' as MovementPattern, repRangeLow: 6, repRangeHigh: 12 },
  { id: 'db_row',              name: 'Dumbbell Row',              primaryMuscle: M.Back, secondaryMuscles: [M.Biceps, M.RearDelts], type: C, movementPattern: 'horizontal_pull' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'pullups',             name: 'Pull-Ups',                  primaryMuscle: M.Back, secondaryMuscles: [M.Biceps], type: C, movementPattern: 'vertical_pull' as MovementPattern, repRangeLow: 5, repRangeHigh: 12 },
  { id: 'lat_pulldown',        name: 'Lat Pulldown',              primaryMuscle: M.Back, secondaryMuscles: [M.Biceps], type: C, movementPattern: 'vertical_pull' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'cable_row',           name: 'Seated Cable Row',          primaryMuscle: M.Back, secondaryMuscles: [M.Biceps, M.RearDelts], type: C, movementPattern: 'horizontal_pull' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'chest_supported_row', name: 'Chest Supported Row',       primaryMuscle: M.Back, secondaryMuscles: [M.Biceps, M.RearDelts], type: C, movementPattern: 'horizontal_pull' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'machine_row',         name: 'Machine Row',               primaryMuscle: M.Back, secondaryMuscles: [M.Biceps], type: C, movementPattern: 'row' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'tbar_row',            name: 'T-Bar Row',                 primaryMuscle: M.Back, secondaryMuscles: [M.Biceps, M.RearDelts], type: C, movementPattern: 'horizontal_pull' as MovementPattern, repRangeLow: 6, repRangeHigh: 12 },
  { id: 'straight_arm_pd',     name: 'Straight Arm Pulldown',     primaryMuscle: M.Back, secondaryMuscles: [], type: I, movementPattern: 'vertical_pull' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },

  // === SHOULDERS ===
  { id: 'ohp',                 name: 'Overhead Press',            primaryMuscle: M.Shoulders, secondaryMuscles: [M.Triceps], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 5, repRangeHigh: 10 },
  { id: 'db_ohp',              name: 'Dumbbell Overhead Press',   primaryMuscle: M.Shoulders, secondaryMuscles: [M.Triceps], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 12 },
  { id: 'db_lateral_raise',    name: 'Dumbbell Lateral Raise',    primaryMuscle: M.Shoulders, secondaryMuscles: [], type: I, movementPattern: 'lateral_raise' as MovementPattern, repRangeLow: 12, repRangeHigh: 25 },
  { id: 'cable_lateral_raise', name: 'Cable Lateral Raise',       primaryMuscle: M.Shoulders, secondaryMuscles: [], type: I, movementPattern: 'lateral_raise' as MovementPattern, repRangeLow: 12, repRangeHigh: 25 },
  { id: 'machine_lateral_raise', name: 'Machine Lateral Raise',   primaryMuscle: M.Shoulders, secondaryMuscles: [], type: I, movementPattern: 'lateral_raise' as MovementPattern, repRangeLow: 12, repRangeHigh: 25 },
  { id: 'machine_shoulder_press', name: 'Machine Shoulder Press', primaryMuscle: M.Shoulders, secondaryMuscles: [M.Triceps], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'arnold_press',        name: 'Arnold Press',              primaryMuscle: M.Shoulders, secondaryMuscles: [M.Triceps], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 8, repRangeHigh: 12 },

  // === BICEPS ===
  { id: 'bb_curl',             name: 'Barbell Curl',              primaryMuscle: M.Biceps, secondaryMuscles: [M.Forearms], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'db_curl',             name: 'Dumbbell Curl',             primaryMuscle: M.Biceps, secondaryMuscles: [M.Forearms], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'incline_db_curl',     name: 'Incline Dumbbell Curl',     primaryMuscle: M.Biceps, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 15 },
  { id: 'hammer_curl',         name: 'Hammer Curl',               primaryMuscle: M.Biceps, secondaryMuscles: [M.Forearms], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'preacher_curl',       name: 'Preacher Curl',             primaryMuscle: M.Biceps, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'cable_curl',          name: 'Cable Curl',                primaryMuscle: M.Biceps, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'machine_curl',        name: 'Machine Curl',              primaryMuscle: M.Biceps, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'spider_curl',         name: 'Spider Curl',               primaryMuscle: M.Biceps, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 15 },

  // === TRICEPS ===
  { id: 'close_grip_bench',    name: 'Close Grip Bench Press',    primaryMuscle: M.Triceps, secondaryMuscles: [M.Chest], type: C, movementPattern: 'horizontal_push' as MovementPattern, repRangeLow: 6, repRangeHigh: 12 },
  { id: 'tricep_pushdown',     name: 'Tricep Pushdown',           primaryMuscle: M.Triceps, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'overhead_tricep_ext', name: 'Overhead Tricep Extension', primaryMuscle: M.Triceps, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 10, repRangeHigh: 15 },
  { id: 'skull_crushers',      name: 'Skull Crushers',            primaryMuscle: M.Triceps, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'dips_triceps',        name: 'Dips (Tricep Focus)',       primaryMuscle: M.Triceps, secondaryMuscles: [M.Chest, M.Shoulders], type: C, movementPattern: 'vertical_push' as MovementPattern, repRangeLow: 6, repRangeHigh: 15 },
  { id: 'cable_kickback',      name: 'Cable Kickback',            primaryMuscle: M.Triceps, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
  { id: 'machine_tricep_ext',  name: 'Machine Tricep Extension',  primaryMuscle: M.Triceps, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },

  // === QUADS ===
  { id: 'bb_squat',            name: 'Barbell Squat',             primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'squat' as MovementPattern, repRangeLow: 5, repRangeHigh: 10 },
  { id: 'front_squat',         name: 'Front Squat',               primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'squat' as MovementPattern, repRangeLow: 5, repRangeHigh: 10 },
  { id: 'leg_press',           name: 'Leg Press',                 primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'squat' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'hack_squat',          name: 'Hack Squat',                primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'squat' as MovementPattern, repRangeLow: 8, repRangeHigh: 12 },
  { id: 'leg_extension',       name: 'Leg Extension',             primaryMuscle: M.Quads, secondaryMuscles: [], type: I, movementPattern: 'extension' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'bulgarian_split',     name: 'Bulgarian Split Squat',     primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'lunge' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'walking_lunge',       name: 'Walking Lunge',             primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes, M.Hamstrings], type: C, movementPattern: 'lunge' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'goblet_squat',        name: 'Goblet Squat',              primaryMuscle: M.Quads, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'squat' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },

  // === HAMSTRINGS ===
  { id: 'rdl',                 name: 'Romanian Deadlift',         primaryMuscle: M.Hamstrings, secondaryMuscles: [M.Glutes, M.Back], type: C, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 6, repRangeHigh: 12 },
  { id: 'lying_leg_curl',      name: 'Lying Leg Curl',            primaryMuscle: M.Hamstrings, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'seated_leg_curl',     name: 'Seated Leg Curl',           primaryMuscle: M.Hamstrings, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'db_rdl',              name: 'Dumbbell RDL',              primaryMuscle: M.Hamstrings, secondaryMuscles: [M.Glutes], type: C, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'good_morning',        name: 'Good Morning',              primaryMuscle: M.Hamstrings, secondaryMuscles: [M.Glutes, M.Back], type: C, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 8, repRangeHigh: 12 },
  { id: 'nordic_curl',         name: 'Nordic Hamstring Curl',     primaryMuscle: M.Hamstrings, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 5, repRangeHigh: 10 },

  // === GLUTES ===
  { id: 'hip_thrust',          name: 'Barbell Hip Thrust',        primaryMuscle: M.Glutes, secondaryMuscles: [M.Hamstrings], type: C, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'cable_pull_through',  name: 'Cable Pull Through',        primaryMuscle: M.Glutes, secondaryMuscles: [M.Hamstrings], type: I, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
  { id: 'glute_bridge',        name: 'Glute Bridge',              primaryMuscle: M.Glutes, secondaryMuscles: [M.Hamstrings], type: I, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'hip_abduction',       name: 'Hip Abduction Machine',     primaryMuscle: M.Glutes, secondaryMuscles: [], type: I, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 12, repRangeHigh: 25 },
  { id: 'kickback_cable',      name: 'Cable Glute Kickback',      primaryMuscle: M.Glutes, secondaryMuscles: [M.Hamstrings], type: I, movementPattern: 'hip_hinge' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },

  // === CALVES ===
  { id: 'standing_calf_raise', name: 'Standing Calf Raise',       primaryMuscle: M.Calves, secondaryMuscles: [], type: I, movementPattern: 'calf_raise' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'seated_calf_raise',   name: 'Seated Calf Raise',         primaryMuscle: M.Calves, secondaryMuscles: [], type: I, movementPattern: 'calf_raise' as MovementPattern, repRangeLow: 12, repRangeHigh: 25 },
  { id: 'leg_press_calf',      name: 'Leg Press Calf Raise',      primaryMuscle: M.Calves, secondaryMuscles: [], type: I, movementPattern: 'calf_raise' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'smith_calf_raise',    name: 'Smith Machine Calf Raise',  primaryMuscle: M.Calves, secondaryMuscles: [], type: I, movementPattern: 'calf_raise' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },

  // === ABS ===
  { id: 'cable_crunch',        name: 'Cable Crunch',              primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'hanging_leg_raise',   name: 'Hanging Leg Raise',         primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'ab_wheel',            name: 'Ab Wheel Rollout',          primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 8, repRangeHigh: 15 },
  { id: 'decline_crunch',      name: 'Decline Crunch',            primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'machine_crunch',      name: 'Machine Crunch',            primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'leg_raise',           name: 'Lying Leg Raise',           primaryMuscle: M.Abs, secondaryMuscles: [], type: I, movementPattern: 'ab_flexion' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },

  // === FOREARMS ===
  { id: 'wrist_curl',          name: 'Wrist Curl',                primaryMuscle: M.Forearms, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 15, repRangeHigh: 30 },
  { id: 'reverse_wrist_curl',  name: 'Reverse Wrist Curl',        primaryMuscle: M.Forearms, secondaryMuscles: [], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 15, repRangeHigh: 30 },
  { id: 'reverse_curl',        name: 'Reverse Curl',              primaryMuscle: M.Forearms, secondaryMuscles: [M.Biceps], type: I, movementPattern: 'curl' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },

  // === TRAPS ===
  { id: 'bb_shrug',            name: 'Barbell Shrug',             primaryMuscle: M.Traps, secondaryMuscles: [], type: I, movementPattern: 'shrug' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'db_shrug',            name: 'Dumbbell Shrug',            primaryMuscle: M.Traps, secondaryMuscles: [], type: I, movementPattern: 'shrug' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'machine_shrug',       name: 'Machine Shrug',             primaryMuscle: M.Traps, secondaryMuscles: [], type: I, movementPattern: 'shrug' as MovementPattern, repRangeLow: 10, repRangeHigh: 20 },
  { id: 'cable_shrug',         name: 'Cable Shrug',               primaryMuscle: M.Traps, secondaryMuscles: [], type: I, movementPattern: 'shrug' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },

  // === REAR DELTS ===
  { id: 'face_pull',           name: 'Face Pull',                 primaryMuscle: M.RearDelts, secondaryMuscles: [M.Traps], type: I, movementPattern: 'reverse_fly' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
  { id: 'reverse_pec_deck',    name: 'Reverse Pec Deck',          primaryMuscle: M.RearDelts, secondaryMuscles: [M.Traps], type: I, movementPattern: 'reverse_fly' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
  { id: 'db_reverse_fly',      name: 'Dumbbell Reverse Fly',      primaryMuscle: M.RearDelts, secondaryMuscles: [M.Traps], type: I, movementPattern: 'reverse_fly' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
  { id: 'cable_reverse_fly',   name: 'Cable Reverse Fly',         primaryMuscle: M.RearDelts, secondaryMuscles: [M.Traps], type: I, movementPattern: 'reverse_fly' as MovementPattern, repRangeLow: 12, repRangeHigh: 20 },
];

export function getExerciseById(id: string): ExerciseDefinition | undefined {
  return exercises.find(e => e.id === id);
}

export function getExercisesForMuscle(muscle: M): ExerciseDefinition[] {
  return exercises.filter(e => e.primaryMuscle === muscle);
}

export function getCompoundExercises(muscle: M): ExerciseDefinition[] {
  return exercises.filter(e => e.primaryMuscle === muscle && e.type === 'compound');
}

export function getIsolationExercises(muscle: M): ExerciseDefinition[] {
  return exercises.filter(e => e.primaryMuscle === muscle && e.type === 'isolation');
}

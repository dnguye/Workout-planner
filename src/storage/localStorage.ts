import { AppState, UserProfile } from '../types';

const STORAGE_KEY = 'rp-workout-planner';
const VERSION_KEY = 'rp-workout-planner-version';
const CURRENT_VERSION = 1;

const defaultProfile: UserProfile = {
  experienceLevel: 'intermediate',
  weightUnit: 'lbs',
  onboardingComplete: false,
};

const defaultState: AppState = {
  userProfile: defaultProfile,
  activeMesocycle: null,
  mesocycleHistory: [],
  workoutLogs: [],
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw) as AppState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(VERSION_KEY);
}

export function exportData(): string {
  const state = loadState();
  return JSON.stringify(state, null, 2);
}

export function importData(json: string): AppState {
  const parsed = JSON.parse(json) as AppState;
  saveState(parsed);
  return parsed;
}

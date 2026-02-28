import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, ActiveWorkoutSession, Mesocycle, WorkoutLog, UserProfile } from '../types';
import { loadState, saveState } from './localStorage';

type Action =
  | { type: 'SET_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_MESOCYCLE'; payload: Mesocycle }
  | { type: 'UPDATE_MESOCYCLE'; payload: Partial<Mesocycle> }
  | { type: 'COMPLETE_MESOCYCLE' }
  | { type: 'LOG_WORKOUT'; payload: WorkoutLog }
  | { type: 'DELETE_WORKOUT'; payload: string }
  | { type: 'IMPORT_STATE'; payload: AppState }
  | { type: 'CLEAR_ALL' }
  | { type: 'START_WORKOUT_SESSION' }
  | { type: 'UPDATE_WORKOUT_SESSION'; payload: Partial<ActiveWorkoutSession> }
  | { type: 'CLEAR_WORKOUT_SESSION' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, userProfile: { ...state.userProfile, ...action.payload } };

    case 'SET_MESOCYCLE':
      return { ...state, activeMesocycle: action.payload };

    case 'UPDATE_MESOCYCLE':
      if (!state.activeMesocycle) return state;
      return { ...state, activeMesocycle: { ...state.activeMesocycle, ...action.payload } };

    case 'COMPLETE_MESOCYCLE':
      if (!state.activeMesocycle) return state;
      return {
        ...state,
        mesocycleHistory: [...state.mesocycleHistory, { ...state.activeMesocycle, status: 'completed' }],
        activeMesocycle: null,
      };

    case 'LOG_WORKOUT':
      return { ...state, workoutLogs: [...state.workoutLogs, action.payload] };

    case 'DELETE_WORKOUT':
      return { ...state, workoutLogs: state.workoutLogs.filter(w => w.id !== action.payload) };

    case 'IMPORT_STATE':
      return action.payload;

    case 'CLEAR_ALL':
      return {
        userProfile: { experienceLevel: 'intermediate', weightUnit: 'lbs', onboardingComplete: false },
        activeMesocycle: null,
        mesocycleHistory: [],
        workoutLogs: [],
        activeWorkoutSession: null,
      };

    case 'START_WORKOUT_SESSION':
      return { ...state, activeWorkoutSession: { accumulatedMs: 0, exerciseLogs: {} } };

    case 'UPDATE_WORKOUT_SESSION':
      if (!state.activeWorkoutSession) return state;
      return { ...state, activeWorkoutSession: { ...state.activeWorkoutSession, ...action.payload } };

    case 'CLEAR_WORKOUT_SESSION':
      return { ...state, activeWorkoutSession: null };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

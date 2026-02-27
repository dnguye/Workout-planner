import { ExperienceLevel, WeightUnit } from '../../types';
import { useAppState } from '../../storage/AppContext';
import { Card } from '../ui/Card';

export function UserProfileForm() {
  const { state, dispatch } = useAppState();
  const { experienceLevel, weightUnit } = state.userProfile;

  return (
    <Card>
      <h3 className="font-semibold text-sm mb-4">Profile</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-text-secondary block mb-2">Experience Level</label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(l => (
              <button
                key={l}
                onClick={() => dispatch({ type: 'SET_PROFILE', payload: { experienceLevel: l } })}
                className={`p-2 rounded-lg border text-sm capitalize transition-colors ${
                  experienceLevel === l ? 'bg-accent/20 border-accent text-accent' : 'bg-bg-primary border-border text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm text-text-secondary block mb-2">Weight Unit</label>
          <div className="grid grid-cols-2 gap-2">
            {(['lbs', 'kg'] as WeightUnit[]).map(u => (
              <button
                key={u}
                onClick={() => dispatch({ type: 'SET_PROFILE', payload: { weightUnit: u } })}
                className={`p-2 rounded-lg border text-sm uppercase transition-colors ${
                  weightUnit === u ? 'bg-accent/20 border-accent text-accent' : 'bg-bg-primary border-border text-text-secondary hover:bg-bg-hover'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

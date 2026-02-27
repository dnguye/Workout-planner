import { useNavigate } from 'react-router-dom';
import { useAppState } from '../storage/AppContext';
import { UserProfileForm } from '../components/settings/UserProfileForm';
import { DataManagement } from '../components/settings/DataManagement';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { triggerDeload } from '../engine/mesocycleManager';
import { EducationIllustration } from '../components/illustrations';

export function SettingsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Settings</h1>

      <UserProfileForm />

      {state.activeMesocycle && (
        <Card>
          <h3 className="font-semibold text-sm mb-4">Mesocycle Controls</h3>
          <div className="space-y-3">
            <Button
              variant="secondary"
              onClick={() => {
                const updated = triggerDeload(state.activeMesocycle!);
                dispatch({ type: 'UPDATE_MESOCYCLE', payload: updated });
              }}
              className="w-full"
            >
              Trigger Deload Week
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('End this mesocycle?')) {
                  dispatch({ type: 'COMPLETE_MESOCYCLE' });
                }
              }}
              className="w-full"
            >
              End Mesocycle
            </Button>
          </div>
        </Card>
      )}

      <DataManagement />

      <Card onClick={() => navigate('/learn')}>
        <div className="flex items-center gap-3">
          <EducationIllustration className="w-12 h-12 shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">Learn the Science</h3>
            <p className="text-xs text-text-muted">Glossary, volume landmarks, training tips</p>
          </div>
          <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>

      <Card>
        <p className="text-xs text-text-muted text-center">
          Ultra Instinct Trainer v1.0
          <br />Optimizing workout with evidence based science
        </p>
      </Card>
    </div>
  );
}

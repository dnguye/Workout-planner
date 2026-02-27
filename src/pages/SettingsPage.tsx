import { useAppState } from '../storage/AppContext';
import { UserProfileForm } from '../components/settings/UserProfileForm';
import { DataManagement } from '../components/settings/DataManagement';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { triggerDeload } from '../engine/mesocycleManager';

export function SettingsPage() {
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

      <Card>
        <p className="text-xs text-text-muted text-center">
          Ultra Instinct Trainer v1.0
          <br />Optimizing workout with evidence based science
        </p>
      </Card>
    </div>
  );
}

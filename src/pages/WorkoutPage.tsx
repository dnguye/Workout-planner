import { useAppState } from '../storage/AppContext';
import { ActiveWorkout } from '../components/workout/ActiveWorkout';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function WorkoutPage() {
  const { state } = useAppState();
  const navigate = useNavigate();

  if (!state.activeMesocycle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h1 className="text-xl font-bold">No Active Plan</h1>
        <p className="text-text-secondary text-sm">Create a mesocycle first to start a workout</p>
        <Button onClick={() => navigate('/plan')}>Create Plan</Button>
      </div>
    );
  }

  if (state.activeMesocycle.status === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h1 className="text-xl font-bold">Mesocycle Complete!</h1>
        <p className="text-text-secondary text-sm">Great work! Create a new plan to keep training.</p>
        <Button onClick={() => navigate('/plan')}>New Plan</Button>
      </div>
    );
  }

  return <ActiveWorkout mesocycle={state.activeMesocycle} />;
}

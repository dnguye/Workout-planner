import { useAppState } from '../storage/AppContext';
import { MesocycleOverview } from '../components/dashboard/MesocycleOverview';
import { NextWorkoutCard } from '../components/dashboard/NextWorkoutCard';
import { WeeklyVolumeChart } from '../components/dashboard/WeeklyVolumeChart';
import { RecentWorkouts } from '../components/dashboard/RecentWorkouts';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const { activeMesocycle, workoutLogs } = state;

  if (!activeMesocycle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">No Active Plan</h1>
          <p className="text-text-secondary text-sm">Create a mesocycle to start training</p>
        </div>
        <Button onClick={() => navigate('/plan')} size="lg">Create Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <MesocycleOverview mesocycle={activeMesocycle} />
      <NextWorkoutCard mesocycle={activeMesocycle} />
      <WeeklyVolumeChart
        logs={workoutLogs}
        mesocycleId={activeMesocycle.id}
        currentWeek={activeMesocycle.currentWeek}
        experienceLevel={activeMesocycle.experienceLevel}
      />
      <RecentWorkouts logs={workoutLogs} />
    </div>
  );
}

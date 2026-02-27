import { useState } from 'react';
import { useAppState } from '../storage/AppContext';
import { WorkoutList } from '../components/history/WorkoutList';
import { ProgressionChart } from '../components/history/ProgressionChart';
import { VolumeHistory } from '../components/history/VolumeHistory';
import { NoChartDataIllustration } from '../components/illustrations';

type Tab = 'workouts' | 'progression' | 'volume';

export function HistoryPage() {
  const { state } = useAppState();
  const [tab, setTab] = useState<Tab>('workouts');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'workouts', label: 'Workouts' },
    { id: 'progression', label: 'Progression' },
    { id: 'volume', label: 'Volume' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">History</h1>

      <div className="flex bg-bg-secondary rounded-lg p-1 gap-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.id ? 'bg-bg-card text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'workouts' && <WorkoutList logs={state.workoutLogs} />}
      {tab === 'progression' && <ProgressionChart logs={state.workoutLogs} />}
      {tab === 'volume' && state.activeMesocycle && (
        <VolumeHistory
          logs={state.workoutLogs}
          mesocycleId={state.activeMesocycle.id}
          totalWeeks={state.activeMesocycle.weeks.length}
          experienceLevel={state.activeMesocycle.experienceLevel}
        />
      )}
      {tab === 'volume' && !state.activeMesocycle && (
        <div className="flex flex-col items-center py-6">
          <NoChartDataIllustration className="w-28 h-28 mb-2" />
          <p className="text-text-muted text-sm">No active mesocycle for volume tracking</p>
        </div>
      )}
    </div>
  );
}

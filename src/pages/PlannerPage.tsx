import { useState } from 'react';
import { useAppState } from '../storage/AppContext';
import { AutoPlanWizard } from '../components/planner/AutoPlanWizard';
import { CustomPlanEditor } from '../components/planner/CustomPlanEditor';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export function PlannerPage() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'choose' | 'auto' | 'custom'>('choose');

  function handleComplete() {
    navigate('/');
  }

  // If there's an active mesocycle, show info about it
  if (state.activeMesocycle && mode === 'choose') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Current Plan</h1>
        <Card>
          <h2 className="font-semibold mb-1">{state.activeMesocycle.name}</h2>
          <p className="text-sm text-text-secondary">
            Week {state.activeMesocycle.currentWeek} of {state.activeMesocycle.weeks.length}
            {' · '}{state.activeMesocycle.daysPerWeek}x/week
          </p>
        </Card>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm('End current mesocycle and start a new one?')) {
              dispatch({ type: 'COMPLETE_MESOCYCLE' });
            }
          }}
          className="w-full"
        >
          End Mesocycle
        </Button>
        <div className="pt-4">
          <p className="text-sm text-text-muted text-center">Or create a new plan:</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Button variant="secondary" onClick={() => setMode('auto')}>Auto Generate</Button>
            <Button variant="secondary" onClick={() => setMode('custom')}>Custom Plan</Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'choose') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Create Plan</h1>
        <Card onClick={() => setMode('auto')} className="cursor-pointer">
          <h2 className="font-semibold mb-1">Auto Generate</h2>
          <p className="text-sm text-text-muted">
            Answer a few questions and get a personalized mesocycle based on RP principles
          </p>
        </Card>
        <Card onClick={() => setMode('custom')} className="cursor-pointer">
          <h2 className="font-semibold mb-1">Custom Plan</h2>
          <p className="text-sm text-text-muted">
            Build your own plan from scratch — pick exercises, sets, and structure
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setMode('choose')}
        className="text-accent text-sm flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
      <h1 className="text-xl font-bold">{mode === 'auto' ? 'Auto Generate Plan' : 'Custom Plan'}</h1>
      {mode === 'auto' ? (
        <AutoPlanWizard onComplete={handleComplete} />
      ) : (
        <CustomPlanEditor onComplete={handleComplete} />
      )}
    </div>
  );
}

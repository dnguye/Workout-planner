import { Mesocycle } from '../../types';
import { getMesocycleProgress } from '../../engine/mesocycleManager';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MesocycleOverviewProps {
  mesocycle: Mesocycle;
}

export function MesocycleOverview({ mesocycle }: MesocycleOverviewProps) {
  const progress = getMesocycleProgress(mesocycle);
  const currentWeek = mesocycle.weeks.find(w => w.weekNumber === mesocycle.currentWeek);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold">{mesocycle.name}</h2>
        {currentWeek?.isDeload && <Badge color="yellow">Deload</Badge>}
      </div>
      <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
        <span>Week {mesocycle.currentWeek} of {mesocycle.weeks.length}</span>
        <span>RIR {currentWeek?.targetRIR}</span>
      </div>
      <div className="w-full bg-bg-primary rounded-full h-3">
        <div
          className="bg-accent rounded-full h-3 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {mesocycle.weeks.map(w => (
          <div
            key={w.weekNumber}
            className={`flex-1 h-1 mx-0.5 rounded-full ${
              w.weekNumber < mesocycle.currentWeek
                ? 'bg-success'
                : w.weekNumber === mesocycle.currentWeek
                ? 'bg-accent'
                : w.isDeload
                ? 'bg-warning/30'
                : 'bg-bg-hover'
            }`}
          />
        ))}
      </div>
    </Card>
  );
}

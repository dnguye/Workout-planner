import { MuscleGroup, MusclePriority } from '../../types';
import { Chip } from '../ui/Chip';
import { MuscleIcon } from '../illustrations/MuscleIcons';

interface MuscleGroupPickerProps {
  priorities: Record<MuscleGroup, MusclePriority>;
  onChange: (priorities: Record<MuscleGroup, MusclePriority>) => void;
}

const muscleLabels: Record<MuscleGroup, string> = {
  [MuscleGroup.Chest]: 'Chest',
  [MuscleGroup.Back]: 'Back',
  [MuscleGroup.Shoulders]: 'Shoulders',
  [MuscleGroup.Biceps]: 'Biceps',
  [MuscleGroup.Triceps]: 'Triceps',
  [MuscleGroup.Quads]: 'Quads',
  [MuscleGroup.Hamstrings]: 'Hamstrings',
  [MuscleGroup.Glutes]: 'Glutes',
  [MuscleGroup.Calves]: 'Calves',
  [MuscleGroup.Abs]: 'Abs',
  [MuscleGroup.Forearms]: 'Forearms',
  [MuscleGroup.Traps]: 'Traps',
  [MuscleGroup.RearDelts]: 'Rear Delts',
};

const priorityCycle: MusclePriority[] = ['maintain', 'focus', 'exclude'];

export function MuscleGroupPicker({ priorities, onChange }: MuscleGroupPickerProps) {
  function cyclePriority(muscle: MuscleGroup) {
    const current = priorities[muscle];
    const nextIdx = (priorityCycle.indexOf(current) + 1) % priorityCycle.length;
    onChange({ ...priorities, [muscle]: priorityCycle[nextIdx] });
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Focus</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Maintain</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> Exclude</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.values(MuscleGroup).map(muscle => {
          const priority = priorities[muscle];
          const color = priority === 'focus' ? 'green' : priority === 'exclude' ? 'red' : 'yellow';
          return (
            <Chip
              key={muscle}
              label={muscleLabels[muscle]}
              icon={<MuscleIcon muscle={muscle} className="w-4 h-4" />}
              selected={true}
              color={color}
              onClick={() => cyclePriority(muscle)}
            />
          );
        })}
      </div>
    </div>
  );
}

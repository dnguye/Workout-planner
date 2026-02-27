import { useState } from 'react';
import { MuscleGroup, ExerciseDefinition } from '../../types';
import { exercises } from '../../data/exercises';
import { Modal } from '../ui/Modal';

interface ExercisePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (exercise: ExerciseDefinition) => void;
  filterMuscle?: MuscleGroup;
}

export function ExercisePicker({ open, onClose, onSelect, filterMuscle }: ExercisePickerProps) {
  const [search, setSearch] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>(filterMuscle ?? 'all');

  const filtered = exercises.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = muscleFilter === 'all' || e.primaryMuscle === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  return (
    <Modal open={open} onClose={onClose} title="Select Exercise">
      <div className="space-y-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search exercises..."
          className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        />
        <select
          value={muscleFilter}
          onChange={e => setMuscleFilter(e.target.value as MuscleGroup | 'all')}
          className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        >
          <option value="all">All Muscles</option>
          {Object.values(MuscleGroup).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className="max-h-64 overflow-y-auto space-y-1">
          {filtered.map(ex => (
            <button
              key={ex.id}
              onClick={() => { onSelect(ex); onClose(); }}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-bg-hover transition-colors"
            >
              <div className="font-medium text-sm">{ex.name}</div>
              <div className="text-xs text-text-muted">
                {ex.primaryMuscle} · {ex.type} · {ex.repRangeLow}-{ex.repRangeHigh} reps
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-text-muted text-sm text-center py-4">No exercises found</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

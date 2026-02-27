import { LoggedSet, ProgressionSuggestion } from '../../types';

interface SetRowProps {
  setIndex: number;
  logged: LoggedSet | null;
  suggestion: ProgressionSuggestion;
  onLog: (set: LoggedSet) => void;
  weightUnit: string;
}

export function SetRow({ setIndex, logged, suggestion, onLog, weightUnit }: SetRowProps) {
  const isLogged = logged !== null;

  function handleLog() {
    onLog({
      weight: suggestion.weight ?? 0,
      reps: suggestion.reps,
      rir: suggestion.rir,
    });
  }

  return (
    <div className={`flex items-center gap-2 py-2 ${isLogged ? 'opacity-60' : ''}`}>
      <span className="text-xs text-text-muted w-6 text-center">{setIndex + 1}</span>
      <input
        type="number"
        defaultValue={logged?.weight ?? suggestion.weight ?? ''}
        placeholder={weightUnit}
        className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-20 text-text-primary focus:outline-none focus:border-accent"
        onBlur={e => {
          if (logged) return;
          const val = parseFloat(e.target.value);
          if (!isNaN(val)) suggestion.weight = val;
        }}
        disabled={isLogged}
      />
      <input
        type="number"
        defaultValue={logged?.reps ?? suggestion.reps}
        placeholder="Reps"
        className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-16 text-text-primary focus:outline-none focus:border-accent"
        onBlur={e => {
          if (logged) return;
          const val = parseInt(e.target.value);
          if (!isNaN(val)) suggestion.reps = val;
        }}
        disabled={isLogged}
      />
      <input
        type="number"
        defaultValue={logged?.rir ?? suggestion.rir}
        placeholder="RIR"
        className="bg-bg-primary border border-border rounded-lg px-2 py-2 text-center text-sm w-14 text-text-primary focus:outline-none focus:border-accent"
        onBlur={e => {
          if (logged) return;
          const val = parseInt(e.target.value);
          if (!isNaN(val)) suggestion.rir = val;
        }}
        disabled={isLogged}
      />
      {!isLogged ? (
        <button
          onClick={handleLog}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      ) : (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-success/20 text-success">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}
    </div>
  );
}

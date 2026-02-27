import { useState, useEffect, useCallback } from 'react';

interface RestTimerProps {
  initialSeconds: number;
  onDismiss: () => void;
}

export function RestTimer({ initialSeconds, onDismiss }: RestTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setIsRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = useCallback((s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }, []);

  const progress = 1 - seconds / initialSeconds;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={onDismiss}>
      <div className="text-center" onClick={e => e.stopPropagation()}>
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#333350" strokeWidth="4" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={seconds === 0 ? '#22c55e' : '#6366f1'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-text-primary">{formatTime(seconds)}</span>
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-4">
          {seconds === 0 ? 'Rest complete!' : 'Rest Timer'}
        </p>
        <div className="flex gap-3 justify-center">
          {seconds > 0 && (
            <button
              onClick={() => setSeconds(s => Math.max(0, s + 30))}
              className="px-4 py-2 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:bg-bg-hover"
            >
              +30s
            </button>
          )}
          <button
            onClick={onDismiss}
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover"
          >
            {seconds === 0 ? 'Next Set' : 'Skip'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ExperienceLevel, WeightUnit } from '../types';
import { useAppState } from '../storage/AppContext';
import { Button } from '../components/ui/Button';

export function OnboardingPage() {
  const { dispatch } = useAppState();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<ExperienceLevel>('intermediate');
  const [unit, setUnit] = useState<WeightUnit>('lbs');

  function handleComplete() {
    dispatch({
      type: 'SET_PROFILE',
      payload: { experienceLevel: level, weightUnit: unit, onboardingComplete: true },
    });
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Ultra Instinct Trainer</h1>
              <p className="text-text-secondary">Optimizing workout with evidence based science</p>
            </div>
            <div className="space-y-3 text-left">
              <div className="bg-bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-sm mb-1">Volume Landmarks</h3>
                <p className="text-xs text-text-muted">MEV → MAV → MRV per muscle for optimal growth</p>
              </div>
              <div className="bg-bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-sm mb-1">Smart Progression</h3>
                <p className="text-xs text-text-muted">Double progression: reps → weight → sets</p>
              </div>
              <div className="bg-bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold text-sm mb-1">Mesocycle Structure</h3>
                <p className="text-xs text-text-muted">4-6 week blocks with planned deloads</p>
              </div>
            </div>
            <Button onClick={() => setStep(1)} className="w-full" size="lg">Get Started</Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Experience Level</h2>
              <p className="text-text-secondary text-sm">This adjusts your volume recommendations</p>
            </div>
            <div className="space-y-3">
              {([
                { value: 'beginner' as ExperienceLevel, label: 'Beginner', desc: 'Less than 1 year of consistent training' },
                { value: 'intermediate' as ExperienceLevel, label: 'Intermediate', desc: '1-3 years of consistent training' },
                { value: 'advanced' as ExperienceLevel, label: 'Advanced', desc: '3+ years of consistent training' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setLevel(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    level === opt.value ? 'bg-accent/20 border-accent' : 'bg-bg-card border-border hover:bg-bg-hover'
                  }`}
                >
                  <p className="font-semibold text-sm">{opt.label}</p>
                  <p className="text-xs text-text-muted">{opt.desc}</p>
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(2)} className="w-full">Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Weight Unit</h2>
              <p className="text-text-secondary text-sm">How do you track your weights?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {([
                { value: 'lbs' as WeightUnit, label: 'Pounds (lbs)' },
                { value: 'kg' as WeightUnit, label: 'Kilograms (kg)' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setUnit(opt.value)}
                  className={`p-4 rounded-xl border text-center transition-colors ${
                    unit === opt.value ? 'bg-accent/20 border-accent' : 'bg-bg-card border-border hover:bg-bg-hover'
                  }`}
                >
                  <p className="font-semibold">{opt.label}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleComplete} className="flex-1">Start Planning</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

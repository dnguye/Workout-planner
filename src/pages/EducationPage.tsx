import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EducationIllustration } from '../components/illustrations';
import { GlossarySection } from '../components/education/GlossarySection';
import { TrainingTipsSection } from '../components/education/TrainingTipsSection';

type Tab = 'glossary' | 'tips';

export function EducationPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('glossary');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'glossary', label: 'Glossary' },
    { id: 'tips', label: 'Training Tips' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/settings')}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-bg-hover transition-colors"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Learn</h1>
      </div>

      <div className="flex flex-col items-center py-2">
        <EducationIllustration className="w-24 h-24" />
        <p className="text-sm text-text-muted mt-2">Understand the science behind your training</p>
      </div>

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

      {tab === 'glossary' && <GlossarySection />}
      {tab === 'tips' && <TrainingTipsSection />}
    </div>
  );
}

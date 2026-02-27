import { useState } from 'react';
import { glossaryTerms, categoryMeta, GlossaryCategory } from '../../data/educationContent';
import { Chip } from '../ui/Chip';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';

export function GlossarySection() {
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all');

  const filtered = category === 'all'
    ? glossaryTerms
    : glossaryTerms.filter(t => t.category === category);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {categoryMeta.map(c => (
          <Chip
            key={c.id}
            label={c.label}
            selected={category === c.id}
            onClick={() => setCategory(c.id)}
          />
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(term => (
          <Accordion
            key={term.id}
            title={term.term}
            badge={term.abbreviation ? <Badge color="blue">{term.abbreviation}</Badge> : undefined}
          >
            <p className="text-sm text-text-secondary leading-relaxed">{term.definition}</p>
            {term.example && (
              <p className="text-xs text-text-muted mt-2 italic">Example: {term.example}</p>
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
}

import { trainingTips } from '../../data/educationContent';
import { Accordion } from '../ui/Accordion';

function renderContent(content: string) {
  const lines = content.split('\n');
  const items: string[] = [];
  const paragraphs: string[] = [];

  for (const line of lines) {
    if (line.startsWith('- ')) {
      items.push(line.slice(2));
    } else if (line.trim()) {
      paragraphs.push(line);
    }
  }

  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-text-secondary leading-relaxed">{p}</p>
      ))}
      {items.length > 0 && (
        <ul className="space-y-1.5 mt-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-text-secondary leading-relaxed flex gap-2">
              <span className="text-text-muted shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function TrainingTipsSection() {
  return (
    <div className="space-y-2">
      {trainingTips.map(tip => (
        <Accordion key={tip.id} title={tip.title}>
          <div className="space-y-4">
            {tip.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                    {section.heading}
                  </h4>
                )}
                {renderContent(section.content)}
              </div>
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
}

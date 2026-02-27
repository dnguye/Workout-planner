import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, subtitle, badge, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-hover transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-sm text-text-primary truncate">{title}</span>
          {badge}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
          <svg
            className={`w-4 h-4 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}

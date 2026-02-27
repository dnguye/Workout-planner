import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: 'default' | 'green' | 'yellow' | 'red' | 'blue';
}

const colors = {
  default: 'bg-bg-hover text-text-secondary',
  green: 'bg-success/20 text-success',
  yellow: 'bg-warning/20 text-warning',
  red: 'bg-danger/20 text-danger',
  blue: 'bg-info/20 text-info',
};

export function Badge({ children, color = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

import { ReactNode } from 'react';

interface ChipProps {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  color?: 'default' | 'green' | 'yellow' | 'red';
  onClick?: () => void;
}

const colorMap = {
  default: { active: 'bg-accent text-white', inactive: 'bg-bg-card text-text-secondary border-border' },
  green: { active: 'bg-success/20 text-success border-success/40', inactive: 'bg-bg-card text-text-secondary border-border' },
  yellow: { active: 'bg-warning/20 text-warning border-warning/40', inactive: 'bg-bg-card text-text-secondary border-border' },
  red: { active: 'bg-danger/20 text-danger border-danger/40', inactive: 'bg-bg-card text-text-secondary border-border' },
};

export function Chip({ label, icon, selected = false, color = 'default', onClick }: ChipProps) {
  const colors = colorMap[color];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        selected ? colors.active : colors.inactive
      } ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
    >
      {icon}
      {label}
    </button>
  );
}

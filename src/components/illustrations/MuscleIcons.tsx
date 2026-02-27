import { SVGProps } from 'react';
import { MuscleGroup } from '../../types';

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function ChestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10c0-3 3-5 8-5s8 2 8 5" />
      <path d="M4 10c0 3 3 6 8 6s8-3 8-6" />
      <line x1="12" y1="5" x2="12" y2="16" />
    </svg>
  );
}

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v16" />
      <path d="M6 6c0 4 2 6 6 7" />
      <path d="M18 6c0 4-2 6-6 7" />
      <path d="M8 18l4-5 4 5" />
    </svg>
  );
}

function ShouldersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 14c0-5 3-8 8-8s8 3 8 8" />
      <circle cx="8" cy="13" r="2" />
      <circle cx="16" cy="13" r="2" />
    </svg>
  );
}

function BicepsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 19V9c0-2 1-4 4-4" />
      <path d="M8 12c-2 0-3 1-3 3s1 3 3 3" />
      <path d="M12 5c2 0 4 2 4 5s-1 5-4 5" />
    </svg>
  );
}

function TricepsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 4v16" />
      <path d="M10 8c3 0 5 2 5 5s-2 4-5 4" />
      <path d="M10 10l4 3-4 3" />
    </svg>
  );
}

function QuadsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 4c-1 5-2 10-1 16" />
      <path d="M16 4c1 5 2 10 1 16" />
      <path d="M12 4v16" />
      <path d="M8 10h8" />
    </svg>
  );
}

function HamstringsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 4c-1 5-1 10 0 16" />
      <path d="M16 4c1 5 1 10 0 16" />
      <path d="M9 12c2 1 4 1 6 0" />
      <path d="M9 16c2 1 4 1 6 0" />
    </svg>
  );
}

function GlutesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 10c0 5 3 9 7 9s7-4 7-9" />
      <path d="M12 10v9" />
      <path d="M8 8c2-2 6-2 8 0" />
    </svg>
  );
}

function CalvesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 4c-1 3-2 6-1 10 .5 2 1 4 1 6" />
      <path d="M15 4c1 3 2 6 1 10-.5 2-1 4-1 6" />
      <path d="M9 10c2 1 4 1 6 0" />
    </svg>
  );
}

function AbsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="4" width="12" height="16" rx="3" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <line x1="6" y1="14" x2="18" y2="14" />
    </svg>
  );
}

function ForearmsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 4c0 4-.5 8 0 12l2 4" />
      <path d="M16 4c0 4 .5 8 0 12l-2 4" />
      <path d="M10 20h4" />
    </svg>
  );
}

function TrapsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 16L12 6l8 10" />
      <path d="M7 13l5-4 5 4" />
      <circle cx="12" cy="6" r="2" />
    </svg>
  );
}

function RearDeltsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12c2-4 5-6 8-6s6 2 8 6" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M8 14c2 2 6 2 8 0" />
    </svg>
  );
}

export const muscleIconMap: Record<MuscleGroup, (props: IconProps) => React.JSX.Element> = {
  [MuscleGroup.Chest]: ChestIcon,
  [MuscleGroup.Back]: BackIcon,
  [MuscleGroup.Shoulders]: ShouldersIcon,
  [MuscleGroup.Biceps]: BicepsIcon,
  [MuscleGroup.Triceps]: TricepsIcon,
  [MuscleGroup.Quads]: QuadsIcon,
  [MuscleGroup.Hamstrings]: HamstringsIcon,
  [MuscleGroup.Glutes]: GlutesIcon,
  [MuscleGroup.Calves]: CalvesIcon,
  [MuscleGroup.Abs]: AbsIcon,
  [MuscleGroup.Forearms]: ForearmsIcon,
  [MuscleGroup.Traps]: TrapsIcon,
  [MuscleGroup.RearDelts]: RearDeltsIcon,
};

export function MuscleIcon({ muscle, ...props }: IconProps & { muscle: MuscleGroup }) {
  const Icon = muscleIconMap[muscle];
  return Icon ? <Icon {...props} /> : null;
}

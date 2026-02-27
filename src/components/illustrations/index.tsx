import { SVGProps } from 'react';

type IllustrationProps = SVGProps<SVGSVGElement> & { className?: string };

const glowFilter = (
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="glowSoft">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

/** Silhouette figure with energy rings — welcome screen hero */
export function OnboardingHeroIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Outer energy ring */}
      <circle cx="100" cy="100" r="85" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.2" />
      <circle cx="100" cy="100" r="70" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="6 4" />
      <circle cx="100" cy="100" r="55" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.5" />
      {/* Figure silhouette */}
      <circle cx="100" cy="62" r="12" stroke="#6366f1" strokeWidth="2" filter="url(#glow)" />
      <line x1="100" y1="74" x2="100" y2="115" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      {/* Arms raised */}
      <line x1="100" y1="85" x2="75" y2="70" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="85" x2="125" y2="70" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <line x1="100" y1="115" x2="82" y2="142" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="115" x2="118" y2="142" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      {/* "UI" text glow */}
      <text
        x="100" y="170"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="bold"
        fontSize="18"
        fill="#6366f1"
        filter="url(#glowSoft)"
      >
        UI
      </text>
      {/* Energy particles */}
      <circle cx="60" cy="50" r="2" fill="#6366f1" opacity="0.6" />
      <circle cx="145" cy="55" r="1.5" fill="#6366f1" opacity="0.5" />
      <circle cx="50" cy="110" r="1.5" fill="#6366f1" opacity="0.4" />
      <circle cx="155" cy="105" r="2" fill="#6366f1" opacity="0.5" />
      <circle cx="70" cy="150" r="1" fill="#6366f1" opacity="0.3" />
      <circle cx="135" cy="148" r="1.5" fill="#6366f1" opacity="0.4" />
    </svg>
  );
}

/** Clipboard with glowing "+" — empty plan states */
export function EmptyPlanIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Clipboard body */}
      <rect x="55" y="50" width="90" height="110" rx="8" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Clipboard clip */}
      <rect x="80" y="42" width="40" height="16" rx="4" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Lines on clipboard */}
      <line x1="75" y1="85" x2="125" y2="85" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round" />
      <line x1="75" y1="100" x2="115" y2="100" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
      <line x1="75" y1="115" x2="105" y2="115" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.1" strokeLinecap="round" />
      {/* Glowing + */}
      <line x1="100" y1="120" x2="100" y2="145" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
      <line x1="87.5" y1="132.5" x2="112.5" y2="132.5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
    </svg>
  );
}

/** Fist raising with energy burst — workout complete */
export function WorkoutCompleteIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      <defs>
        <filter id="glowBurst">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Energy burst rays */}
      <line x1="100" y1="35" x2="100" y2="15" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.7" filter="url(#glowBurst)" />
      <line x1="130" y1="45" x2="145" y2="28" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glowBurst)" />
      <line x1="70" y1="45" x2="55" y2="28" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glowBurst)" />
      <line x1="145" y1="70" x2="165" y2="60" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="55" y1="70" x2="35" y2="60" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Fist - wrist */}
      <rect x="88" y="110" width="24" height="35" rx="5" stroke="#6366f1" strokeWidth="2" />
      {/* Fist - main body */}
      <rect x="82" y="75" width="36" height="38" rx="8" stroke="#6366f1" strokeWidth="2" filter="url(#glowBurst)" />
      {/* Finger lines */}
      <line x1="90" y1="75" x2="90" y2="85" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="100" y1="75" x2="100" y2="85" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="110" y1="75" x2="110" y2="85" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Thumb */}
      <path d="M82 95 Q75 95 75 88 Q75 80 82 80" stroke="#6366f1" strokeWidth="1.5" fill="none" />
      {/* Energy particles */}
      <circle cx="65" cy="55" r="2" fill="#6366f1" opacity="0.5" />
      <circle cx="140" cy="50" r="2.5" fill="#6366f1" opacity="0.6" />
      <circle cx="50" cy="85" r="1.5" fill="#6366f1" opacity="0.3" />
      <circle cx="155" cy="80" r="1.5" fill="#6366f1" opacity="0.4" />
      {/* "COMPLETE" arc text substitute — sparkle dots */}
      <circle cx="75" cy="155" r="2" fill="#6366f1" opacity="0.3" />
      <circle cx="100" cy="160" r="2.5" fill="#6366f1" opacity="0.4" />
      <circle cx="125" cy="155" r="2" fill="#6366f1" opacity="0.3" />
    </svg>
  );
}

/** Trophy with checkmark and sparkles — mesocycle complete */
export function MesocycleCompleteIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Trophy cup */}
      <path d="M70 60 L65 110 Q65 125 100 125 Q135 125 135 110 L130 60 Z" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.8" />
      {/* Trophy handles */}
      <path d="M70 70 Q45 70 45 90 Q45 110 65 110" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <path d="M130 70 Q155 70 155 90 Q155 110 135 110" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      {/* Trophy base */}
      <line x1="90" y1="125" x2="90" y2="145" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="110" y1="125" x2="110" y2="145" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="78" y="145" width="44" height="8" rx="3" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Checkmark inside trophy */}
      <path d="M88 90 L96 100 L115 78" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      {/* Sparkles */}
      <path d="M55 50 L58 45 L61 50 L58 55 Z" fill="#6366f1" opacity="0.5" />
      <path d="M145 45 L148 40 L151 45 L148 50 Z" fill="#6366f1" opacity="0.6" />
      <path d="M42 75 L44 72 L46 75 L44 78 Z" fill="#6366f1" opacity="0.3" />
      <path d="M158 70 L160 67 L162 70 L160 73 Z" fill="#6366f1" opacity="0.4" />
      <circle cx="65" cy="40" r="1.5" fill="#6366f1" opacity="0.4" />
      <circle cx="140" cy="35" r="2" fill="#6366f1" opacity="0.5" />
    </svg>
  );
}

/** Calendar with dumbbell silhouette — no workouts */
export function NoWorkoutsIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Calendar body */}
      <rect x="45" y="55" width="110" height="100" rx="8" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Calendar top bar */}
      <rect x="45" y="55" width="110" height="22" rx="8" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5" fill="#6366f1" fillOpacity="0.08" />
      {/* Calendar rings */}
      <line x1="75" y1="48" x2="75" y2="62" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="125" y1="48" x2="125" y2="62" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Dumbbell silhouette in center */}
      <rect x="72" y="105" width="14" height="20" rx="3" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.3" />
      <rect x="114" y="105" width="14" height="20" rx="3" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="86" y1="115" x2="114" y2="115" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round" />
      {/* Empty day dots */}
      <circle cx="65" cy="95" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="80" cy="95" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="95" cy="95" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="110" cy="95" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="125" cy="95" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="140" cy="95" r="2" fill="#6366f1" opacity="0.15" />
    </svg>
  );
}

/** Chart axes with a single dot and dashed trend line — no chart data */
export function NoChartDataIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Y axis */}
      <line x1="50" y1="40" x2="50" y2="150" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
      {/* X axis */}
      <line x1="50" y1="150" x2="165" y2="150" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
      {/* Y axis ticks */}
      <line x1="46" y1="70" x2="50" y2="70" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="46" y1="100" x2="50" y2="100" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="46" y1="130" x2="50" y2="130" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      {/* X axis ticks */}
      <line x1="80" y1="150" x2="80" y2="154" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="110" y1="150" x2="110" y2="154" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="140" y1="150" x2="140" y2="154" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.25" />
      {/* Dashed trend line */}
      <line x1="65" y1="125" x2="155" y2="75" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.25" />
      {/* Single data dot */}
      <circle cx="80" cy="115" r="5" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="1.5" filter="url(#glow)" />
    </svg>
  );
}

/** Magnifying glass with "x" — no search results */
export function NoSearchResultsIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} {...props}>
      {glowFilter}
      {/* Magnifying glass circle */}
      <circle cx="90" cy="85" r="40" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.4" />
      {/* Glass handle */}
      <line x1="120" y1="115" x2="155" y2="150" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
      {/* X inside glass */}
      <line x1="78" y1="73" x2="102" y2="97" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" filter="url(#glow)" />
      <line x1="102" y1="73" x2="78" y2="97" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" filter="url(#glow)" />
    </svg>
  );
}

/** Stacked bar chart with gradient — volume landmarks icon (24x24 for onboarding card) */
export function VolumeLandmarksIcon({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="14" width="4" height="7" rx="1" fill="#6366f1" fillOpacity="0.4" />
      <rect x="10" y="9" width="4" height="12" rx="1" fill="#6366f1" fillOpacity="0.6" />
      <rect x="17" y="4" width="4" height="17" rx="1" fill="#6366f1" fillOpacity="0.9" />
    </svg>
  );
}

/** Ascending staircase with arrow — smart progression icon (24x24 for onboarding card) */
export function SmartProgressionIcon({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M3 18h4v-4h4v-4h4v-4h4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h4v4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Timeline with connected nodes — mesocycle structure icon (24x24 for onboarding card) */
export function MesocycleStructureIcon({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="5" cy="12" r="2.5" fill="#6366f1" fillOpacity="0.5" stroke="#6366f1" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="#6366f1" fillOpacity="0.7" stroke="#6366f1" strokeWidth="1.5" />
      <circle cx="19" cy="12" r="2.5" fill="#6366f1" fillOpacity="0.9" stroke="#6366f1" strokeWidth="1.5" />
      {/* Deload marker */}
      <path d="M19 8l-1.5 2h3L19 8z" fill="#6366f1" fillOpacity="0.6" />
    </svg>
  );
}

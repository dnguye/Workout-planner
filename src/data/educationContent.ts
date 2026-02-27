export type GlossaryCategory = 'volume' | 'programming' | 'execution' | 'recovery';

export interface GlossaryTerm {
  id: string;
  term: string;
  abbreviation?: string;
  category: GlossaryCategory;
  definition: string;
  example?: string;
}

export interface TipSection {
  heading?: string;
  content: string;
}

export interface TrainingTip {
  id: string;
  title: string;
  sections: TipSection[];
}

export const categoryMeta: { id: GlossaryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'volume', label: 'Volume' },
  { id: 'programming', label: 'Programming' },
  { id: 'execution', label: 'Execution' },
  { id: 'recovery', label: 'Recovery' },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'rir',
    term: 'Reps in Reserve',
    abbreviation: 'RIR',
    category: 'execution',
    definition: 'The estimated number of additional reps you could perform before reaching muscular failure. An RIR of 2 means you stopped the set with 2 reps "left in the tank."',
    example: 'If you bench press 185 lbs for 8 reps at RIR 2, you believe you could have done 10 reps total before failing.',
  },
  {
    id: 'rpe',
    term: 'Rate of Perceived Exertion',
    abbreviation: 'RPE',
    category: 'execution',
    definition: 'A 1–10 scale measuring how hard a set felt. RPE 10 means maximal effort (failure), RPE 8 means about 2 reps left. RPE is the inverse perspective of RIR.',
    example: 'RPE 7 = 3 reps in reserve. RPE 9 = 1 rep in reserve.',
  },
  {
    id: 'mv',
    term: 'Maintenance Volume',
    abbreviation: 'MV',
    category: 'volume',
    definition: 'The minimum number of weekly sets per muscle group needed to maintain your current muscle size. Training at MV prevents muscle loss without driving new growth.',
    example: 'For most people, MV for quads is around 6–8 sets per week.',
  },
  {
    id: 'mev',
    term: 'Minimum Effective Volume',
    abbreviation: 'MEV',
    category: 'volume',
    definition: 'The lowest number of weekly sets per muscle group that will produce measurable hypertrophy. Training below MEV maintains size but won\'t build new muscle.',
    example: 'If your MEV for biceps is 8 sets/week, doing only 6 sets will maintain but not grow them.',
  },
  {
    id: 'mav',
    term: 'Maximum Adaptive Volume',
    abbreviation: 'MAV',
    category: 'volume',
    definition: 'The set range where you get the best hypertrophy response for the effort invested. Training within your MAV gives you the most "bang for your buck."',
    example: 'Your MAV for chest might be 12–18 sets/week — the sweet spot for growth.',
  },
  {
    id: 'mrv',
    term: 'Maximum Recoverable Volume',
    abbreviation: 'MRV',
    category: 'volume',
    definition: 'The highest number of weekly sets per muscle group you can recover from. Exceeding MRV leads to overtraining, accumulated fatigue, and potential regression.',
    example: 'If your MRV for back is 22 sets/week, doing 25 sets will impair recovery and hurt progress.',
  },
  {
    id: 'mesocycle',
    term: 'Mesocycle',
    category: 'programming',
    definition: 'A training block typically lasting 4–8 weeks with a structured progression plan. Volume and/or intensity increase each week, culminating in a deload to dissipate fatigue.',
    example: 'A 5-week mesocycle: weeks 1–4 progressively overload, week 5 is a deload.',
  },
  {
    id: 'deload',
    term: 'Deload',
    category: 'recovery',
    definition: 'A planned reduction in training volume and/or intensity (usually 1 week) to allow your body to recover from accumulated fatigue. Deloads help you come back stronger for the next mesocycle.',
    example: 'During a deload week you might cut your sets in half and use lighter weights.',
  },
  {
    id: 'progressive-overload',
    term: 'Progressive Overload',
    category: 'programming',
    definition: 'The principle of gradually increasing the demands on your muscles over time — through more weight, more reps, or more sets — to continue driving adaptation and growth.',
    example: 'Adding 5 lbs to your squat each week, or doing 1 extra rep with the same weight.',
  },
  {
    id: 'volume',
    term: 'Volume',
    category: 'volume',
    definition: 'The total amount of work performed for a muscle group, most commonly measured as the number of hard (working) sets per week. Higher volume generally drives more growth up to your MRV.',
  },
  {
    id: 'sets',
    term: 'Sets',
    category: 'execution',
    definition: 'A continuous group of repetitions performed without rest. "Working sets" are the challenging sets that count toward your training volume — warm-up sets are excluded.',
    example: '3 sets of 10 reps means you do 10 reps, rest, 10 reps, rest, 10 reps.',
  },
  {
    id: 'reps',
    term: 'Reps (Repetitions)',
    category: 'execution',
    definition: 'The number of times you perform a single complete movement (lifting and lowering the weight) within one set. Rep ranges influence whether you build more strength or more endurance.',
    example: 'Doing 8 reps of a bicep curl means curling the weight up and down 8 times.',
  },
  {
    id: 'compound-isolation',
    term: 'Compound vs Isolation',
    category: 'execution',
    definition: 'Compound exercises work multiple muscle groups and joints simultaneously (squats, bench press, rows). Isolation exercises target a single muscle group through one joint (curls, lateral raises, leg extensions).',
    example: 'Barbell row (compound) works back, biceps, and rear delts. A bicep curl (isolation) targets only the biceps.',
  },
  {
    id: 'sra',
    term: 'Stimulus Recovery Adaptation',
    abbreviation: 'SRA',
    category: 'recovery',
    definition: 'The cycle your muscles go through after training: the workout provides a stimulus, your body recovers from the damage, then adapts by growing stronger. Timing your next session to hit a muscle after it has completed SRA is key.',
    example: 'Biceps may need 48–72 hours to complete the SRA cycle, meaning you can train them every 2–3 days.',
  },
];

export const trainingTips: TrainingTip[] = [
  {
    id: 'session-duration',
    title: 'Session Duration',
    sections: [
      {
        heading: 'Recommended Length',
        content: '- 45–75 minutes is ideal for most people\n- Includes warm-up sets but not cardio\n- Longer sessions see diminishing returns as fatigue accumulates',
      },
      {
        heading: 'Why It Matters',
        content: '- Cortisol rises and testosterone drops after ~60–75 min of intense lifting\n- Focus and form quality decline with longer sessions\n- Splitting volume across more shorter sessions is often better than one marathon session',
      },
    ],
  },
  {
    id: 'rep-ranges',
    title: 'Rep Ranges',
    sections: [
      {
        heading: 'Hypertrophy (Muscle Growth)',
        content: '- 6–12 reps per set is the traditional hypertrophy range\n- Recent research shows 5–30 reps can all build muscle if taken close to failure\n- The 6–12 range is practical: heavy enough to recruit most fibers, light enough for meaningful volume',
      },
      {
        heading: 'Strength vs Size',
        content: '- 1–5 reps at heavy loads builds maximal strength\n- 12–20+ reps builds muscular endurance and still drives hypertrophy\n- A mix of rep ranges across your program is often ideal',
      },
    ],
  },
  {
    id: 'set-volume',
    title: 'Weekly Set Volume',
    sections: [
      {
        heading: 'General Guidelines',
        content: '- Beginners: 10–12 sets per muscle group per week\n- Intermediate: 12–18 sets per muscle group per week\n- Advanced: 16–22+ sets per muscle group per week\n- These are working sets only — warm-ups don\'t count',
      },
      {
        heading: 'How to Progress Volume',
        content: '- Start at the lower end of your range each mesocycle\n- Add 1–2 sets per muscle per week as the mesocycle progresses\n- If performance drops, you\'ve likely exceeded your MRV — pull back and deload',
      },
    ],
  },
  {
    id: 'rest-periods',
    title: 'Rest Periods',
    sections: [
      {
        heading: 'By Exercise Type',
        content: '- Compound lifts (squat, bench, deadlift): 2–4 minutes\n- Accessory compounds (rows, overhead press): 1.5–3 minutes\n- Isolation exercises (curls, lateral raises): 1–2 minutes',
      },
      {
        heading: 'Why Rest Matters',
        content: '- Shorter rest = less weight and fewer reps on subsequent sets\n- Longer rest = better performance per set and more total volume\n- For hypertrophy, resting 2+ minutes on compounds tends to produce better results than rushing',
      },
    ],
  },
  {
    id: 'progressive-overload-tip',
    title: 'Progressive Overload Strategy',
    sections: [
      {
        heading: 'Methods of Overload',
        content: '- Add weight: the most straightforward approach (e.g., 2.5–5 lbs per session)\n- Add reps: do more reps at the same weight before increasing load\n- Add sets: increase weekly volume over the mesocycle\n- Improve execution: slower eccentrics, better mind-muscle connection',
      },
      {
        heading: 'Practical Tips',
        content: '- Don\'t chase all methods at once — pick one focus per mesocycle\n- Double progression works great: hit the top of your rep range, then add weight\n- Small, consistent jumps beat occasional big jumps\n- Log everything so you know exactly what to beat next session',
      },
    ],
  },
  {
    id: 'deload-guide',
    title: 'Deload Guide',
    sections: [
      {
        heading: 'When to Deload',
        content: '- Every 4–6 weeks for intermediates, every 6–8 weeks for beginners\n- When performance stalls or declines across multiple sessions\n- When motivation, sleep, or appetite is noticeably worse\n- After completing a planned mesocycle',
      },
      {
        heading: 'How to Deload',
        content: '- Reduce volume by 50–66% (cut sets roughly in half)\n- Keep intensity moderate (RPE 5–6, no sets near failure)\n- Maintain training frequency — don\'t skip the gym entirely\n- Focus on technique, mobility, and active recovery',
      },
    ],
  },
];

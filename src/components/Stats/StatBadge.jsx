import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants';

/**
 * StatBadge — compact display for a labelled numeric stat.
 * Used in the top bar and game-over screen.
 *
 * Props:
 *  label    - string
 *  value    - string | number
 *  icon     - optional leading emoji/icon string
 *  highlight - if true, uses gold accent
 */
export function StatBadge({ label, value, icon, highlight = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`
        flex flex-col items-center px-4 py-1.5 rounded-lg
        bg-stone-900/60 border
        ${highlight ? 'border-amber-500/40' : 'border-stone-700/60'}
      `}
    >
      <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </span>
      <span className={`text-lg font-bold tabular-nums ${highlight ? 'text-amber-400' : 'text-stone-100'}`}>
        {value}
      </span>
    </motion.div>
  );
}

/**
 * PileCounter — shows a stack icon + count for draw/discard piles.
 *
 * Props:
 *  label - e.g. "DRAW PILE"
 *  count - number
 *  icon  - emoji icon
 */
export function PileCounter({ label, count, icon }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/60 border border-stone-700/60">
      <span className="text-stone-400">{icon}</span>
      <div>
        <div className="text-[9px] uppercase tracking-widest text-stone-500">{label}</div>
        <div className="text-base font-bold tabular-nums text-stone-200">{count}</div>
      </div>
    </div>
  );
}

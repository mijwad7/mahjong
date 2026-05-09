import { motion } from 'framer-motion';
import { TILE_DEFINITIONS_MAP, TILE_CATEGORY } from '../../game/constants/tiles';
import { cardDeal } from '../../animations/variants';

/**
 * Colour maps — maps the `color` field from TILE_DEFINITIONS to Tailwind classes.
 * Extend here if new tile colours are introduced.
 */
const SYMBOL_COLORS = {
  red:   'text-rose-500',
  blue:  'text-sky-400',
  green: 'text-emerald-400',
  gold:  'text-amber-400',
  white: 'text-slate-300',
};

const BORDER_COLORS = {
  red:   'border-rose-500/40',
  blue:  'border-sky-400/40',
  green: 'border-emerald-400/40',
  gold:  'border-amber-400/40',
  white: 'border-slate-400/40',
};

const GLOW_COLORS = {
  red:   'shadow-rose-500/20',
  blue:  'shadow-sky-400/20',
  green: 'shadow-emerald-400/20',
  gold:  'shadow-amber-400/20',
  white: 'shadow-slate-400/20',
};

/**
 * TileCard — renders a single Mahjong tile.
 *
 * Props:
 *  tile        - tile instance { id, instanceId }
 *  tileScaling - the tileScaling map from game state
 *  size        - 'sm' | 'md' | 'lg'  (default 'md')
 *  animDelay   - framer motion delay in seconds (default 0)
 *  faceDown    - if true, renders the tile back face
 *  className   - additional classes
 */
export default function TileCard({
  tile,
  tileScaling,
  size = 'md',
  animDelay = 0,
  faceDown = false,
  className = '',
}) {
  const def = TILE_DEFINITIONS_MAP[tile?.id];

  // ── Sizing presets ───────────────────────────────────────────────────────
  const sizeClasses = {
    sm: 'w-10 h-14 text-base sm:w-14 sm:h-20 sm:text-xl',
    md: 'w-16 h-24 text-2xl sm:w-24 sm:h-32 sm:text-4xl',
    lg: 'w-20 h-28 text-3xl sm:w-28 sm:h-40 sm:text-5xl',
  }[size] ?? 'w-16 h-24 text-2xl sm:w-24 sm:h-32 sm:text-4xl';

  const cornerTextClasses = {
    sm: 'text-[6px] sm:text-[8px]',
    md: 'text-[8px] sm:text-[10px]',
    lg: 'text-[9px] sm:text-xs',
  }[size] ?? 'text-[8px] sm:text-[10px]';

  if (!def) return null;

  const colorKey = def.color ?? 'white';
  const symbolColor = SYMBOL_COLORS[colorKey] ?? 'text-slate-300';
  const borderColor = BORDER_COLORS[colorKey] ?? 'border-slate-400/40';
  const glowColor   = GLOW_COLORS[colorKey]   ?? 'shadow-slate-400/20';

  // Dynamic value displayed on the tile (for non-number tiles, show scaling value)
  const dynamicValue =
    def.category !== TILE_CATEGORY.NUMBER
      ? (tileScaling?.[tile.id] ?? 5)
      : def.faceValue;

  const dealVariant = {
    ...cardDeal,
    animate: {
      ...cardDeal.animate,
      transition: { ...cardDeal.animate.transition, delay: animDelay },
    },
  };

  if (faceDown) {
    return (
      <motion.div
        variants={dealVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`
          ${sizeClasses} ${className}
          relative rounded-xl border-2 border-stone-600/60
          bg-gradient-to-br from-stone-800 to-stone-900
          shadow-xl flex items-center justify-center overflow-hidden
        `}
      >
        {/* Back pattern */}
        <div className="absolute inset-2 rounded-lg border border-stone-600/40 grid grid-cols-3 gap-1 opacity-30">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-sm bg-amber-500/20" />
          ))}
        </div>
        <span className="text-amber-500/50 font-bold text-lg">🀫</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={dealVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        ${sizeClasses} ${className}
        relative rounded-xl border-2 ${borderColor}
        bg-gradient-to-br from-stone-100 to-stone-200
        shadow-xl ${glowColor} shadow-lg
        flex flex-col items-center justify-center
        select-none overflow-hidden
      `}
    >
      {/* Top-left corner */}
      <div className={`absolute top-1.5 left-2 ${cornerTextClasses} ${symbolColor} font-bold leading-none`}>
        <div>{def.symbol}</div>
        <div>{dynamicValue}</div>
      </div>

      {/* Centre symbol */}
      <span className={`${symbolColor} font-bold leading-none select-none`}>
        {def.symbol}
      </span>

      {/* Suit label beneath for non-number tiles */}
      {def.category !== TILE_CATEGORY.NUMBER && size !== 'sm' && (
        <span className={`${symbolColor} text-[6px] sm:text-[8px] tracking-widest uppercase mt-0.5 sm:mt-1 opacity-70`}>
          {def.category}
        </span>
      )}

      {/* Bottom-right corner (rotated) */}
      <div
        className={`absolute bottom-1.5 right-2 ${cornerTextClasses} ${symbolColor} font-bold leading-none rotate-180`}
      >
        <div>{def.symbol}</div>
        <div>{dynamicValue}</div>
      </div>
    </motion.div>
  );
}

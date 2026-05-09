import { motion, AnimatePresence } from 'framer-motion';
import TileCard from '../TileCard/TileCard';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { TILE_DEFINITIONS_MAP } from '../../game/constants/tiles';

/**
 * HandHistoryTimeline — renders the last N hands as a scrollable strip.
 *
 * Props:
 *  handHistory  - array of history entries from game state
 *  tileScaling  - current tileScaling map (for accurate value display)
 */
export default function HandHistoryTimeline({ handHistory, tileScaling }) {
  if (!handHistory.length) {
    return (
      <p className="text-stone-500 text-sm italic text-center py-4">
        No hands played yet.
      </p>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-700">
      <AnimatePresence mode="popLayout">
        {handHistory.map((entry, idx) => (
          <HistoryEntry key={`${entry.hand[0]?.instanceId ?? idx}`} entry={entry} tileScaling={tileScaling} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function HistoryEntry({ entry }) {
  const { hand, handValue, isWin, isTie, scoreDelta } = entry;

  const resultColor = isTie
    ? 'text-stone-400 border-stone-600'
    : isWin
      ? 'text-emerald-400 border-emerald-500/40'
      : 'text-rose-400 border-rose-500/40';

  const resultLabel = isTie ? 'TIE' : isWin ? '✓ WIN' : '✗ LOSS';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`
        flex-shrink-0 rounded-xl border p-2 min-w-[110px]
        bg-stone-900/80 backdrop-blur-sm
        ${resultColor}
      `}
    >
      {/* Mini tile strip */}
      <div className="flex gap-1 justify-center mb-2">
        {hand.map((tile) => (
          <TileCard
            key={tile.instanceId}
            tile={tile}
            tileScaling={{}}
            size="sm"
          />
        ))}
      </div>

      {/* Stats row */}
      <div className="text-center space-y-0.5">
        <div className="text-[10px] uppercase tracking-wider opacity-70">
          Val: {handValue}
        </div>
        <div className={`text-xs font-bold ${resultColor}`}>{resultLabel}</div>
        {scoreDelta !== 0 && (
          <div className={`text-[10px] font-mono ${scoreDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {scoreDelta > 0 ? '+' : ''}{scoreDelta}
          </div>
        )}
      </div>
    </motion.div>
  );
}

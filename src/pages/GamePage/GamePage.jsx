import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../hooks/useGame';
import { useUI } from '../../hooks/useUI';
import { BET } from '../../game/utils/roundUtils';
import TileCard from '../../components/TileCard/TileCard';
import HandHistoryTimeline from '../../components/HandHistoryTimeline/HandHistoryTimeline';
import { PileCounter } from '../../components/Stats/StatBadge';
import { pageFade, resultPop, staggerContainer, fadeUp, numberFlash } from '../../animations/variants';
import GAME_CONFIG from '../../game/constants/gameConfig';

/**
 * GamePage — the main active gameplay screen.
 *
 * Responsibilities (UI only — all logic is in Redux):
 *  - Render current hand with animated tile dealing
 *  - Show Bet Higher / Bet Lower buttons
 *  - Display score, streak, pile counts
 *  - Show round result flash
 *  - Show history timeline
 */
export default function GamePage() {
  const {
    score, winStreak, totalHands,
    currentHand, currentHandValue,
    drawPileCount, discardPileCount,
    handHistory, tileScaling,
    reshuffleCount,
    bet, goToLanding,
  } = useGame();

  const { lastRoundResult, setLastRoundResult } = useUI();

  // Round result flash — clear after 1.5 s
  useEffect(() => {
    if (!lastRoundResult) return;
    const t = setTimeout(() => setLastRoundResult(null), 1500);
    return () => clearTimeout(t);
  }, [lastRoundResult, setLastRoundResult]);

  function handleBet(direction) {
    bet(direction);
    // We'll read the new state on next render — result flash handled by a
    // middleware / thunk pattern could be added here for more complex needs.
  }

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col"
    >
      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-stone-800/60 bg-stone-950/80 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold tracking-widest text-amber-400 font-serif">
            EMPEROR'S TABLE
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-stone-500">Current Score</div>
            <motion.div key={score} variants={numberFlash} initial="initial" animate="animate"
              className="text-xl font-bold tabular-nums text-amber-400">
              {score.toLocaleString()}
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PileCounter label="Draw Pile" count={drawPileCount} icon="🀫" />
          <PileCounter label="Discards"  count={discardPileCount} icon="🗑️" />
          <div className="text-[10px] text-stone-500 text-right">
            <div>Shuffles</div>
            <div className="text-stone-300 font-bold">{reshuffleCount}/{GAME_CONFIG.maxReshuffles}</div>
          </div>
          <button
            onClick={goToLanding}
            className="
              ml-2 px-4 py-1.5 rounded-lg border border-stone-700 text-stone-400
              hover:border-rose-500/40 hover:text-rose-400 transition-all text-sm
            "
            aria-label="Exit to landing page"
          >
            ← Exit
          </button>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">

        {/* Hand value heading */}
        <div className="text-center space-y-1">
          <div className="text-[11px] tracking-[0.3em] text-stone-500 uppercase flex items-center gap-3">
            <span className="flex-1 h-px bg-stone-800" />
            Current Hand Value
            <span className="flex-1 h-px bg-stone-800" />
          </div>
          <motion.div
            key={currentHandValue}
            variants={numberFlash}
            initial="initial"
            animate="animate"
            className="text-5xl font-bold tabular-nums"
          >
            {currentHandValue}
          </motion.div>
          {winStreak > 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-amber-400 text-sm font-bold tracking-widest"
            >
              🔥 {winStreak}× STREAK
            </motion.div>
          )}
        </div>

        {/* Tile hand display */}
        <motion.div
          className="flex gap-4 items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {currentHand.map((tile, i) => (
              <TileCard
                key={tile.instanceId}
                tile={tile}
                tileScaling={tileScaling}
                size="lg"
                animDelay={i * 0.12}
              />
            ))}
          </AnimatePresence>

          {/* Next tile placeholder */}
          <div className="w-28 h-40 rounded-xl border-2 border-dashed border-stone-700/60 flex items-center justify-center text-stone-600 text-xs uppercase tracking-widest">
            Next
          </div>
        </motion.div>

        {/* Round result flash */}
        <AnimatePresence>
          {lastRoundResult && (
            <motion.div
              key="result"
              variants={resultPop}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`
                px-8 py-3 rounded-2xl font-bold text-xl tracking-wider
                ${lastRoundResult.isWin
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : lastRoundResult.isTie
                    ? 'bg-stone-700/40 text-stone-400 border border-stone-600/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }
              `}
            >
              {lastRoundResult.isTie
                ? 'TIE — No Change'
                : lastRoundResult.isWin
                  ? `✓ WIN  +${lastRoundResult.scoreDelta}`
                  : `✗ LOSS  ${lastRoundResult.scoreDelta}`
              }
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bet buttons */}
        <div className="flex gap-4 w-full max-w-md">
          <BetButton
            direction={BET.HIGHER}
            onClick={() => handleBet(BET.HIGHER)}
            label="Bet Higher"
            subLabel="Valuation Ascending"
            icon="↑"
            variant="gold"
          />
          <BetButton
            direction={BET.LOWER}
            onClick={() => handleBet(BET.LOWER)}
            label="Bet Lower"
            subLabel="Valuation Descending"
            icon="↓"
            variant="dark"
          />
        </div>

        {/* Stats row */}
        <div className="flex gap-4 text-center text-sm text-stone-500">
          <div><span className="text-stone-300 font-bold">{totalHands}</span> Hands</div>
          <div>·</div>
          <div>Streak: <span className="text-amber-400 font-bold">{winStreak}</span></div>
        </div>
      </main>

      {/* ── History Timeline ─────────────────────────────────────────────── */}
      <footer className="border-t border-stone-800/60 px-6 py-4 bg-stone-950/80">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
            🕐 History · Last {GAME_CONFIG.maxHistoryLength} Hands
          </span>
        </div>
        <HandHistoryTimeline handHistory={handHistory} tileScaling={tileScaling} />
      </footer>
    </motion.div>
  );
}

// ── Bet Button ─────────────────────────────────────────────────────────────

function BetButton({ onClick, label, subLabel, icon, variant }) {
  const isGold = variant === 'gold';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, boxShadow: isGold ? '0 0 24px rgba(217,119,6,0.4)' : '0 0 24px rgba(255,255,255,0.06)' }}
      whileTap={{ scale: 0.96 }}
      className={`
        flex-1 flex flex-col items-center py-5 px-4 rounded-2xl
        font-bold tracking-widest uppercase transition-colors
        ${isGold
          ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
          : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
        }
      `}
      aria-label={label}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm font-black">{label}</span>
      <span className={`text-[10px] mt-0.5 tracking-widest font-normal ${isGold ? 'text-stone-800/70' : 'text-stone-500'}`}>
        {subLabel}
      </span>
    </motion.button>
  );
}

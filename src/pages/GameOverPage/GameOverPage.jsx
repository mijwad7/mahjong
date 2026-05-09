import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../hooks/useGame';
import { pageFade, staggerContainer, fadeUp, resultPop } from '../../animations/variants';
import Modal from '../../components/Modal/Modal';
import GAME_CONFIG from '../../game/constants/gameConfig';

/**
 * GameOverPage — end-of-session summary screen.
 *
 * Shows: final score, total hands, reshuffles used, win streak peak.
 * Allows: score submission to leaderboard, replay, return to landing.
 */
export default function GameOverPage() {
  const {
    score, totalHands, reshuffleCount, winStreak,
    gameOverCause, tileScaling,
    startNewGame, goToLanding, saveScore,
  } = useGame();

  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  function handleSubmitScore() {
    if (!playerName.trim()) return;
    saveScore(playerName.trim());
    setSubmitted(true);
    setShowNameModal(false);
  }

  const causeLabel = gameOverCause?.type === 'max_reshuffles'
    ? 'The draw pile ran dry — the tiles have spoken.'
    : "A tile\u2019s value reached the forbidden threshold.";

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4 py-12"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 60% 20%, rgba(120,80,10,0.12) 0%, transparent 60%)',
      }}
    >
      {/* ── Ambient title ────────────────────────────────────────────────── */}
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="text-center mb-10 space-y-2">
        <div className="text-[11px] uppercase tracking-[0.4em] text-stone-500">Game Over</div>
        <h2 className="text-4xl font-bold text-amber-400 font-serif tracking-wider">
          Imperial Tally
        </h2>
        <p className="text-stone-500 text-sm max-w-xs mx-auto">{causeLabel}</p>
      </motion.div>

      {/* ── Score card ───────────────────────────────────────────────────── */}
      <motion.div
        variants={resultPop}
        initial="initial"
        animate="animate"
        className="
          w-full max-w-md rounded-2xl border border-amber-500/30
          bg-gradient-to-br from-stone-900 to-stone-950
          p-8 shadow-2xl shadow-amber-500/10 mb-8
        "
      >
        <div className="text-center mb-8">
          <div className="text-[11px] uppercase tracking-widest text-stone-500 mb-1">Final Score</div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, delay: 0.3 } }}
            className="text-6xl font-bold tabular-nums text-amber-400"
          >
            {score.toLocaleString()}
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: 'Total Hands', value: totalHands },
            { label: 'Shuffles',    value: `${reshuffleCount} / ${GAME_CONFIG.maxReshuffles}` },
            { label: 'Win Streak',  value: winStreak, gold: true },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-xl bg-stone-800/60 border border-stone-700/40 p-4 text-center"
            >
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{stat.label}</div>
              <div className={`text-2xl font-bold tabular-nums ${stat.gold ? 'text-amber-400' : 'text-stone-100'}`}>
                {String(stat.value).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
        {!submitted ? (
          <motion.button
            variants={fadeUp}
            onClick={() => setShowNameModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              col-span-2 sm:col-span-1 py-3.5 sm:py-4 rounded-xl font-bold tracking-widest uppercase text-xs sm:text-sm
              bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/25
              transition-colors
            "
          >
            🏆 Submit Score
          </motion.button>
        ) : (
          <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1 py-3.5 sm:py-4 rounded-xl text-center text-emerald-400 font-bold border border-emerald-500/30 bg-emerald-500/10 text-xs sm:text-sm flex items-center justify-center">
            ✓ Score Submitted!
          </motion.div>
        )}

        <motion.button
          variants={fadeUp}
          onClick={startNewGame}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="col-span-1 py-3.5 sm:py-4 rounded-xl font-bold tracking-widest uppercase text-xs sm:text-sm bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
        >
          ↺ Replay
        </motion.button>

        <motion.button
          variants={fadeUp}
          onClick={goToLanding}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="col-span-1 py-3.5 sm:py-4 rounded-xl font-bold tracking-widest uppercase text-xs sm:text-sm bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
        >
          ⌂ Home
        </motion.button>
      </motion.div>

      {/* ── Name entry modal ─────────────────────────────────────────────── */}
      <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
        <h3 className="text-2xl font-bold text-amber-400 mb-2">Enter Your Name</h3>
        <p className="text-stone-400 text-sm mb-6">Claim your place on the Emperor's leaderboard.</p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitScore()}
          maxLength={24}
          placeholder="Your name..."
          className="
            w-full px-4 py-3 rounded-xl
            bg-stone-800 border border-stone-700 text-stone-100
            focus:outline-none focus:border-amber-500/60
            placeholder:text-stone-600 mb-4
          "
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmitScore}
            disabled={!playerName.trim()}
            className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold tracking-wider transition-colors"
          >
            Submit
          </button>
          <button
            onClick={() => setShowNameModal(false)}
            className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </motion.div>
  );
}

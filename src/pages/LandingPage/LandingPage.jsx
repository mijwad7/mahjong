import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useGame } from '../../hooks/useGame';
import { syncLeaderboard } from '../../game/state/leaderboardSlice';
import { pageFade, staggerContainer, fadeUp } from '../../animations/variants';
import TileCard from '../../components/TileCard/TileCard';
import { TILE_DEFINITIONS } from '../../game/constants/tiles';
import { buildDeck, shuffle } from '../../game/utils/deckUtils';

/** Decorative tiles shown on the landing page. */
const DEMO_TILES = shuffle(buildDeck(TILE_DEFINITIONS)).slice(0, 5);

/**
 * LandingPage — entry point: branding, CTA, and leaderboard.
 */
export default function LandingPage() {
  const { startNewGame } = useGame();
  const dispatch = useDispatch();
  const entries = useSelector((s) => s.leaderboard.entries);

  // Sync leaderboard from localStorage whenever landing page mounts
  useEffect(() => { dispatch(syncLeaderboard()); }, [dispatch]);

  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-stone-950 text-stone-100 flex flex-col"
    >
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-stone-800/60">
        <h1 className="text-2xl font-bold tracking-widest text-amber-400 font-serif">
          EMPEROR'S TABLE
        </h1>
        <nav className="flex gap-6 text-sm text-stone-400">
          <button className="hover:text-amber-400 transition-colors">The Table</button>
          <button className="hover:text-amber-400 transition-colors">Rules</button>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 grid lg:grid-cols-2 gap-0 items-center px-8 py-16 max-w-6xl mx-auto w-full">
        {/* Left col */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs tracking-widest uppercase mb-6">
              ✦ Premium Edition
            </div>
            <h2 className="text-5xl xl:text-6xl font-bold leading-tight">
              Master the{' '}
              <span className="text-amber-400 italic font-serif">Ancient</span>
              <br />Flow of Tiles
            </h2>
          </motion.div>

          <motion.p variants={fadeUp} className="text-stone-400 text-lg leading-relaxed max-w-md">
            Experience the definitive Mahjong Hi-Lo challenge. Predict the
            sequence, master the flow, and ascend the hall of fame in this
            atmospheric tactical experience.
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={startNewGame}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(217,119,6,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="
              inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-amber-500 hover:bg-amber-400
              text-stone-950 font-bold tracking-widest text-sm uppercase
              shadow-lg shadow-amber-500/25 transition-colors
            "
            aria-label="Start a new game"
          >
            Enter the Table
            <span>→</span>
          </motion.button>

          {/* Decorative tile strip */}
          <motion.div variants={fadeUp} className="flex gap-3 mt-4">
            {DEMO_TILES.map((tile, i) => (
              <motion.div
                key={tile.instanceId}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
              >
                <TileCard tile={tile} tileScaling={{}} size="sm" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right col — leaderboard ─────────────────────────────────────── */}
        <Leaderboard entries={entries} />
      </main>

      {/* ── Feature cards ────────────────────────────────────────────────── */}
      <section className="border-t border-stone-800/60 px-8 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="text-amber-400 font-bold text-lg">{f.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ── Leaderboard panel ──────────────────────────────────────────────────────

function Leaderboard({ entries }) {
  const top5 = entries.slice(0, 5);

  return (
    <motion.div
      variants={fadeUp}
      className="
        rounded-2xl border border-stone-700/60 bg-stone-900/70
        backdrop-blur-sm p-6 shadow-2xl max-w-sm ml-auto w-full
      "
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-xl">🏆</span>
          <h3 className="font-bold tracking-widest text-stone-200 uppercase text-sm">
            Top Scores
          </h3>
        </div>
        <span className="text-[10px] text-stone-500 uppercase tracking-widest">All Time</span>
      </div>

      {top5.length === 0 ? (
        <p className="text-stone-500 text-sm text-center py-8 italic">
          No scores yet. Be the first!
        </p>
      ) : (
        <ol className="space-y-2">
          {top5.map((entry, i) => (
            <LeaderboardRow key={`${entry.name}-${i}`} rank={i + 1} entry={entry} />
          ))}
        </ol>
      )}

      {entries.length > 5 && (
        <button className="w-full mt-4 text-xs text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors py-2">
          View Full Hall of Fame
        </button>
      )}
    </motion.div>
  );
}

function LeaderboardRow({ rank, entry }) {
  const isFirst = rank === 1;
  return (
    <li
      className={`
        flex items-center justify-between rounded-xl px-4 py-3
        ${isFirst
          ? 'bg-amber-500/15 border border-amber-500/30'
          : 'bg-stone-800/60 border border-stone-700/30'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`
            w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold
            ${isFirst ? 'bg-amber-500 text-stone-950' : 'bg-stone-700 text-stone-400'}
          `}
        >
          {rank}
        </span>
        <span className={`font-medium text-sm ${isFirst ? 'text-amber-300' : 'text-stone-300'}`}>
          {entry.name}
        </span>
      </div>
      <div className="text-right">
        <div className={`font-bold text-base tabular-nums ${isFirst ? 'text-amber-400' : 'text-stone-200'}`}>
          {entry.score.toLocaleString()}
        </div>
        <div className="text-[9px] text-stone-500 uppercase tracking-wider">PTS</div>
      </div>
    </li>
  );
}

const FEATURES = [
  {
    icon: '✦',
    title: 'Atmospheric Design',
    desc: 'Immerse yourself in a handcrafted world of tactile tiles and serene lighting effects designed for focus.',
  },
  {
    icon: '🧠',
    title: 'Tactical Depth',
    desc: 'Master complex probability and sequence prediction in a game that rewards patience and sharp intuition.',
  },
  {
    icon: '📜',
    title: 'Ancient Heritage',
    desc: 'A modern tribute to the timeless flow of Mahjong, refined for a new generation of tactical thinkers.',
  },
];

import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GAME_PHASE } from './game/state/gameSlice';
import LandingPage  from './pages/LandingPage/LandingPage';
import GamePage     from './pages/GamePage/GamePage';
import GameOverPage from './pages/GameOverPage/GameOverPage';

/**
 * App — top-level router.
 *
 * Uses the Redux `game.phase` field to decide which page to render.
 * AnimatePresence enables smooth cross-page transitions.
 *
 * To add a new screen: add a new GAME_PHASE value and a case here.
 */
export default function App() {
  const phase = useSelector((s) => s.game.phase);

  return (
    <AnimatePresence mode="wait">
      {phase === GAME_PHASE.IDLE && <LandingPage key="landing" />}
      {phase === GAME_PHASE.PLAYING && <GamePage key="game" />}
      {phase === GAME_PHASE.GAME_OVER && <GameOverPage key="game-over" />}
    </AnimatePresence>
  );
}

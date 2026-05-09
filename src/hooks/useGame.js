import { useDispatch, useSelector } from 'react-redux';
import { newGame, exitToLanding, placeBet, GAME_PHASE } from '../game/state/gameSlice';
import { resetUi, setLastRoundResult } from '../game/state/uiSlice';
import { submitScore } from '../game/state/leaderboardSlice';

/**
 * useGame — single hook that gives any component access to all game actions
 * and the most commonly needed state selectors.
 *
 * Components should use this hook rather than reaching into the store directly,
 * so selector paths are defined in one place.
 */
export function useGame() {
  const dispatch = useDispatch();
  const game = useSelector((s) => s.game);

  function startNewGame() {
    dispatch(resetUi());
    dispatch(newGame());
  }

  function goToLanding() {
    dispatch(resetUi());
    dispatch(exitToLanding());
  }

  function bet(direction) {
    dispatch(placeBet({ bet: direction }));
  }

  function saveScore(playerName) {
    dispatch(submitScore({ name: playerName, score: game.score }));
  }

  return {
    // state
    phase: game.phase,
    score: game.score,
    winStreak: game.winStreak,
    totalHands: game.totalHands,
    reshuffleCount: game.reshuffleCount,
    currentHand: game.currentHand,
    currentHandValue: game.currentHandValue,
    drawPileCount: game.drawPile.length,
    discardPileCount: game.discardPile.length,
    handHistory: game.handHistory,
    tileScaling: game.tileScaling,
    gameOverCause: game.gameOverCause,
    isPlaying: game.phase === GAME_PHASE.PLAYING,
    isGameOver: game.phase === GAME_PHASE.GAME_OVER,

    // actions
    startNewGame,
    goToLanding,
    bet,
    saveScore,
  };
}

import { createSlice } from '@reduxjs/toolkit';
import { TILE_DEFINITIONS } from '../constants/tiles';
import GAME_CONFIG from '../constants/gameConfig';
import { buildDeck, shuffle, drawTiles, reshuffleDeck } from '../utils/deckUtils';
import {
  buildInitialTileScaling,
  calculateHandValue,
  applyTileScalingUpdate,
  hasValueBreachedBounds,
  getBreachedTileIds,
} from '../utils/tileUtils';
import { TILE_DEFINITIONS_MAP } from '../constants/tiles';
import { resolveRound, calculateScoreDelta } from '../utils/roundUtils';

/**
 * Game phase enum — drives which UI screen/overlay is shown.
 */
export const GAME_PHASE = {
  IDLE: 'idle',       // on landing page, no game running
  PLAYING: 'playing', // active gameplay
  GAME_OVER: 'game_over',
};

/**
 * Builds a pristine game state for a new session.
 * Extracted so it can be re-used by the `newGame` reducer.
 */
function buildInitialGameState() {
  const freshDeck = shuffle(buildDeck(TILE_DEFINITIONS));
  const { drawn, remaining } = drawTiles(freshDeck, GAME_CONFIG.handSize);

  const tileScaling = buildInitialTileScaling();
  const initialHandValue = calculateHandValue(drawn, tileScaling, TILE_DEFINITIONS_MAP);

  return {
    phase: GAME_PHASE.IDLE,
    score: 0,
    winStreak: 0,
    totalHands: 0,
    reshuffleCount: 0,

    drawPile: remaining,
    discardPile: [],

    currentHand: drawn,
    currentHandValue: initialHandValue,

    /** Tile-level dynamic values for non-number tiles. */
    tileScaling,

    /** Circular history of the last N hands. */
    handHistory: [],

    /** Tile IDs that caused game over (for display). */
    gameOverCause: null,
  };
}

/**
 * gameSlice — the core game engine in Redux form.
 *
 * All mutations go through reducers here; components only dispatch actions
 * and read selectors — zero game logic bleeds into the UI layer.
 */
const gameSlice = createSlice({
  name: 'game',
  initialState: buildInitialGameState(),

  reducers: {
    /** Starts a fresh game session. */
    newGame: () => ({
      ...buildInitialGameState(),
      phase: GAME_PHASE.PLAYING,
    }),

    /** Resets to idle without starting. */
    exitToLanding: (state) => {
      state.phase = GAME_PHASE.IDLE;
    },

    /**
     * Core action: player places a bet, new hand is drawn, round is resolved.
     *
     * payload: { bet: 'higher' | 'lower' }
     *
     * Steps:
     *  1. Possibly reshuffle if draw pile is empty
     *  2. Draw next hand
     *  3. Resolve win/loss
     *  4. Update score and streak
     *  5. Apply tile scaling
     *  6. Check game-over conditions
     *  7. Archive previous hand to history
     */
    placeBet: (state, action) => {
      const { bet } = action.payload;

      // ── 1. Reshuffle if needed ──────────────────────────────────────────
      let { drawPile, discardPile, reshuffleCount } = state;

      if (drawPile.length < GAME_CONFIG.handSize) {
        if (reshuffleCount >= GAME_CONFIG.maxReshuffles - 1) {
          // Game over triggered exactly on the 3rd depletion
          state.phase = GAME_PHASE.GAME_OVER;
          state.gameOverCause = { type: 'max_reshuffles', reshuffleCount };
          return;
        }
        const reshuffled = reshuffleDeck(discardPile, TILE_DEFINITIONS);
        drawPile = reshuffled.drawPile;
        discardPile = reshuffled.discardPile;
        reshuffleCount += 1;
        state.reshuffleCount = reshuffleCount;
      }

      // ── 2. Draw next hand ───────────────────────────────────────────────
      const { drawn: nextHand, remaining } = drawTiles(drawPile, GAME_CONFIG.handSize);
      state.drawPile = remaining;
      state.discardPile = [...discardPile, ...state.currentHand];

      // ── 3. Resolve round ────────────────────────────────────────────────
      const nextHandValue = calculateHandValue(nextHand, state.tileScaling, TILE_DEFINITIONS_MAP);
      const { isWin, isTie } = resolveRound(state.currentHandValue, nextHandValue, bet);

      // ── 4. Score & streak ───────────────────────────────────────────────
      const { scoreDelta, newStreak } = calculateScoreDelta(
        isWin, isTie, state.winStreak, GAME_CONFIG
      );
      state.score = Math.max(0, state.score + scoreDelta);
      state.winStreak = newStreak;
      state.totalHands += 1;

      // ── 5. Apply tile scaling (to tiles in the REVEALED hand, if not a tie) ─
      if (!isTie) {
        state.tileScaling = applyTileScalingUpdate(
          nextHand,
          state.tileScaling,
          TILE_DEFINITIONS_MAP,
          isWin,
          GAME_CONFIG.nonNumberValueDelta
        );
      }

      // Recalculate the final value of the revealed hand after it has been scaled
      const finalNextHandValue = calculateHandValue(nextHand, state.tileScaling, TILE_DEFINITIONS_MAP);

      // ── 6. Archive previous hand ────────────────────────────────────────
      const historyEntry = {
        id: state.totalHands, // Guaranteed unique incremental ID for React keys
        hand: state.currentHand,
        handValue: state.currentHandValue,
        bet,
        isWin,
        isTie,
        scoreDelta,
      };
      state.handHistory = [historyEntry, ...state.handHistory].slice(
        0, GAME_CONFIG.maxHistoryLength
      );

      // ── 7. Advance hand ─────────────────────────────────────────────────
      state.currentHand = nextHand;
      state.currentHandValue = finalNextHandValue;

      // ── 8. Check game-over conditions ───────────────────────────────────
      if (hasValueBreachedBounds(state.tileScaling, GAME_CONFIG.gameOverValueBounds)) {
        const breachedIds = getBreachedTileIds(state.tileScaling, GAME_CONFIG.gameOverValueBounds);
        state.phase = GAME_PHASE.GAME_OVER;
        state.gameOverCause = { type: 'tile_value_breach', tileIds: breachedIds };
      }
    },
  },
});

export const { newGame, exitToLanding, placeBet } = gameSlice.actions;
export default gameSlice.reducer;

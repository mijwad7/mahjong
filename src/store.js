import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/state/gameSlice';
import uiReducer from './game/state/uiSlice';
import leaderboardReducer from './game/state/leaderboardSlice';

/**
 * Redux store.
 *
 * Three top-level slices to keep concerns separated:
 *  - game        : all engine/gameplay state
 *  - ui          : transient display state (animations, modals)
 *  - leaderboard : persisted high scores
 */
const store = configureStore({
  reducer: {
    game: gameReducer,
    ui: uiReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;

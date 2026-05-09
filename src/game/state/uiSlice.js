import { createSlice } from '@reduxjs/toolkit';

/**
 * uiSlice — manages transient UI state that does NOT belong in the game engine.
 *
 * Keeps UI concerns (modals, loading states, transitions) decoupled from
 * game logic so each can evolve independently.
 *
 * State shape:
 *   isDealing        : bool   – true while the hand deal animation is playing
 *   showHistory      : bool   – whether the history panel is expanded
 *   pendingBet       : null | 'higher' | 'lower'  – bet awaiting confirmation
 *   lastRoundResult  : null | { isWin, isTie, scoreDelta }
 *   activeModal      : null | 'gameOver' | 'leaderboard'
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDealing: false,
    showHistory: true,
    pendingBet: null,
    lastRoundResult: null,
    activeModal: null,
  },
  reducers: {
    setDealing: (state, action) => { state.isDealing = action.payload; },
    toggleHistory: (state) => { state.showHistory = !state.showHistory; },
    setPendingBet: (state, action) => { state.pendingBet = action.payload; },
    setLastRoundResult: (state, action) => { state.lastRoundResult = action.payload; },
    openModal: (state, action) => { state.activeModal = action.payload; },
    closeModal: (state) => { state.activeModal = null; },
    resetUi: (state) => {
      state.isDealing = false;
      state.pendingBet = null;
      state.lastRoundResult = null;
      state.activeModal = null;
    },
  },
});

export const {
  setDealing,
  toggleHistory,
  setPendingBet,
  setLastRoundResult,
  openModal,
  closeModal,
  resetUi,
} = uiSlice.actions;

export default uiSlice.reducer;

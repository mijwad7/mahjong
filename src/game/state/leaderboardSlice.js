import { createSlice } from '@reduxjs/toolkit';
import { readLeaderboard, addLeaderboardEntry } from '../../services/leaderboardService';

/**
 * leaderboardSlice — manages persistent high-score data.
 *
 * State shape:
 *   entries: Array<{ name: string, score: number, date: string }>
 */
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    entries: readLeaderboard(),
  },
  reducers: {
    /**
     * Submits a score and re-loads the updated leaderboard from the service.
     * payload: { name: string, score: number }
     */
    submitScore: (state, action) => {
      const { name, score } = action.payload;
      state.entries = addLeaderboardEntry(name, score);
    },

    /** Re-syncs entries from localStorage (e.g. after tab focus). */
    syncLeaderboard: (state) => {
      state.entries = readLeaderboard();
    },
  },
});

export const { submitScore, syncLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

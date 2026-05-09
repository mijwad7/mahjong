/** Leaderboard storage key in localStorage. */
const STORAGE_KEY = 'mahjong_leaderboard';

/** Maximum entries retained in the leaderboard. */
const MAX_ENTRIES = 10;

/**
 * Reads leaderboard entries from localStorage.
 * Returns an empty array if nothing is stored or data is malformed.
 *
 * @returns {Array<{ name: string, score: number, date: string }>}
 */
export function readLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Writes the given entries array to localStorage.
 *
 * @param {Array} entries
 */
export function writeLeaderboard(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Adds a new score to the leaderboard, sorts it descending, trims to MAX_ENTRIES,
 * persists to localStorage, and returns the updated list.
 *
 * @param {string} name - Player name
 * @param {number} score - Final game score
 * @returns {Array} Updated leaderboard entries
 */
export function addLeaderboardEntry(name, score) {
  const existing = readLeaderboard();
  const newEntry = { name, score, date: new Date().toISOString() };
  const updated = [...existing, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES);
  writeLeaderboard(updated);
  return updated;
}

/**
 * Clears all leaderboard data from localStorage.
 */
export function clearLeaderboard() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * BET directions — the only two choices a player can make.
 * Extend this object to support additional bet types (e.g. EQUAL) without
 * touching any component code.
 */
export const BET = {
  HIGHER: 'higher',
  LOWER: 'lower',
};

/**
 * Resolves a round outcome.
 *
 * @param {number} previousHandValue - Total value of the hand the player evaluated.
 * @param {number} currentHandValue  - Total value of the newly drawn hand.
 * @param {string} bet               - BET.HIGHER or BET.LOWER
 * @returns {{ isWin: boolean, isTie: boolean }}
 */
export function resolveRound(previousHandValue, currentHandValue, bet) {
  if (currentHandValue === previousHandValue) {
    return { isWin: false, isTie: true };
  }
  const isHigher = currentHandValue > previousHandValue;
  const isWin = bet === BET.HIGHER ? isHigher : !isHigher;
  return { isWin, isTie: false };
}

/**
 * Calculates the score delta for a single round.
 *
 * Streak multipliers reward consecutive correct predictions.
 * A loss or tie resets the streak.
 *
 * @param {boolean} isWin
 * @param {boolean} isTie
 * @param {number} currentStreak - Wins in a row before this round
 * @param {{ pointsPerWin: number, pointsPerLoss: number, streakMultiplierEnabled: boolean }} config
 * @returns {{ scoreDelta: number, newStreak: number }}
 */
export function calculateScoreDelta(isWin, isTie, currentStreak, config) {
  if (isTie) {
    return { scoreDelta: 0, newStreak: 0 };
  }
  if (isWin) {
    const newStreak = currentStreak + 1;
    const multiplier = config.streakMultiplierEnabled ? newStreak : 1;
    return { scoreDelta: config.pointsPerWin * multiplier, newStreak };
  }
  return { scoreDelta: -config.pointsPerLoss, newStreak: 0 };
}

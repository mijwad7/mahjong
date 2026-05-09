/**
 * Central configuration object for the Hand Betting Game.
 *
 * All tunable game parameters live here.  Changing these values should be
 * the *only* thing needed to alter game balance — no business logic edits required.
 */
const GAME_CONFIG = {
  /** Points awarded per correct prediction. */
  pointsPerWin: 100,

  /** Points deducted per incorrect prediction. */
  pointsPerLoss: 50,

  /** Streak multiplier applied to pointsPerWin. e.g. 3 correct in a row = 3× */
  streakMultiplierEnabled: true,

  /** How many hands to retain in the history timeline. */
  maxHistoryLength: 10,

  /** Number of tiles dealt per hand. */
  handSize: 3,

  /** Maximum reshuffles before game over. */
  maxReshuffles: 3,

  /** Value bounds that trigger immediate game over. */
  gameOverValueBounds: { min: 0, max: 10 },

  /** Base dynamic value for non-number tiles. */
  nonNumberBaseValue: 5,

  /** Delta applied to a non-number tile's dynamic value per win/loss. */
  nonNumberValueDelta: 1,
};

export default GAME_CONFIG;

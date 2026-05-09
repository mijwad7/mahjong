/**
 * Tile categories used throughout the game engine.
 * Adding a new category here automatically supports it in the engine.
 */
export const TILE_CATEGORY = {
  NUMBER: 'number',
  WIND: 'wind',
  DRAGON: 'dragon',
};

/**
 * Tile types — unique identifiers for each distinct tile.
 * Extend this list to add new tiles without touching game logic.
 */
export const TILE_TYPE = {
  // Number tiles (1–9 in Man, Pin, Sou suits)
  MAN_1: 'man_1', MAN_2: 'man_2', MAN_3: 'man_3',
  MAN_4: 'man_4', MAN_5: 'man_5', MAN_6: 'man_6',
  MAN_7: 'man_7', MAN_8: 'man_8', MAN_9: 'man_9',

  PIN_1: 'pin_1', PIN_2: 'pin_2', PIN_3: 'pin_3',
  PIN_4: 'pin_4', PIN_5: 'pin_5', PIN_6: 'pin_6',
  PIN_7: 'pin_7', PIN_8: 'pin_8', PIN_9: 'pin_9',

  SOU_1: 'sou_1', SOU_2: 'sou_2', SOU_3: 'sou_3',
  SOU_4: 'sou_4', SOU_5: 'sou_5', SOU_6: 'sou_6',
  SOU_7: 'sou_7', SOU_8: 'sou_8', SOU_9: 'sou_9',

  // Wind tiles
  WIND_EAST: 'wind_east',
  WIND_SOUTH: 'wind_south',
  WIND_WEST: 'wind_west',
  WIND_NORTH: 'wind_north',

  // Dragon tiles
  DRAGON_RED: 'dragon_red',
  DRAGON_GREEN: 'dragon_green',
  DRAGON_WHITE: 'dragon_white',
};

/**
 * Suit definitions for number tiles — purely for display grouping.
 */
export const SUIT = {
  MAN: 'man',
  PIN: 'pin',
  SOU: 'sou',
};

/**
 * Master tile definitions. Each tile has:
 *  - id: unique string key (TILE_TYPE value)
 *  - category: TILE_CATEGORY
 *  - suit: (number tiles only) SUIT value
 *  - faceValue: the static face number (number tiles only)
 *  - label: human-readable display name
 *  - symbol: Unicode character shown on the tile face
 *  - color: accent color class for styling
 *  - count: copies of this tile in one full deck (standard = 4)
 *
 * Non-number tiles omit `faceValue` and `suit` — their runtime value is
 * tracked separately in tileScaling state so it can evolve per session.
 */
export const TILE_DEFINITIONS = [
  // ── Man (Characters) ──────────────────────────────────────────────────────
  { id: TILE_TYPE.MAN_1, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 1,  label: '1 Man', symbol: '一', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_2, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 2,  label: '2 Man', symbol: '二', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_3, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 3,  label: '3 Man', symbol: '三', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_4, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 4,  label: '4 Man', symbol: '四', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_5, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 5,  label: '5 Man', symbol: '五', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_6, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 6,  label: '6 Man', symbol: '六', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_7, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 7,  label: '7 Man', symbol: '七', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_8, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 8,  label: '8 Man', symbol: '八', color: 'red',   count: 4 },
  { id: TILE_TYPE.MAN_9, category: TILE_CATEGORY.NUMBER, suit: SUIT.MAN, faceValue: 9,  label: '9 Man', symbol: '九', color: 'red',   count: 4 },

  // ── Pin (Circles) ─────────────────────────────────────────────────────────
  { id: TILE_TYPE.PIN_1, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 1,  label: '1 Pin', symbol: '①', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_2, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 2,  label: '2 Pin', symbol: '②', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_3, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 3,  label: '3 Pin', symbol: '③', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_4, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 4,  label: '4 Pin', symbol: '④', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_5, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 5,  label: '5 Pin', symbol: '⑤', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_6, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 6,  label: '6 Pin', symbol: '⑥', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_7, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 7,  label: '7 Pin', symbol: '⑦', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_8, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 8,  label: '8 Pin', symbol: '⑧', color: 'blue',  count: 4 },
  { id: TILE_TYPE.PIN_9, category: TILE_CATEGORY.NUMBER, suit: SUIT.PIN, faceValue: 9,  label: '9 Pin', symbol: '⑨', color: 'blue',  count: 4 },

  // ── Sou (Bamboo) ──────────────────────────────────────────────────────────
  { id: TILE_TYPE.SOU_1, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 1,  label: '1 Sou', symbol: '1', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_2, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 2,  label: '2 Sou', symbol: '2', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_3, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 3,  label: '3 Sou', symbol: '3', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_4, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 4,  label: '4 Sou', symbol: '4', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_5, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 5,  label: '5 Sou', symbol: '5', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_6, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 6,  label: '6 Sou', symbol: '6', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_7, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 7,  label: '7 Sou', symbol: '7', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_8, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 8,  label: '8 Sou', symbol: '8', color: 'green', count: 4 },
  { id: TILE_TYPE.SOU_9, category: TILE_CATEGORY.NUMBER, suit: SUIT.SOU, faceValue: 9,  label: '9 Sou', symbol: '9', color: 'green', count: 4 },

  // ── Winds ──────────────────────────────────────────────────────────────────
  { id: TILE_TYPE.WIND_EAST,  category: TILE_CATEGORY.WIND, label: 'East Wind',  symbol: '東', color: 'gold', count: 4 },
  { id: TILE_TYPE.WIND_SOUTH, category: TILE_CATEGORY.WIND, label: 'South Wind', symbol: '南', color: 'gold', count: 4 },
  { id: TILE_TYPE.WIND_WEST,  category: TILE_CATEGORY.WIND, label: 'West Wind',  symbol: '西', color: 'gold', count: 4 },
  { id: TILE_TYPE.WIND_NORTH, category: TILE_CATEGORY.WIND, label: 'North Wind', symbol: '北', color: 'gold', count: 4 },

  // ── Dragons ────────────────────────────────────────────────────────────────
  { id: TILE_TYPE.DRAGON_RED,   category: TILE_CATEGORY.DRAGON, label: 'Red Dragon',   symbol: '中', color: 'red',   count: 4 },
  { id: TILE_TYPE.DRAGON_GREEN, category: TILE_CATEGORY.DRAGON, label: 'Green Dragon', symbol: '發', color: 'green', count: 4 },
  { id: TILE_TYPE.DRAGON_WHITE, category: TILE_CATEGORY.DRAGON, label: 'White Dragon', symbol: '白', color: 'white', count: 4 },
];

/**
 * Lookup map from tile id → TILE_DEFINITIONS entry (O(1) access).
 */
export const TILE_DEFINITIONS_MAP = Object.fromEntries(
  TILE_DEFINITIONS.map((def) => [def.id, def])
);

/** Base dynamic value assigned to newly introduced non-number tiles. */
export const NON_NUMBER_BASE_VALUE = 5;

/** Value bounds that trigger game over when any tile reaches them. */
export const GAME_OVER_VALUE_BOUNDS = { min: 0, max: 10 };

/** Number of tiles in a single dealt hand. */
export const HAND_SIZE = 3;

/** How many reshuffles are allowed before game over (0-indexed → runs out on 3rd). */
export const MAX_RESHUFFLES = 3;

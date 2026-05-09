import { TILE_DEFINITIONS, TILE_CATEGORY, NON_NUMBER_BASE_VALUE } from '../constants/tiles';

/**
 * Builds the initial tileScaling map used for non-number tiles.
 * Returns: { [tileId]: number }
 *
 * Number tiles always return their faceValue, so they are not included here.
 */
export function buildInitialTileScaling() {
  return Object.fromEntries(
    TILE_DEFINITIONS
      .filter((def) => def.category !== TILE_CATEGORY.NUMBER)
      .map((def) => [def.id, NON_NUMBER_BASE_VALUE])
  );
}

/**
 * Resolves the current value of a tile instance, factoring in tileScaling.
 *
 * @param {Object} tile - A tile instance (has an `id` field referencing TILE_DEFINITIONS_MAP)
 * @param {Object} tileScaling - Map of { tileId: currentValue } for non-number tiles
 * @param {Object} tileDefinitionsMap - TILE_DEFINITIONS_MAP lookup
 * @returns {number}
 */
export function getTileValue(tile, tileScaling, tileDefinitionsMap) {
  const def = tileDefinitionsMap[tile.id];
  if (!def) return 0;
  if (def.category === TILE_CATEGORY.NUMBER) return def.faceValue;
  return tileScaling[tile.id] ?? NON_NUMBER_BASE_VALUE;
}

/**
 * Calculates the total value of an array of tile instances.
 *
 * @param {Array} tiles - Array of tile instances
 * @param {Object} tileScaling
 * @param {Object} tileDefinitionsMap
 * @returns {number}
 */
export function calculateHandValue(tiles, tileScaling, tileDefinitionsMap) {
  return tiles.reduce(
    (sum, tile) => sum + getTileValue(tile, tileScaling, tileDefinitionsMap),
    0
  );
}

/**
 * Applies win/loss delta to the tileScaling map for all non-number tiles
 * that were part of a hand.  Returns a NEW map (immutable update).
 *
 * @param {Array} tiles - Tile instances from the evaluated hand
 * @param {Object} tileScaling - Current scaling map
 * @param {Object} tileDefinitionsMap
 * @param {boolean} isWin - Whether the hand was a winning hand
 * @param {number} delta - Amount to change by (from GAME_CONFIG.nonNumberValueDelta)
 * @returns {Object} Updated tileScaling map
 */
export function applyTileScalingUpdate(tiles, tileScaling, tileDefinitionsMap, isWin, delta) {
  const updated = { ...tileScaling };
  for (const tile of tiles) {
    const def = tileDefinitionsMap[tile.id];
    if (!def || def.category === TILE_CATEGORY.NUMBER) continue;
    updated[tile.id] = (updated[tile.id] ?? NON_NUMBER_BASE_VALUE) + (isWin ? delta : -delta);
  }
  return updated;
}

/**
 * Checks whether any tile's current value has breached the game-over bounds.
 *
 * @param {Object} tileScaling
 * @param {{ min: number, max: number }} bounds
 * @returns {boolean}
 */
export function hasValueBreachedBounds(tileScaling, bounds) {
  return Object.values(tileScaling).some(
    (val) => val <= bounds.min || val >= bounds.max
  );
}

/**
 * Returns the tile ID(s) that have breached game-over bounds (for diagnostics/display).
 *
 * @param {Object} tileScaling
 * @param {{ min: number, max: number }} bounds
 * @returns {string[]}
 */
export function getBreachedTileIds(tileScaling, bounds) {
  return Object.entries(tileScaling)
    .filter(([, val]) => val <= bounds.min || val >= bounds.max)
    .map(([id]) => id);
}

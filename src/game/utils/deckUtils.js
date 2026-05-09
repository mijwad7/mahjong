/**
 * Builds a full deck of tile instances from TILE_DEFINITIONS.
 *
 * Each tile instance is a plain object:
 *   { instanceId: string, id: string }
 *
 * `instanceId` is unique per copy so React list keys and drag-and-drop stay stable.
 * `id` references TILE_DEFINITIONS_MAP for definition lookups.
 *
 * @param {Array} tileDefinitions - TILE_DEFINITIONS array
 * @returns {Array} flat array of tile instance objects
 */
import GAME_CONFIG from '../constants/gameConfig';

export function buildDeck(tileDefinitions) {
  let counter = 0;
  const copiesCount = GAME_CONFIG.shortDeck ? 1 : undefined;
  return tileDefinitions.flatMap((def) =>
    Array.from({ length: copiesCount ?? def.count }, () => ({
      instanceId: `${def.id}_${counter++}`,
      id: def.id,
    }))
  );
}

/**
 * Fisher-Yates shuffle — returns a NEW shuffled array without mutating input.
 *
 * @param {Array} array
 * @returns {Array}
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Draws `count` tiles from the top of the draw pile.
 * Returns { drawn, remaining }.
 *
 * @param {Array} drawPile
 * @param {number} count
 * @returns {{ drawn: Array, remaining: Array }}
 */
export function drawTiles(drawPile, count) {
  return {
    drawn: drawPile.slice(0, count),
    remaining: drawPile.slice(count),
  };
}

/**
 * Performs a reshuffle: combines a fresh deck with the current discard pile,
 * shuffles everything together into a new draw pile.
 *
 * @param {Array} discardPile - Current discard pile
 * @param {Array} tileDefinitions - TILE_DEFINITIONS for building a fresh deck
 * @returns {{ drawPile: Array, discardPile: Array }}
 */
export function reshuffleDeck(discardPile, tileDefinitions) {
  const freshDeck = buildDeck(tileDefinitions);
  const combined = [...freshDeck, ...discardPile];
  return {
    drawPile: shuffle(combined),
    discardPile: [],
  };
}

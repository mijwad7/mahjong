# Emperor's Table — Mahjong Hand Betting Game

A production-quality, premium web-based Mahjong Hi-Lo hand betting game.

## Live Demo

> Record your Loom walkthrough URL here after submission.

---

## Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| State Management | Redux Toolkit |
| Animation | Framer Motion |
| Styling | Tailwind CSS v4 |
| Persistence | localStorage (leaderboard) |

---

## Architecture Overview

```
src/
├── game/
│   ├── constants/       # Tile definitions, game config (single source of truth)
│   ├── engine/          # (reserved) for future pure-logic helpers
│   ├── models/          # (reserved) for domain model factories
│   ├── state/           # Redux slices: gameSlice, uiSlice, leaderboardSlice
│   └── utils/           # Pure functions: tileUtils, deckUtils, roundUtils
├── components/          # Reusable UI: TileCard, Modal, StatBadge, HandHistoryTimeline
├── pages/               # Page-level components: Landing, Game, GameOver
├── hooks/               # Custom hooks: useGame, useUI
├── animations/          # Framer Motion variant presets
├── services/            # External integrations: leaderboardService (localStorage)
├── styles/              # Global CSS entry
├── store.js             # Redux store definition
└── App.jsx              # Phase-based router
```

### Key Design Decisions

1. **Game logic lives exclusively in `gameSlice.js`** — components only dispatch actions and read selectors, so the engine can be tested or swapped independently.

2. **`TILE_DEFINITIONS` as the single source of truth** — adding a new tile type means adding one entry to the array; no other file needs to change.

3. **`GAME_CONFIG` as the balance sheet** — all tunable numbers (points per win, reshuffle limit, hand size) are in one object. Changing game feel = editing one file.

4. **Pure utility functions** — `deckUtils`, `tileUtils`, `roundUtils` are side-effect-free and easily unit-testable without a Redux store.

5. **Three Redux slices, separated by concern:**
   - `gameSlice` — engine state (authoritative)
   - `uiSlice`   — transient display state (modals, animations)
   - `leaderboardSlice` — persisted scores

6. **Animation variants centralised** in `animations/variants.js` so the motion language is consistent and easy to update globally.

---

## Game Rules

- **Tiles dealt per hand:** 3
- **Number tiles** — value equals face value (1–9)
- **Wind / Dragon tiles** — start at value 5; +1 per win, −1 per loss (per tile)
- **Bet Higher / Lower** — predict whether the next hand total is higher or lower
- **Ties** — no score change, streak resets
- **Streak multiplier** — correct streak × base points per win
- **Reshuffles** — when draw pile is empty, fresh deck merges with discards (max 3)
- **Game Over** — any tile value reaches 0 or 10, OR third reshuffle is exhausted

---

## Extensibility Notes

The codebase is designed to be extended during an onsite review:

- **New tile types**: Add entries to `TILE_DEFINITIONS` in `tiles.js`
- **New game modes**: Add a phase to `GAME_PHASE`, a case in `App.jsx`, and a new page
- **New bet types**: Add to the `BET` object in `roundUtils.js`; `resolveRound` handles them
- **Score rules change**: Update `GAME_CONFIG` or `calculateScoreDelta` in `roundUtils.js`
- **Multiplayer / rooms**: Add a `roomSlice` and a socket service — game engine untouched
- **Tile animations**: Edit `animations/variants.js` — one source for all motion

---

## AI Utilisation

This project was built with the assistance of an AI coding assistant (Antigravity). The following was AI-assisted:

- Boilerplate scaffolding and repetitive code structure
- Tile definitions array population
- Framer Motion variant object setup
- README drafting

The following was **handwritten / directed by the developer**:

- Overall architecture and folder structure decisions
- Game engine logic design (`placeBet` reducer, reshuffle flow, scaling system)
- Component composition and page layout decisions
- Design aesthetic and Tailwind class choices
- All state management patterns and separation of concerns decisions

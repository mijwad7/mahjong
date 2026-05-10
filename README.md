# Emperor's Table — Mahjong Hand Betting Game

A polished web-based Mahjong hand betting game built with React, Redux Toolkit, and Framer Motion.

---

## Live Demo

https://www.loom.com/share/771a0deb543b449e8f23f6d2c781b8e3

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

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Framework        | React 18 (Vite)            |
| State Management | Redux Toolkit              |
| Animation        | Framer Motion              |
| Styling          | Tailwind CSS v4            |
| Persistence      | localStorage (leaderboard) |

---

## Architecture Overview

```text
src/
├── game/
│   ├── constants/       # Tile definitions and gameplay configuration
│   ├── engine/          # Reserved for future gameplay engine helpers
│   ├── models/          # Reserved for domain model factories
│   ├── state/           # Redux slices: gameSlice, uiSlice, leaderboardSlice
│   └── utils/           # Pure gameplay utilities: deckUtils, tileUtils, roundUtils
├── components/          # Reusable UI components
├── pages/               # Page-level screens: Landing, Game, GameOver
├── hooks/               # Custom hooks
├── animations/          # Framer Motion variant presets
├── services/            # External integrations: leaderboardService
├── styles/              # Global styling
├── store.js             # Redux store configuration
└── App.jsx              # Application routing and game flow
```

---

## Key Design Decisions

### 1. Gameplay Logic Separation

Gameplay calculations and round resolution live inside Redux reducers and utility functions rather than UI components. Components primarily dispatch actions and render derived state.

This separation makes future rule changes easier to implement without rewriting presentation logic.

---

### 2. Centralised Tile Definitions

All tile metadata is managed through a shared tile definition configuration. Adding a new tile type or modifying existing tiles requires minimal changes across the codebase.

---

### 3. Centralised Gameplay Configuration

Gameplay balancing values such as:

* reshuffle limits
* hand size
* scoring values
* tile scaling boundaries

are managed through a dedicated configuration object to simplify balancing and future iteration.

---

### 4. Pure Utility Functions

Gameplay helper utilities such as:

* deck generation
* shuffling
* score calculation
* hand resolution

are implemented as side-effect-free functions and structured to be easily testable.

---

### 5. State Separation by Concern

Redux state is separated into focused slices:

* `gameSlice` — core gameplay state
* `uiSlice` — transient UI state and modal handling
* `leaderboardSlice` — persisted leaderboard state

This keeps gameplay logic isolated from presentation concerns.

---

### 6. Consistent Animation System

Animation variants are centralised through reusable Framer Motion presets so motion behaviour remains consistent throughout the application.

---

## Game Rules

* Each hand contains 3 Mahjong tiles
* Number tiles use their face value (1–9)
* Dragon and Wind tiles begin at value 5
* Honor tiles increase by 1 after appearing in a winning hand
* Honor tiles decrease by 1 after appearing in a losing hand
* Players bet whether the next hand total will be higher or lower
* Ties result in no score change
* The score system includes streak-based multipliers
* When the draw pile is exhausted, a fresh deck is merged with the discard pile and reshuffled
* The game ends if:

  * any honor tile reaches 0 or 10
  * or the draw pile is exhausted for the third time

---

## Extensibility Notes

The project structure was intentionally designed to support future feature additions and interview extensions.

### New Tile Types

Add new entries inside the tile definition configuration.

### New Game Modes

Add a new gameplay phase and corresponding page component.

### New Bet Types

Extend the round resolution utilities and add new action handling logic.

### Balance Adjustments

Modify gameplay configuration values without rewriting engine logic.

### Multiplayer Support

Additional networking layers and room state could be introduced with minimal impact on the existing gameplay engine structure.

### Animation Updates

Motion behaviour can be updated centrally through the animation presets.

---

## Manual Testing

The application was manually tested for:

* dynamic tile scaling edge cases
* reshuffle sequencing and deck exhaustion
* rapid input handling
* long gameplay sessions
* responsive layout behaviour
* game-over boundary conditions
* leaderboard persistence

---

## AI Utilisation

AI-assisted tooling was used during development primarily for:

* scaffolding and repetitive boilerplate generation
* UI experimentation and iteration
* animation variant drafting
* structural refactoring suggestions
* README drafting assistance

All gameplay architecture, state flow decisions, game rules implementation, component composition, debugging, testing, and final integration decisions were reviewed, modified, and directed manually during development.

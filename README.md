# Hangman — The Word Detective Game

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0074?logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

A premium dark gothic–themed Hangman game built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Features 8 word categories, animated SVG hangman drawing, difficulty levels, a hint system, score tracking with win streaks, and a localStorage leaderboard.

---

## Features

- **8 Word Categories** — Animals, Technology, Movies, Science, Countries, Food, Sports, Programming Languages (35+ words each)
- **Animated SVG Hangman** — 10 body parts revealed progressively with Framer Motion stroke-dashoffset animation
- **On-Screen Keyboard** — 26 letter buttons color-coded (neutral → green = correct, red = wrong); physical keyboard (A–Z) also supported
- **3 Difficulty Levels** — Easy (10 attempts), Medium (7 attempts), Hard (5 attempts)
- **Hint System** — reveals a random unguessed letter at the cost of 1 attempt
- **Scoring** — base score per difficulty minus wrong-guess and hint penalties plus streak bonus
- **Win Streak Tracker** — consecutive wins multiply your bonus score
- **LocalStorage Leaderboard** — top 10 scores per difficulty, persisted across sessions
- **Win / Lose Animations** — spring-animated overlay with score counter (win) or dramatic word reveal (lose)
- **Dark Gothic Theme** — deep charcoal (`#1C1C1E`), parchment yellow (`#F5DEB3`), Playfair Display + Special Elite fonts, subtle noise texture

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Framer Motion 12 |
| State | React hooks (`useState`, `useCallback`, `useMemo`) |
| Persistence | `localStorage` (leaderboard) |
| Fonts | Google Fonts — Playfair Display, Special Elite |

---

## Project Structure

```
src/
├── types/
│   └── index.ts              # Shared types: Category, Difficulty, GameState, LeaderboardEntry
├── data/
│   └── wordBank.ts           # 8 categories × 35+ words, getRandomWord()
├── hooks/
│   └── useGame.ts            # Game state machine: idle → playing → won → lost
├── components/
│   ├── HangmanSVG.tsx        # Animated SVG gallows + 10 body parts
│   ├── Keyboard.tsx          # On-screen + physical keyboard
│   ├── WordDisplay.tsx       # Blank/letter reveal with animation
│   ├── CategorySelect.tsx    # Category picker + difficulty selector screen
│   ├── GameScreen.tsx        # Main game UI (SVG, word, keyboard, hint, progress bar)
│   └── Leaderboard.tsx       # localStorage top-10, filterable by difficulty
├── App.tsx                   # Root component, leaderboard persistence
├── index.css                 # Tailwind + dark gothic CSS variables
└── main.tsx                  # React entry point
```

---

## Game Rules

1. A random word is chosen from your selected category.
2. Guess letters one at a time using the on-screen keyboard or your physical keyboard.
3. Each wrong guess adds a body part to the hangman (up to your difficulty limit).
4. Guess all letters before running out of attempts to win.
5. Use the **Hint** button to reveal a random letter — it costs 1 attempt.
6. Score = `base – (wrong × 10) – (hints × 20) + (streak × 25) + 50`

| Difficulty | Attempts | Base Score |
|---|---|---|
| Easy | 10 | 100 |
| Medium | 7 | 200 |
| Hard | 5 | 350 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/<your-username>/hangman-game.git
cd hangman-game
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Deployment

Deploy the `dist/` folder to any static host:

| Platform | Steps |
|---|---|
| Vercel | Connect GitHub repo — auto-deploys on every push |
| Netlify | `netlify deploy --prod --dir dist` |
| GitHub Pages | `npm run build && gh-pages -d dist` |

---

## Resume Skills Covered

- **React 19** — hooks, component composition, `AnimatePresence`, game state machine pattern
- **TypeScript** — strict typing, discriminated unions, generic types
- **Tailwind CSS v4** — utility-first styling, CSS custom properties, responsive layout
- **Framer Motion** — SVG path animation, spring transitions, `AnimatePresence`
- **Algorithms** — state machine design, scoring algorithm with multiple variables
- **JavaScript** — `localStorage`, `Set`, `KeyboardEvent`, closure-based callbacks

---

## License

MIT

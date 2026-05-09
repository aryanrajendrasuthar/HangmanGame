import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from './hooks/useGame';
import CategorySelect from './components/CategorySelect';
import GameScreen from './components/GameScreen';
import Leaderboard from './components/Leaderboard';
import type { Category, Difficulty, LeaderboardEntry } from './types';
import './index.css';

const LS_KEY = 'hangman_leaderboard';

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

export default function App() {
  const { state, correctLetters, wrongLetters, remainingAttempts, startGame, guessLetter, useHint, resetGame } =
    useGame();

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);
  const [lbFilter, setLbFilter] = useState<Difficulty | 'All'>('All');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleStart = useCallback(
    (category: Category, difficulty: Difficulty) => {
      startGame(category, difficulty);
    },
    [startGame],
  );

  const handlePostGame = useCallback(() => {
    if (state.status === 'won') {
      const entry: LeaderboardEntry = {
        name: 'Anonymous',
        score: state.score,
        difficulty: state.difficulty,
        category: state.category,
        word: state.word,
        date: new Date().toLocaleDateString(),
      };
      const updated = [...leaderboard, entry];
      setLeaderboard(updated);
      saveLeaderboard(updated);
    }
    resetGame();
  }, [state, leaderboard, resetGame]);

  return (
    <>
      <AnimatePresence mode="wait">
        {state.status === 'idle' ? (
          <CategorySelect
            key="select"
            onStart={handleStart}
            score={state.score}
            streak={state.streak}
          />
        ) : (
          <GameScreen
            key="game"
            state={state}
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            remainingAttempts={remainingAttempts}
            onGuess={guessLetter}
            onHint={useHint}
            onNewGame={handlePostGame}
            onShowLeaderboard={() => setShowLeaderboard(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLeaderboard && (
          <Leaderboard
            entries={leaderboard}
            filter={lbFilter}
            onFilterChange={setLbFilter}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import HangmanSVG from './HangmanSVG';
import Keyboard from './Keyboard';
import WordDisplay from './WordDisplay';
import type { GameState } from '../types';
import { DIFFICULTY_CONFIG } from '../hooks/useGame';

interface Props {
  state: GameState;
  correctLetters: Set<string>;
  wrongLetters: Set<string>;
  remainingAttempts: number;
  onGuess: (letter: string) => void;
  onHint: () => void;
  onNewGame: () => void;
  onShowLeaderboard: () => void;
}

export default function GameScreen({
  state,
  correctLetters,
  wrongLetters,
  remainingAttempts,
  onGuess,
  onHint,
  onNewGame,
  onShowLeaderboard,
}: Props) {
  const { word, category, difficulty, guessedLetters, wrongGuesses, maxAttempts, status, score, streak, hintsUsed } = state;
  const isPlaying = status === 'playing';
  const isWon = status === 'won';
  const isLost = status === 'lost';
  const diffConfig = DIFFICULTY_CONFIG[difficulty];

  const progressPct = ((maxAttempts - wrongGuesses) / maxAttempts) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onNewGame}
          className="font-typewriter text-xs text-[#A89070] hover:text-[#F5DEB3] transition-colors uppercase tracking-widest"
        >
          ← Menu
        </button>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <p className="font-display text-lg text-[#F5DEB3] font-bold leading-none">{score}</p>
            <p className="font-typewriter text-[10px] text-[#A89070] uppercase tracking-widest">Score</p>
          </div>
          {streak > 0 && (
            <div className="text-center">
              <p className="font-display text-lg text-[#F5DEB3] font-bold leading-none">{streak} 🔥</p>
              <p className="font-typewriter text-[10px] text-[#A89070] uppercase tracking-widest">Streak</p>
            </div>
          )}
          <button
            onClick={onShowLeaderboard}
            className="font-typewriter text-xs text-[#A89070] hover:text-[#F5DEB3] transition-colors uppercase tracking-widest"
          >
            Board
          </button>
        </div>
      </div>

      {/* Category & difficulty badge */}
      <div className="flex gap-3 items-center mb-4">
        <span className="font-typewriter text-xs text-[#A89070] uppercase tracking-widest">{category}</span>
        <span
          className="font-typewriter text-xs px-2 py-0.5 rounded-full border"
          style={{ color: diffConfig.color, borderColor: `${diffConfig.color}55` }}
        >
          {difficulty}
        </span>
      </div>

      {/* Hangman SVG */}
      <div className="w-full max-w-[220px]">
        <HangmanSVG wrongGuesses={wrongGuesses} />
      </div>

      {/* Attempts progress bar */}
      <div className="w-full max-w-xs mt-2 mb-1">
        <div className="flex justify-between mb-1">
          <span className="font-typewriter text-xs text-[#A89070]">
            {wrongGuesses}/{maxAttempts} wrong
          </span>
          <span className="font-typewriter text-xs text-[#A89070]">
            {remainingAttempts} left
          </span>
        </div>
        <div className="h-1.5 bg-[#2A2A2E] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: progressPct > 50 ? '#5BAD6F' : progressPct > 25 ? '#E0A020' : '#E05555' }}
            initial={{ width: '100%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Word display */}
      <WordDisplay word={word} guessedLetters={guessedLetters} reveal={isLost} />

      {/* Wrong letters */}
      {wrongLetters.size > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-2">
          {[...wrongLetters].map((l) => (
            <span key={l} className="font-typewriter text-sm text-[#E05555]/70 line-through">
              {l}
            </span>
          ))}
        </div>
      )}

      {/* Hint button */}
      {isPlaying && (
        <motion.button
          onClick={onHint}
          whileTap={{ scale: 0.95 }}
          className="mb-2 font-typewriter text-xs text-[#A89070] border border-[#A89070]/30 px-4 py-1.5 rounded-full hover:border-[#F5DEB3]/50 hover:text-[#F5DEB3] transition-all"
          title="Reveal one letter (costs 1 attempt)"
        >
          💡 Hint {hintsUsed > 0 ? `(${hintsUsed} used)` : '(costs 1 attempt)'}
        </motion.button>
      )}

      {/* Keyboard */}
      <Keyboard
        guessedLetters={guessedLetters}
        correctLetters={correctLetters}
        onGuess={onGuess}
        disabled={!isPlaying}
      />

      {/* Win / Lose overlay */}
      <AnimatePresence>
        {(isWon || isLost) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="bg-[#252528] border border-[#F5DEB3]/25 rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl"
            >
              {isWon ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-5xl mb-3"
                  >
                    🎉
                  </motion.div>
                  <h2 className="font-display text-3xl font-black text-[#5BAD6F] mb-1">You Won!</h2>
                  <p className="font-typewriter text-[#A89070] text-sm mb-3">
                    The word was <span className="text-[#F5DEB3] font-bold">{word}</span>
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-4xl font-black text-[#F5DEB3] mb-1"
                  >
                    +{Math.max(0, { Easy: 100, Medium: 200, Hard: 350 }[difficulty] - wrongGuesses * 10 - hintsUsed * 20 + streak * 25 + 50)}
                  </motion.p>
                  <p className="font-typewriter text-xs text-[#A89070] mb-6">points earned</p>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-5xl mb-3"
                  >
                    💀
                  </motion.div>
                  <h2 className="font-display text-3xl font-black text-[#E05555] mb-1">Game Over</h2>
                  <p className="font-typewriter text-[#A89070] text-sm mb-6">
                    The word was <span className="text-[#F5DEB3] font-bold">{word}</span>
                  </p>
                </>
              )}

              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={onNewGame}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-[#F5DEB3] text-[#1C1C1E] font-display font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(245,222,179,0.25)] hover:shadow-[0_0_30px_rgba(245,222,179,0.4)] transition-all"
                >
                  Play Again
                </motion.button>
                <motion.button
                  onClick={onShowLeaderboard}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 border border-[#F5DEB3]/30 text-[#F5DEB3] font-typewriter rounded-xl text-sm hover:border-[#F5DEB3]/60 transition-all"
                >
                  Leaderboard
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

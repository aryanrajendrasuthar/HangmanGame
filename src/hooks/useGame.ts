import { useState, useCallback, useMemo } from 'react';
import type { Category, Difficulty, GameState, GameStatus, DifficultyConfig } from '../types';
import { getRandomWord } from '../data/wordBank';

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  Easy:   { maxAttempts: 10, label: 'Easy',   color: '#5BAD6F' },
  Medium: { maxAttempts: 7,  label: 'Medium',  color: '#E0A020' },
  Hard:   { maxAttempts: 5,  label: 'Hard',    color: '#E05555' },
};


export function useGame() {
  const [word, setWord] = useState('');
  const [category, setCategory] = useState<Category>('Animals');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const maxAttempts = DIFFICULTY_CONFIG[difficulty].maxAttempts;

  // Derived state
  const correctLetters = useMemo(
    () => new Set([...guessedLetters].filter((l) => word.includes(l))),
    [guessedLetters, word],
  );

  const wrongLetters = useMemo(
    () => new Set([...guessedLetters].filter((l) => !word.includes(l))),
    [guessedLetters, word],
  );

  const isWordGuessed = useMemo(
    () => word.length > 0 && [...word].every((l) => guessedLetters.has(l)),
    [word, guessedLetters],
  );

  const remainingAttempts = maxAttempts - wrongGuesses;

  // Start a new game
  const startGame = useCallback(
    (selectedCategory: Category, selectedDifficulty: Difficulty) => {
      const newWord = getRandomWord(selectedCategory);
      setWord(newWord);
      setCategory(selectedCategory);
      setDifficulty(selectedDifficulty);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setStatus('playing');
      setHintsUsed(0);
    },
    [],
  );

  // Calculate score for a win
  const calculateScore = useCallback(
    (wrong: number, hints: number): number => {
      const base = { Easy: 100, Medium: 200, Hard: 350 }[difficulty];
      const wrongPenalty = wrong * 10;
      const hintPenalty = hints * 20;
      const streakBonus = streak * 25;
      return Math.max(0, base - wrongPenalty - hintPenalty + streakBonus + 50);
    },
    [difficulty, streak],
  );

  // Guess a letter
  const guessLetter = useCallback(
    (letter: string) => {
      if (status !== 'playing' || guessedLetters.has(letter)) return;

      const newGuessed = new Set(guessedLetters).add(letter);
      setGuessedLetters(newGuessed);

      const isCorrect = word.includes(letter);
      let newWrong = wrongGuesses;

      if (!isCorrect) {
        newWrong = wrongGuesses + 1;
        setWrongGuesses(newWrong);
      }

      // Check win
      const allGuessed = [...word].every((l) => newGuessed.has(l));
      if (allGuessed) {
        const points = calculateScore(newWrong, hintsUsed);
        setScore((prev) => prev + points);
        setStreak((prev) => prev + 1);
        setStatus('won');
        return;
      }

      // Check loss
      if (newWrong >= maxAttempts) {
        setStreak(0);
        setStatus('lost');
      }
    },
    [status, guessedLetters, word, wrongGuesses, hintsUsed, maxAttempts, calculateScore],
  );

  // Use a hint — reveal a random unguessed letter (costs 1 wrong attempt penalty logically)
  const useHint = useCallback(() => {
    if (status !== 'playing') return;
    const unguessed = [...word].filter((l) => !guessedLetters.has(l));
    if (unguessed.length === 0) return;

    const letterToReveal = unguessed[Math.floor(Math.random() * unguessed.length)];
    const newGuessed = new Set(guessedLetters).add(letterToReveal);
    setGuessedLetters(newGuessed);
    setHintsUsed((prev) => prev + 1);

    // Hint costs 1 attempt
    const newWrong = wrongGuesses + 1;
    setWrongGuesses(newWrong);

    const allGuessed = [...word].every((l) => newGuessed.has(l));
    if (allGuessed) {
      const points = calculateScore(newWrong, hintsUsed + 1);
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
      setStatus('won');
      return;
    }

    if (newWrong >= maxAttempts) {
      setStreak(0);
      setStatus('lost');
    }
  }, [status, word, guessedLetters, wrongGuesses, hintsUsed, maxAttempts, calculateScore]);

  // Reset to idle (category select)
  const resetGame = useCallback(() => {
    setWord('');
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setStatus('idle');
    setHintsUsed(0);
  }, []);

  const state: GameState = {
    word,
    category,
    difficulty,
    guessedLetters,
    wrongGuesses,
    maxAttempts,
    status,
    score,
    streak,
    hintsUsed,
  };

  return {
    state,
    correctLetters,
    wrongLetters,
    isWordGuessed,
    remainingAttempts,
    startGame,
    guessLetter,
    useHint,
    resetGame,
  };
}

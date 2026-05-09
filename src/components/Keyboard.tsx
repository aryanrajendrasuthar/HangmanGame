import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function Keyboard({ guessedLetters, correctLetters, onGuess, disabled }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter) && !disabled && !guessedLetters.has(letter)) {
        onGuess(letter);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [guessedLetters, onGuess, disabled]);

  const getKeyStyle = (letter: string) => {
    if (!guessedLetters.has(letter)) return 'bg-[#2A2A2E] text-[#F5DEB3] border border-[#F5DEB3]/20 hover:bg-[#F5DEB3]/10 cursor-pointer';
    if (correctLetters.has(letter)) return 'bg-[#5BAD6F]/20 text-[#5BAD6F] border border-[#5BAD6F]/50 cursor-default';
    return 'bg-[#E05555]/10 text-[#E05555]/50 border border-[#E05555]/20 cursor-default';
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 flex-wrap justify-center">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            return (
              <motion.button
                key={letter}
                onClick={() => !disabled && !isGuessed && onGuess(letter)}
                disabled={disabled || isGuessed}
                className={`w-9 h-10 rounded font-typewriter text-sm font-bold transition-all duration-150 ${getKeyStyle(letter)}`}
                whileTap={!isGuessed && !disabled ? { scale: 0.85 } : {}}
                aria-label={`Letter ${letter}`}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

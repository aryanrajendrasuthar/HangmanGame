import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Category, Difficulty } from '../types';
import { CATEGORIES } from '../data/wordBank';
import { DIFFICULTY_CONFIG } from '../hooks/useGame';

interface Props {
  onStart: (category: Category, difficulty: Difficulty) => void;
  score: number;
  streak: number;
}

const CATEGORY_ICONS: Record<Category, string> = {
  Animals: '🦁',
  Technology: '💻',
  Movies: '🎬',
  Science: '🔬',
  Countries: '🌍',
  Food: '🍕',
  Sports: '⚽',
  'Programming Languages': '👨‍💻',
};

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export default function CategorySelect({ onStart, score, streak }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');

  const handleStart = () => {
    if (!selectedCategory) return;
    onStart(selectedCategory, selectedDifficulty);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-5xl md:text-6xl font-black text-[#F5DEB3] tracking-wide drop-shadow-lg">
          HANGMAN
        </h1>
        <p className="font-typewriter text-[#A89070] text-sm mt-2 tracking-widest uppercase">
          The Word Detective Game
        </p>

        {/* Stats bar */}
        {(score > 0 || streak > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-6 justify-center mt-4"
          >
            <div className="text-center">
              <p className="font-display text-2xl text-[#F5DEB3] font-bold">{score}</p>
              <p className="font-typewriter text-xs text-[#A89070] uppercase tracking-widest">Score</p>
            </div>
            <div className="w-px bg-[#F5DEB3]/20" />
            <div className="text-center">
              <p className="font-display text-2xl text-[#F5DEB3] font-bold">{streak} 🔥</p>
              <p className="font-typewriter text-xs text-[#A89070] uppercase tracking-widest">Streak</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Difficulty Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 w-full max-w-md"
      >
        <p className="font-typewriter text-[#A89070] text-xs tracking-widest uppercase text-center mb-3">
          Select Difficulty
        </p>
        <div className="flex gap-3 justify-center">
          {DIFFICULTIES.map((diff) => {
            const config = DIFFICULTY_CONFIG[diff];
            const isSelected = selectedDifficulty === diff;
            return (
              <motion.button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-lg font-typewriter text-sm font-bold border transition-all duration-200 ${
                  isSelected
                    ? 'border-[#F5DEB3] bg-[#F5DEB3]/10 text-[#F5DEB3]'
                    : 'border-[#F5DEB3]/20 text-[#A89070] hover:border-[#F5DEB3]/40'
                }`}
                style={isSelected ? { boxShadow: `0 0 12px ${config.color}33` } : {}}
              >
                {diff}
                <span className="block text-xs opacity-70 font-normal">
                  {config.maxAttempts} attempts
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Category Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <p className="font-typewriter text-[#A89070] text-xs tracking-widest uppercase text-center mb-3">
          Choose a Category
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat, i) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                  isSelected
                    ? 'border-[#F5DEB3] bg-[#F5DEB3]/10 shadow-[0_0_15px_rgba(245,222,179,0.2)]'
                    : 'border-[#F5DEB3]/15 bg-[#252528] hover:border-[#F5DEB3]/35 hover:bg-[#2A2A2E]'
                }`}
              >
                <div className="text-2xl mb-1">{CATEGORY_ICONS[cat]}</div>
                <p className="font-typewriter text-xs text-[#F5DEB3] leading-tight">{cat}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <motion.button
          onClick={handleStart}
          disabled={!selectedCategory}
          whileHover={selectedCategory ? { scale: 1.05 } : {}}
          whileTap={selectedCategory ? { scale: 0.97 } : {}}
          className={`px-12 py-3 rounded-xl font-display text-lg font-bold tracking-widest transition-all duration-300 ${
            selectedCategory
              ? 'bg-[#F5DEB3] text-[#1C1C1E] shadow-[0_0_25px_rgba(245,222,179,0.3)] hover:shadow-[0_0_35px_rgba(245,222,179,0.5)]'
              : 'bg-[#F5DEB3]/20 text-[#F5DEB3]/40 cursor-not-allowed'
          }`}
        >
          BEGIN
        </motion.button>
      </motion.div>
    </div>
  );
}

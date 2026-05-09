import { motion, AnimatePresence } from 'framer-motion';
import type { Difficulty, LeaderboardEntry } from '../types';

interface Props {
  entries: LeaderboardEntry[];
  filter: Difficulty | 'All';
  onFilterChange: (f: Difficulty | 'All') => void;
  onClose: () => void;
}

const FILTERS: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];

export default function Leaderboard({ entries, filter, onFilterChange, onClose }: Props) {
  const filtered = filter === 'All' ? entries : entries.filter((e) => e.difficulty === filter);
  const sorted = [...filtered].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-[#252528] border border-[#F5DEB3]/20 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-display text-2xl text-[#F5DEB3] font-bold">Leaderboard</h2>
          <button
            onClick={onClose}
            className="text-[#A89070] hover:text-[#F5DEB3] font-typewriter text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1 rounded-lg font-typewriter text-xs transition-all ${
                filter === f
                  ? 'bg-[#F5DEB3] text-[#1C1C1E] font-bold'
                  : 'bg-[#2A2A2E] text-[#A89070] hover:text-[#F5DEB3]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {sorted.length === 0 ? (
          <p className="font-typewriter text-[#A89070] text-center py-8">No scores yet. Play to get on the board!</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            <AnimatePresence>
              {sorted.map((entry, i) => (
                <motion.div
                  key={`${entry.name}-${entry.date}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 bg-[#2A2A2E] rounded-lg p-3"
                >
                  <span className="font-display text-lg font-bold text-[#C8A96E] w-6 text-center">
                    {i + 1 <= 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-typewriter text-sm text-[#F5DEB3] truncate">{entry.name}</p>
                    <p className="font-typewriter text-xs text-[#A89070]">
                      {entry.word} · {entry.category} · {entry.difficulty}
                    </p>
                  </div>
                  <span className="font-display text-lg font-bold text-[#F5DEB3]">{entry.score}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

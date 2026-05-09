import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  word: string;
  guessedLetters: Set<string>;
  reveal?: boolean;
}

export default function WordDisplay({ word, guessedLetters, reveal = false }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {[...word].map((letter, i) => {
        const isRevealed = guessedLetters.has(letter) || reveal;
        const isMissed = reveal && !guessedLetters.has(letter);

        return (
          <div key={i} className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {isRevealed ? (
                <motion.span
                  key="letter"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: reveal ? i * 0.04 : 0 }}
                  className={`font-typewriter text-2xl font-bold min-w-[1.5rem] text-center leading-none pb-1 ${
                    isMissed ? 'text-[#E05555]' : 'text-[#F5DEB3]'
                  }`}
                >
                  {letter}
                </motion.span>
              ) : (
                <motion.span
                  key="blank"
                  className="font-typewriter text-2xl font-bold min-w-[1.5rem] text-center text-transparent leading-none pb-1"
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
            <div className="h-0.5 w-7 bg-[#F5DEB3]/40 rounded" />
          </div>
        );
      })}
    </div>
  );
}

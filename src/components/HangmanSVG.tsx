import { motion } from 'framer-motion';

interface Props {
  wrongGuesses: number;
}

const STROKE = '#F5DEB3';
const STROKE_WIDTH = 4;
const DURATION = 0.4;

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: DURATION, ease: 'easeInOut' } },
};

const circleDraw = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: DURATION, ease: 'easeOut' } },
};

export default function HangmanSVG({ wrongGuesses }: Props) {
  const show = (n: number) => wrongGuesses >= n;

  return (
    <svg
      viewBox="0 0 200 240"
      className="w-full max-w-[260px] mx-auto"
      aria-label={`Hangman drawing: ${wrongGuesses} wrong guesses`}
    >
      {/* === GALLOWS (always visible) === */}
      {/* Base */}
      <line x1="20" y1="230" x2="180" y2="230" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Vertical pole */}
      <line x1="60" y1="230" x2="60" y2="20" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Horizontal beam */}
      <line x1="60" y1="20" x2="140" y2="20" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Rope */}
      <line x1="140" y1="20" x2="140" y2="50" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />

      {/* === BODY PARTS (animated) === */}
      {/* 1 — Head */}
      {show(1) && (
        <motion.circle
          cx="140" cy="65" r="15"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} fill="none"
          variants={circleDraw}
          initial="hidden"
          animate="visible"
          style={{ originX: '140px', originY: '65px' }}
        />
      )}

      {/* 2 — Body */}
      {show(2) && (
        <motion.line
          x1="140" y1="80" x2="140" y2="145"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 3 — Left arm */}
      {show(3) && (
        <motion.line
          x1="140" y1="100" x2="115" y2="125"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 4 — Right arm */}
      {show(4) && (
        <motion.line
          x1="140" y1="100" x2="165" y2="125"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 5 — Left leg */}
      {show(5) && (
        <motion.line
          x1="140" y1="145" x2="115" y2="185"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 6 — Right leg */}
      {show(6) && (
        <motion.line
          x1="140" y1="145" x2="165" y2="185"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 7 — Left foot */}
      {show(7) && (
        <motion.line
          x1="115" y1="185" x2="100" y2="180"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 8 — Right foot */}
      {show(8) && (
        <motion.line
          x1="165" y1="185" x2="180" y2="180"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 9 — Left hand */}
      {show(9) && (
        <motion.line
          x1="115" y1="125" x2="100" y2="118"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}

      {/* 10 — Right hand */}
      {show(10) && (
        <motion.line
          x1="165" y1="125" x2="180" y2="118"
          stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          variants={draw} initial="hidden" animate="visible"
        />
      )}
    </svg>
  );
}

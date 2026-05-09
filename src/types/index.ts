export type Category =
  | 'Animals'
  | 'Technology'
  | 'Movies'
  | 'Science'
  | 'Countries'
  | 'Food'
  | 'Sports'
  | 'Programming Languages';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface DifficultyConfig {
  maxAttempts: number;
  label: Difficulty;
  color: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: Difficulty;
  category: Category;
  word: string;
  date: string;
}

export interface GameState {
  word: string;
  category: Category;
  difficulty: Difficulty;
  guessedLetters: Set<string>;
  wrongGuesses: number;
  maxAttempts: number;
  status: GameStatus;
  score: number;
  streak: number;
  hintsUsed: number;
}

import { getEmojiClue } from "./emoji-clues";

export type Puzzle = {
  word: string;
};

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_LABELS: Record<
  Difficulty,
  { label: string; description: string }
> = {
  easy: {
    label: "Easy",
    description: "Everyday words you'll recognize",
  },
  medium: {
    label: "Medium",
    description: "A solid mix of common and tricky",
  },
  hard: {
    label: "Hard",
    description: "Unusual letters and tougher vocabulary",
  },
};

/** Custom clues for familiar words; others get an auto-generated hint. */
export const CLUE_OVERRIDES: Record<string, string> = {
  APPLE: "Crisp fruit that keeps the doctor away",
  BRAIN: "The organ that does your thinking",
  CHAIR: "You sit on this at a desk",
  DREAM: "Stories your mind tells while you sleep",
  EAGLE: "A bald national bird of the USA",
  FLAME: "The glowing part of a fire",
  GRAPE: "Small fruit that can become wine",
  HOUSE: "A building people live in",
  IVORY: "Creamy-white material from tusks",
  JOKER: "Wild card in a deck, or a clownish villain",
  KNIFE: "Sharp tool used to cut food",
  LEMON: "Sour yellow citrus fruit",
  MAGIC: "Illusion and wonder on a stage",
  NIGHT: "When the sky goes dark",
  OCEAN: "Vast body of salt water",
  PIANO: "Keyboard instrument with black and white keys",
  QUEEN: "Female monarch, or chess piece",
  RIVER: "Fresh water that flows to the sea",
  STORM: "Weather with wind, rain, and thunder",
  TIGER: "Striped big cat",
  ULTRA: "Prefix meaning beyond or extreme",
  VIVID: "Bright, intense, and clear",
  WHALE: "Largest mammal in the ocean",
  XENON: "Noble gas used in bright lamps",
  YACHT: "Luxury boat for leisure",
  ZEBRA: "Horse-like animal with black and white stripes",
  BREAD: "Baked staple sliced for sandwiches",
  CLOUD: "Fluffy white shape in the sky",
  DANCE: "Moving to music with rhythm",
  EARTH: "The planet we live on",
  FROST: "Icy coating on a cold morning",
  GHOST: "Spooky spirit said to haunt places",
  HEART: "Organ that pumps blood; also means love",
  IMAGE: "A picture or visual representation",
  JUICE: "Liquid squeezed from fruit",
  LIGHT: "What lamps and the sun give off",
  MUSIC: "Organized sound that you listen to",
  NOVEL: "A long work of fiction",
  OLIVE: "Small fruit pressed for cooking oil",
  PEARL: "Gem formed inside an oyster",
  QUILT: "Layered blanket stitched in patterns",
  RADIO: "Device that plays broadcast sound",
  SUGAR: "Sweet crystals used in baking",
  TRAIN: "Vehicles linked on a railway track",
  UNITY: "Being joined as one",
  VOICE: "Sound produced when you speak",
  WATER: "Clear liquid essential for life",
  YOUTH: "The time of being young",
  PLANT: "Living green thing that grows in soil",
  STONE: "Hard piece of rock",
};

export function clueForWord(word: string, difficulty: Difficulty): string {
  if (difficulty === "easy") {
    return (
      CLUE_OVERRIDES[word] ??
      `A common five-letter word that starts with "${word[0]}".`
    );
  }
  return getEmojiClue(word);
}

export function scrambleWord(word: string): string {
  const letters = word.split("");
  let scrambled = word;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    for (let i = letters.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    scrambled = letters.join("");
    if (scrambled !== word) return scrambled;
  }

  return letters.reverse().join("") === word
    ? `${word.slice(1)}${word[0]}`
    : letters.reverse().join("");
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export class WordDeck {
  private queue: string[];
  private readonly allWords: string[];

  constructor(words: string[]) {
    this.allWords = [...new Set(words.map((w) => w.toUpperCase()))];
    this.queue = shuffle(this.allWords);
  }

  next(): Puzzle {
    if (this.queue.length === 0) {
      this.queue = shuffle(this.allWords);
    }

    const word = this.queue.pop()!;
    return { word };
  }

  get remaining(): number {
    return this.queue.length;
  }

  get total(): number {
    return this.allWords.length;
  }
}

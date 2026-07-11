export type Puzzle = {
  word: string;
  clue: string;
};

/** Common 5-letter English words with short clues. */
export const PUZZLES: Puzzle[] = [
  { word: "APPLE", clue: "Crisp fruit that keeps the doctor away" },
  { word: "BRAIN", clue: "The organ that does your thinking" },
  { word: "CHAIR", clue: "You sit on this at a desk" },
  { word: "DREAM", clue: "Stories your mind tells while you sleep" },
  { word: "EAGLE", clue: "A bald national bird of the USA" },
  { word: "FLAME", clue: "The glowing part of a fire" },
  { word: "GRAPE", clue: "Small fruit that can become wine" },
  { word: "HOUSE", clue: "A building people live in" },
  { word: "IVORY", clue: "Creamy-white material from tusks" },
  { word: "JOKER", clue: "Wild card in a deck, or a clownish villain" },
  { word: "KNIFE", clue: "Sharp tool used to cut food" },
  { word: "LEMON", clue: "Sour yellow citrus fruit" },
  { word: "MAGIC", clue: "Illusion and wonder on a stage" },
  { word: "NIGHT", clue: "When the sky goes dark" },
  { word: "OCEAN", clue: "Vast body of salt water" },
  { word: "PIANO", clue: "Keyboard instrument with black and white keys" },
  { word: "QUEEN", clue: "Female monarch, or chess piece" },
  { word: "RIVER", clue: "Fresh water that flows to the sea" },
  { word: "STORM", clue: "Weather with wind, rain, and thunder" },
  { word: "TIGER", clue: "Striped big cat" },
  { word: "ULTRA", clue: "Prefix meaning beyond or extreme" },
  { word: "VIVID", clue: "Bright, intense, and clear" },
  { word: "WHALE", clue: "Largest mammal in the ocean" },
  { word: "XENON", clue: "Noble gas used in bright lamps" },
  { word: "YACHT", clue: "Luxury boat for leisure" },
  { word: "ZEBRA", clue: "Horse-like animal with black and white stripes" },
  { word: "BREAD", clue: "Baked staple sliced for sandwiches" },
  { word: "CLOUD", clue: "Fluffy white shape in the sky" },
  { word: "DANCE", clue: "Moving to music with rhythm" },
  { word: "EARTH", clue: "The planet we live on" },
  { word: "FROST", clue: "Icy coating on a cold morning" },
  { word: "GHOST", clue: "Spooky spirit said to haunt places" },
  { word: "HEART", clue: "Organ that pumps blood; also means love" },
  { word: "IMAGE", clue: "A picture or visual representation" },
  { word: "JUICE", clue: "Liquid squeezed from fruit" },
  { word: "LIGHT", clue: "What lamps and the sun give off" },
  { word: "MUSIC", clue: "Organized sound that you listen to" },
  { word: "NOVEL", clue: "A long work of fiction" },
  { word: "OLIVE", clue: "Small fruit pressed for cooking oil" },
  { word: "PEARL", clue: "Gem formed inside an oyster" },
  { word: "QUILT", clue: "Layered blanket stitched in patterns" },
  { word: "RADIO", clue: "Device that plays broadcast sound" },
  { word: "SUGAR", clue: "Sweet crystals used in baking" },
  { word: "TRAIN", clue: "Vehicles linked on a railway track" },
  { word: "UNITY", clue: "Being joined as one" },
  { word: "VOICE", clue: "Sound produced when you speak" },
  { word: "WATER", clue: "Clear liquid essential for life" },
  { word: "YOUTH", clue: "The time of being young" },
  { word: "PLANT", clue: "Living green thing that grows in soil" },
  { word: "STONE", clue: "Hard piece of rock" },
];

export function scrambleWord(word: string): string {
  const letters = word.split("");
  let scrambled = word;

  // Keep reshuffling until the result differs from the original.
  for (let attempt = 0; attempt < 40; attempt += 1) {
    for (let i = letters.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    scrambled = letters.join("");
    if (scrambled !== word) return scrambled;
  }

  // Extremely rare fallback for words that are hard to scramble.
  return letters.reverse().join("") === word
    ? `${word.slice(1)}${word[0]}`
    : letters.reverse().join("");
}

export function pickPuzzle(excludeWord?: string): Puzzle {
  const pool =
    excludeWord != null
      ? PUZZLES.filter((p) => p.word !== excludeWord)
      : PUZZLES;
  const choices = pool.length > 0 ? pool : PUZZLES;
  return choices[Math.floor(Math.random() * choices.length)];
}

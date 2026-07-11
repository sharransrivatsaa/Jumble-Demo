import { EMOJI_CLUES } from "../data/emoji-clues";

const WORD_PATTERNS: [RegExp, string][] = [
  [/STORM|RAIN|CLOUD|WIND|SNOW|FROST|THUND/, "⛈️🌧️💨"],
  [/FIRE|FLAME|BURN|BLAZ|HEAT|WARM/, "🔥🌡️"],
  [/WATER|RIVER|OCEAN|LAKE|POOL|WAVE|WET/, "💧🌊"],
  [/TIGER|LION|BEAR|WOLF|DEER|ZEBRA|WHALE|SHARK|HORSE|MOUSE|SNAKE|BIRD|EAGLE|OWL|FROG/, "🐾"],
  [/APPLE|FRUIT|GRAPE|LEMON|BREAD|CAKE|SUGAR|JUICE|MEAL|FOOD|MEAT|FISH|OLIVE/, "🍽️"],
  [/HOUSE|HOME|ROOM|DOOR|WALL|ROOF|BUILD/, "🏠"],
  [/TREE|PLANT|GRASS|LEAF|FLOW|GARD|WOOD|FOREST/, "🌿🌳"],
  [/MUSIC|PIANO|SONG|SOUND|VOICE|DRUM|DANCE/, "🎵💃"],
  [/NIGHT|DARK|MOON|STAR|SLEEP|DREAM/, "🌙😴"],
  [/LIGHT|SUN|BRIGHT|GLOW|SHINE|LAMP/, "☀️💡"],
  [/HEART|LOVE|KISS|ROMAN/, "❤️"],
  [/GHOST|SCARY|FEAR|DEATH|GRAVE|SKULL/, "👻💀"],
  [/KING|QUEEN|CROWN|ROYAL|THRONE/, "👑"],
  [/MONEY|GOLD|RICH|COIN|BANK|CASH/, "💰"],
  [/BOOK|READ|WORD|WRITE|STORY|NOVEL/, "📚"],
  [/TRAIN|TRUCK|DRIVE|ROAD|WHEEL|CAR|BOAT|YACHT/, "🚂🚗"],
  [/GAME|PLAY|SPORT|BALL|SCORE/, "⚽🎮"],
  [/KNIFE|SWORD|FIGHT|WAR|WEAPON/, "⚔️🔪"],
  [/MAGIC|WITCH|SPELL|WIZARD/, "✨🪄"],
  [/EARTH|STONE|ROCK|MOUNT|CLIFF|SOIL/, "⛰️🪨"],
  [/BRAIN|MIND|THINK|SMART|IDEA/, "🧠💭"],
  [/HAND|FINGER|TOUCH|GRAB/, "✋"],
  [/FOOT|WALK|RUN|STEP|LEG/, "🦶"],
  [/EYE|SEE|LOOK|VIEW|SIGHT/, "👁️"],
  [/CHAIR|TABLE|DESK|SIT|COUCH/, "🪑"],
  [/RADIO|PHONE|CALL|TALK|SPEAK/, "📻🗣️"],
  [/COLOR|PAINT|ART|DRAW|IMAGE/, "🎨"],
  [/DOCTOR|HEALTH|SICK|HOSPITAL|PAIN/, "🏥"],
  [/CHURCH|PRAY|HOLY|SAINT/, "⛪"],
  [/LAW|COURT|JUDGE|CRIME|POLICE/, "⚖️"],
  [/BABY|CHILD|BIRTH|PARENT|FAMILY/, "👶"],
  [/HAPPY|JOY|SMILE|LAUGH|FUN/, "😊"],
  [/ANGRY|MAD|RAGE|FURY/, "😠"],
  [/SAD|CRY|TEAR|GRIEF/, "😢"],
  [/FAST|QUICK|SPEED|RUSH/, "💨"],
  [/SLOW|WAIT|DELAY/, "🐢"],
  [/BIG|LARGE|HUGE|GIANT|GREAT/, "🐘"],
  [/SMALL|TINY|LITTLE|MINI/, "🐜"],
  [/COLD|ICE|FREEZ|CHILL/, "🧊"],
  [/HOT|BOIL|STEAM/, "♨️"],
  [/ELECT|POWER|WIRE|TECH|ROBOT/, "⚡🤖"],
  [/PAPER|MAIL|LETTER|PRINT/, "📄✉️"],
  [/GLASS|WINDOW|MIRROR/, "🪟"],
  [/CLOTH|SHIRT|DRESS|WEAR|COAT|SHOE/, "👕👟"],
  [/TIME|CLOCK|HOUR|MINUTE/, "⏰"],
  [/NORTH|SOUTH|EAST|WEST|MAP/, "🧭🗺️"],
  [/SPACE|ORBIT|PLANET|STAR/, "🚀🪐"],
  [/CHESS|BOARD|CARD|JOKER|POKER/, "♟️🃏"],
  [/QUILT|BLANK|FABRIC|SEW/, "🧵🛏️"],
  [/PEARL|JEWEL|GEM|RING|GOLD/, "💎"],
  [/SUGAR|SWEET|CANDY|HONEY/, "🍬🍯"],
  [/SALT|SPICE|PEPPER|SAUCE/, "🧂"],
  [/BEACH|SAND|SHORE|COAST/, "🏖️"],
  [/FARM|CROP|HARVEST|FIELD/, "🌾🚜"],
  [/OFFICE|WORK|JOB|DESK/, "💼"],
  [/MOVIE|FILM|STAGE|ACTOR/, "🎬"],
  [/CAMERA|PHOTO|PICTURE/, "📷"],
  [/GIFT|PRIZE|AWARD|TROPHY/, "🎁🏆"],
  [/LOCK|KEY|SAFE|SECRET/, "🔐"],
  [/OPEN|START|BEGIN/, "🚪"],
  [/CLOSE|STOP|END|FINISH/, "🛑"],
];

function shapeFallback(word: string): string {
  const vowels = (word.match(/[AEIOU]/g) ?? []).length;
  const parts: string[] = [];

  if (/[QXZJ]/.test(word)) parts.push("🧩");
  if (/[KVWY]/.test(word)) parts.push("🌀");
  if (vowels >= 3) parts.push("🗣️");
  else if (vowels === 2) parts.push("💭");
  else parts.push("🪨");

  parts.push("❓");
  return parts.join(" ");
}

export function getEmojiClue(word: string): string {
  const upper = word.toUpperCase();

  if (EMOJI_CLUES[upper]) {
    return EMOJI_CLUES[upper];
  }

  for (const [pattern, emojis] of WORD_PATTERNS) {
    if (pattern.test(upper)) {
      return emojis;
    }
  }

  return shapeFallback(upper);
}

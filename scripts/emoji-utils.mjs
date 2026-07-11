/** Keyword → emoji mapping (first match wins — most specific entries first). */
export const DEFINITION_KEYWORDS = [
  ["fright|scare|fear|terror|horror|spook|alarm|panic|dread", "😱👻"],
  ["brain|mind|think|idea|smart|intelligent|mental", "🧠"],
  ["heart|cardiac", "❤️"],
  ["train|rail|locomotive|carriage|railway", "🚂"],
  ["ghost|haunt|phantom|specter", "👻"],
  ["love|romance|affection|kiss|adore", "💕"],
  ["death|dead|kill|grave|corpse|funeral", "💀"],
  ["angry|anger|rage|fury|wrath|mad", "😠"],
  ["happy|joy|glad|delight|cheer|smile|laugh", "😊"],
  ["sad|sorrow|grief|mourn|weep|cry", "😢"],
  ["animal|mammal|beast|creature|pet", "🐾"],
  ["bird|eagle|hawk|owl|crow|swan|duck", "🐦"],
  ["fish|shark|whale|dolphin|swim", "🐟"],
  ["cat|tiger|lion|leopard|feline", "🐱"],
  ["dog|wolf|hound|puppy|canine", "🐶"],
  ["horse|pony|stallion|equine", "🐴"],
  ["insect|bug|bee|ant|fly|wasp", "🐝"],
  ["snake|serpent|reptile", "🐍"],
  ["tree|plant|flower|leaf|garden|forest|wood", "🌳"],
  ["fruit|apple|grape|berry|peach|melon", "🍎"],
  ["food|eat|meal|dish|bread|meat|bake|cook", "🍽️"],
  ["drink|water|juice|wine|beer|sip", "🥤"],
  ["fire|flame|burn|blaze|heat|hot", "🔥"],
  ["ice|cold|frost|freeze|frozen|chill", "🧊"],
  ["rain|storm|cloud|wind|thunder|lightning|weather", "⛈️"],
  ["sun|solar|bright|daylight", "☀️"],
  ["moon|night|dark|evening|midnight", "🌙"],
  ["star|space|planet|orbit|galaxy", "⭐"],
  ["ocean|sea|river|lake|wave|tide|shore", "🌊"],
  ["mountain|hill|rock|stone|cliff|cave|earth", "⛰️"],
  ["house|home|building|room|dwelling|shelter", "🏠"],
  ["car|automobile|vehicle|motor|truck|bus|drive|road", "🚗"],
  ["boat|ship|sail|vessel|yacht|harbor", "⛵"],
  ["plane|aircraft|flight|aviation|pilot", "✈️"],
  ["music|song|melody|rhythm|sing|choir|band", "🎵"],
  ["dance|ballet|waltz|move.*rhythm", "💃"],
  ["book|read|novel|story|literature|poem", "📚"],
  ["write|pen|pencil|letter|text|script", "✍️"],
  ["money|gold|silver|coin|cash|rich|wealth|bank", "💰"],
  ["king|queen|royal|crown|prince|throne|monarch", "👑"],
  ["war|battle|fight|combat|soldier|army|weapon", "⚔️"],
  ["knife|sword|blade|dagger|cut|sharp", "🔪"],
  ["gun|shoot|bullet|rifle|pistol", "🔫"],
  ["law|court|judge|legal|crime|police|prison", "⚖️"],
  ["doctor|medic|health|hospital|sick|disease|pain", "🏥"],
  ["school|teach|learn|student|class|education", "🎓"],
  ["work|job|labor|office|business|employ", "💼"],
  ["game|play|sport|ball|team|match|score", "⚽"],
  ["art|paint|draw|picture|image|sculpt", "🎨"],
  ["photo|camera|film|movie|cinema|actor", "🎬"],
  ["cloth|shirt|dress|coat|wear|fabric|sew", "👕"],
  ["shoe|boot|foot|walk|step|run", "👟"],
  ["hand|finger|grip|hold|touch|wave", "✋"],
  ["eye|see|look|view|sight|vision|watch", "👁️"],
  ["ear|hear|listen|sound|noise|voice|speak", "👂"],
  ["baby|child|infant|birth|parent|family", "👶"],
  ["marry|wedding|bride|groom|spouse", "💒"],
  ["church|temple|pray|holy|saint|god|relig", "⛪"],
  ["magic|witch|wizard|spell|enchant", "✨"],
  ["time|clock|hour|minute|second|moment", "⏰"],
  ["color|red|blue|green|yellow|black|white", "🎨"],
  ["light|lamp|glow|shine|bright", "💡"],
  ["sleep|dream|rest|bed|tired|nap", "😴"],
  ["gift|prize|award|trophy|win|victory", "🏆"],
  ["lock|key|safe|secret|hidden|mystery", "🔐"],
  ["north|south|east|west|map|compass|direction", "🧭"],
  ["farm|crop|harvest|field|plow|grain", "🌾"],
  ["beach|sand|coast|shore|island", "🏖️"],
  ["jewel|gem|pearl|diamond|ring|necklace", "💎"],
  ["sweet|sugar|candy|honey|dessert", "🍬"],
  ["salt|spice|pepper|flavor|taste", "🧂"],
  ["fast|quick|speed|rush|swift|rapid", "💨"],
  ["slow|delay|wait|lazy|sluggish", "🐢"],
  ["big|large|huge|giant|great|grand", "🐘"],
  ["small|tiny|little|mini|micro", "🐜"],
  ["power|electric|energy|wire|battery|tech", "⚡"],
  ["paper|mail|post|envelope|document", "📄"],
  ["glass|window|mirror|lens|transparent", "🪟"],
  ["chair|table|desk|seat|furniture", "🪑"],
  ["tool|hammer|nail|build|construct|repair", "🔧"],
  ["farm|cow|pig|sheep|chicken|barn", "🐄"],
];

export function definitionToEmojis(definition) {
  const lower = definition.toLowerCase();
  const words = lower.split(/[^a-z]+/).filter(Boolean);

  for (const [pattern, emoji] of DEFINITION_KEYWORDS) {
    const parts = pattern.split("|");
    const matched = parts.some((part) => {
      if (part.includes(".*")) {
        return new RegExp(part, "i").test(lower);
      }
      return words.some((w) => w === part || (part.length >= 5 && w.startsWith(part)));
    });

    if (matched) {
      return emoji;
    }
  }

  return "";
}

const DOMAIN_BOOSTS = [
  [/railway|rail travel|designated track|railroad|locomotive/, 10],
  [/frighten|terrify|startle|cause fear|make afraid/, 10],
  [/spirit|soul|apparition|haunt|supernatural/, 10],
  [/nervous system|skull|organ.*think|cerebr/, 10],
  [/building|dwelling|reside|abode|structure built|human beings/, 10],
  [/vehicle|automobile|motor|truck|aircraft|boat/, 8],
  [/animal|bird|fish|insect|mammal|plant|tree/, 7],
  [/food|fruit|eat|drink|meal|liquid|water/, 7],
  [/music|sound|song|dance|play|game/, 6],
  [/love|heart|emotion|feel/, 6],
  [/money|gold|pay|buy|sell/, 6],
  [/weapon|fight|war|battle/, 5],
];

function scoreDefinition(text) {
  let score = 0;
  const lower = text.toLowerCase();

  if (/^to [a-z]/.test(lower)) score += 4;
  if (/^(a|an) [a-z]/.test(lower)) score += 4;
  if (lower.length >= 15 && lower.length <= 90) score += 3;
  if (lower.length > 120) score -= 3;
  if (lower.includes("obsolete")) score -= 4;
  if (lower.includes("archaic")) score -= 3;
  if (lower.includes("rare")) score -= 2;
  if (lower.includes("slang")) score -= 1;
  if (lower.includes("figuratively")) score -= 1;
  if (lower.includes("poetic")) score -= 2;
  if (lower.includes("astronomy")) score -= 3;
  if (lower.includes("mining")) score -= 2;
  if (lower.includes("falconry")) score -= 4;
  if (lower.includes("gunpowder")) score -= 5;
  if (lower.includes("children's game")) score -= 8;
  if (lower.includes("nonexistent person invented")) score -= 6;

  for (const [pattern, boost] of DOMAIN_BOOSTS) {
    if (pattern.test(lower)) score += boost;
  }

  return score;
}

function cleanDefinition(text) {
  let cleaned = text.replace(/^[a-z]+\t/, "").trim();
  cleaned = cleaned.split(/\.\s+/)[0]?.trim() ?? cleaned;
  cleaned = cleaned.replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  return cleaned;
}

export function definitionToClue(definition, word) {
  if (!definition?.trim()) {
    return `A five-letter word starting with "${word[0]}".`;
  }

  const entries = definition
    .split(" | ")
    .map(cleanDefinition)
    .filter(Boolean)
    .sort((a, b) => scoreDefinition(b) - scoreDefinition(a));

  let text = entries[0] ?? cleanDefinition(definition);

  if (!text) {
    return `A five-letter word starting with "${word[0]}".`;
  }

  if (text.length > 100) {
    text = `${text.slice(0, 97).trim()}...`;
  }

  const needsCapital = /^[a-z]/.test(text);
  const sentence = needsCapital ? text.charAt(0).toUpperCase() + text.slice(1) : text;

  return `${sentence} (Starts with ${word[0]}.)`;
}

export function shapeFallback(word) {
  const vowels = (word.match(/[AEIOU]/g) ?? []).length;
  const parts = [];

  if (/[QXZJ]/.test(word)) parts.push("🧩");
  if (/[KVWY]/.test(word)) parts.push("🌀");
  if (vowels >= 3) parts.push("🗣️");
  else if (vowels === 2) parts.push("💭");
  else parts.push("🪨");

  parts.push("❓");
  return parts.join(" ");
}

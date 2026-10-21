export const WORD_LENGTH = 5;
export const MAX_GUESS = 6;
export const WORDS: string[] = [
  "REACT",
  "TYPES",
  "BUILD",
  "STATE",
  "HOOKS",
  "PROPS",
  "ASYNC",
  "AWAIT",
  "CLASS",
  "LOGIC",
  "STYLE",
  "INPUT",
  "EVENT",
  "QUERY",
  "FETCH",
  "CLEAN",
  "ARRAY",
  "STACK",
  "ROUTE",
  "DEBUG",
];

//function with explicit return type
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

//keyboard layout rows
export const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

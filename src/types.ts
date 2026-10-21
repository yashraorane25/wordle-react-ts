export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface TileLetter {
  char: string;
  status: LetterStatus;
}

export type GameStatus = "IN_PROGRESS" | "WON" | "LOST";

export type CharStatusMap = Record<string, LetterStatus>;

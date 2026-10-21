import type { TileLetter, LetterStatus, CharStatusMap } from "../types";

export const evaluateGuess = (
  guess: string,
  solution: string,
): TileLetter[] => {
  const guessChar = guess.toUpperCase().split("");
  const solutionChar = solution.toUpperCase().split("");

  //initialze results with empty statuses
  const result: TileLetter[] = guessChar.map((char) => ({
    char,
    status: "empty" as LetterStatus,
  }));
  //pool the track letters available in solution for yellow/present matches
  const availableLetters: Record<string, number> = {};
  for (const char of solutionChar) {
    availableLetters[char] = (availableLetters[char] || 0) + 1;
  }
  //pass 1: exact matches
  guessChar.forEach((char, index) => {
    if (char == solutionChar[index]) {
      result[index].status = "correct";
      availableLetters[char] -= 1;
    }
  });

  //pass2: wrong postion or absent
  //   guessChar.forEach((char, index) => {
  //     if (result[index].status === "correct") {
  //       result;
  //     }
  //     if (availableLetters[char] && availableLetters[char] > 0) {
  //       result[index].status = "present";
  //       availableLetters[char] = -1;
  //     } else {
  //       result[index].status = "absent";
  //     }
  //   });
  // Pass 2: wrong position (yellow) or absent (gray)
  guessChar.forEach((char, index) => {
    // If it's already green, skip it!
    if (result[index].status === "correct") {
      return;
    }

    if (availableLetters[char] && availableLetters[char] > 0) {
      result[index].status = "present";
      availableLetters[char] -= 1;
    } else {
      result[index].status = "absent";
    }
  });
  return result;
};

//updates the keyboard letter statuses.
//priority: green> yellow> grey(absent)
export const updateCharStatuses = (
  prevStatuses: CharStatusMap,
  evaluatedRow: TileLetter[],
): CharStatusMap => {
  const updated: CharStatusMap = { ...prevStatuses };

  evaluatedRow.forEach(({ char, status }) => {
    const currentStatus = updated[char];

    // Green always wins; Yellow only replaces if not already green
    if (status === "correct") {
      updated[char] = "correct";
    } else if (status === "present" && currentStatus !== "correct") {
      updated[char] = "present";
    } else if (status === "absent" && !currentStatus) {
      updated[char] = "absent";
    }
  });

  return updated;
};

//  Focusing on the `useWordle` hook, the primary function is managing the game state using React's `useState`. This includes handling the `guesses`, and `currentGuess`. Using TypeScript generics, the hook will ensure type safety for t...

import { useState, useEffect, useCallback } from "react";
import { MAX_GUESS, WORD_LENGTH } from "../constants";
import { evaluateGuess, updateCharStatuses } from "../utils/gameLogic";
import { type CharStatusMap, type GameStatus, type TileLetter } from "../types";

export const useWordle = (solution: string) => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<TileLetter[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("IN_PROGRESS");
  const [charStatuses, setCharStatuses] = useState<CharStatusMap>({});
  const [message, setMessage] = useState<string | null>(null);

  //helper to show temporary toast message
  const showToast = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  };

  //1.add a letter
  const handleChar = useCallback(
    (char: string) => {
      if (gameStatus != "IN_PROGRESS") return;

      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + char.toUpperCase());
      }
    },
    [currentGuess, gameStatus],
  );

  //2. remove the last letter
  const handleDelete = useCallback(() => {
    if (gameStatus != "IN_PROGRESS") return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus]);

  //3. submit the 5 letter guess
  const handleEnter = useCallback(() => {
    if (gameStatus != "IN_PROGRESS") return;

    if (currentGuess.length != WORD_LENGTH) {
      showToast("Not Enough letters");
      return;
    }
    //evalute the guess against the solution
    const evaluatedRow = evaluateGuess(currentGuess, solution);
    //add row to completed guess
    const newGuesses = [...guesses, evaluatedRow];
    setGuesses(newGuesses);

    //update keyboard key colors
    setCharStatuses((prev) => updateCharStatuses(prev, evaluatedRow));

    //clear active row
    setCurrentGuess("");

    //check win conditiion
    if (currentGuess.toUpperCase() === solution.toUpperCase()) {
      setGameStatus("WON");
      showToast("Splendid! You Won");
      return;
    }

    //check loss condition
    if (newGuesses.length >= MAX_GUESS) {
      setGameStatus("LOST");
      showToast(`Game Over! The word was ${solution}`);
    }
  }, [currentGuess, gameStatus, guesses, solution]);

  //physical keyboard listner
  useEffect(() => {
    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key;
      if (key === "Enter") {
        handleEnter();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleChar(key);
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyDown);
    };
  }, [handleEnter, handleDelete, handleChar]);

  //reset function to play again
  const resetGame = (newSolution: string) => {
    setCurrentGuess("");
    setGuesses([]);
    setGameStatus("IN_PROGRESS");
    setCharStatuses({});
    setMessage(null);
  };

  return {
    currentGuess,
    guesses,
    gameStatus,
    charStatuses,
    message,
    handleChar,
    handleEnter,
    handleDelete,
    resetGame,
  };
};

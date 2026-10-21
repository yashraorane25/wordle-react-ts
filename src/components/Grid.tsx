import { Row } from "./Row";
import { MAX_GUESS } from "../constants";
import type { TileLetter } from "../types";

interface GridProps {
  //The entire list of completed rows (up to 6 rows).
  guesses: TileLetter[][];
  currentGuess: string;
}

export const Grid = ({ guesses, currentGuess }: GridProps) => {
  const emptiesCount = Math.max(0, MAX_GUESS - guesses.length - 1);
  const emptyRows = Array.from({ length: emptiesCount });
  return (
    <div className="grid">
      {guesses.map((rowLetters, index) => (
        <Row key={index} letters={rowLetters} />
      ))}

      {guesses.length < MAX_GUESS && <Row currentGuess={currentGuess} />}
      {emptyRows.map((_, index) => (
        <Row key={index} />
      ))}
    </div>
  );
};

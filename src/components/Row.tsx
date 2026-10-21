import { Tile } from "./Tile";
import { WORD_LENGTH } from "../constants";
import type { TileLetter } from "../types";

interface RowProps {
  letters?: TileLetter[];
  currentGuess?: string;
}

export const Row = ({ letters, currentGuess }: RowProps) => {
  // 1. Completed Guess Row (already evaluated with green/yellow/gray)
  if (letters) {
    return (
      <div className="row">
        {letters.map((tile, index) => (
          <Tile key={index} char={tile.char} status={tile.status} />
        ))}
      </div>
    );
  }

  // 2. Current Active Row (the user is currently typing letters)
  if (currentGuess !== undefined) {
    const lettersArray = currentGuess.split("");
    const emptyCount = WORD_LENGTH - lettersArray.length;
    const emptyTiles = Array.from({ length: emptyCount });

    return (
      <div className="row">
        {/* Render letters typed so far */}
        {lettersArray.map((letter, index) => (
          <Tile key={index} char={letter} status="empty" />
        ))}
        {/* Fill remaining boxes with blank tiles */}
        {emptyTiles.map((_, index) => (
          <Tile key={index} />
        ))}
      </div>
    );
  }

  // 3. Blank / Future Row (5 completely empty tiles)
  return (
    <div className="row">
      {Array.from({ length: WORD_LENGTH }).map((_, index) => (
        <Tile key={index} />
      ))}
    </div>
  );
};

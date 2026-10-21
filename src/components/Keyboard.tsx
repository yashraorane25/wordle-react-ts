import { Key } from "./Key";
import { KEYBOARD_ROWS } from "../constants";
import type { CharStatusMap } from "../types";

interface KeyboardProps {
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  charStatuses: CharStatusMap; // Record<string, LetterStatus>
}

export const Keyboard = ({
  onChar,
  onEnter,
  onDelete,
  charStatuses,
}: KeyboardProps) => {
  const handleKeyClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "BACKSPACE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((char) => (
            <Key
              key={char}
              value={char}
              status={charStatuses[char]}
              onClick={handleKeyClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

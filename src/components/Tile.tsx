import type { LetterStatus } from "../types";
interface TileProps {
  char?: string;
  status?: LetterStatus;
}

export const Tile = ({ char = "", status = "empty" }: TileProps) => {
  const className = `tile ${status}`;
  return <div className={className}>{char}</div>;
};

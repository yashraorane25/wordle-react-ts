import { useState } from "react";

import { Grid } from "./components/Grid";
import { Keyboard } from "./components/Keyboard";
import { useWordle } from "./hooks/useWordle";
import { getRandomWord } from "./constants";
import "./App.css";

function App() {
  const [solution, setSolution] = useState<string>(() => getRandomWord());

  // Use our custom hook
  const {
    currentGuess,
    guesses,
    gameStatus,
    charStatuses,
    message,
    handleChar,
    handleEnter,
    handleDelete,
    resetGame,
  } = useWordle(solution);

  // Restart handler with a fresh solution
  const handleRestart = () => {
    const newSolution = getRandomWord();
    setSolution(newSolution);
    resetGame(newSolution);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>WORDLE</h1>
      </header>

      {/* Floating Toast Notification */}
      {message && <div className="toast">{message}</div>}

      <main className="game-area">
        <Grid guesses={guesses} currentGuess={currentGuess} />

        {/* Game Over modal / restart button */}
        {gameStatus !== "IN_PROGRESS" && (
          <div className="game-over-banner">
            <p>
              {gameStatus === "WON"
                ? "🏆 Splendid! You solved it!"
                : `Game Over! The word was: ${solution}`}
            </p>
            <button className="restart-button" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        )}
      </main>

      <Keyboard
        onChar={handleChar}
        onEnter={handleEnter}
        onDelete={handleDelete}
        charStatuses={charStatuses}
      />
    </div>
  );
}

export default App;

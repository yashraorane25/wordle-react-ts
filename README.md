# Wordle Clone (React + TypeScript)

A clean, responsive Wordle clone built from scratch with React, TypeScript, and Vite.

---

## 🎮 How to Play

- Guess the hidden **5-letter word** in **6 attempts** or fewer.
- Each guess must be a valid 5-letter word.
- After each guess, the color of the tiles will change to show how close your guess was:
  - 🟩 **Green (`correct`)**: The letter is in the word and in the correct spot.
  - 🟨 **Yellow (`present`)**: The letter is in the word, but in the wrong spot.
  - ⬛ **Gray (`absent`)**: The letter is not in the word.

---

## 🚀 Features

- **Interactive UI**: Play using either your physical laptop keyboard or the on-screen virtual keyboard.
- **Accurate Wordle Evaluation**: Two-pass evaluation algorithm that correctly handles words with duplicate letters.
- **Dynamic On-Screen Keyboard**: Updates key colors (Green > Yellow > Gray) as you make guesses.
- **Game State Handling**: Win/loss detection, toast notifications, and a "Play Again" restart button.

---

## 🧠 TypeScript Concepts Learned

This project was built step-by-step to practice core TypeScript concepts in React:

1. **String Literal Union Types**: Restricting tile and game statuses (`'correct' | 'present' | 'absent' | 'empty'`).
2. **Interfaces**: Defining rigid contracts for data objects (`TileLetter`) and component props (`TileProps`, `RowProps`, `GridProps`, `KeyProps`, `KeyboardProps`).
3. **Generics (`useState<T>`)**: Ensuring state variables like `guesses` (`TileLetter[][]`) and `gameStatus` (`GameStatus`) are strictly type-safe.
4. **Utility Types**: Using `Record<string, LetterStatus>` to map keyboard keys to their statuses.
5. **Typed DOM Events**: Safely handling keyboard events with `KeyboardEvent`.
6. **Pure Utility Functions**: Creating tested, type-annotated evaluation functions with explicit parameter and return types.

---

## 🛠️ Project Structure

```text
src/
├── components/
│   ├── Grid.tsx        # 6-row Wordle board
│   ├── Row.tsx         # 5-tile word row (completed, active, or empty)
│   ├── Tile.tsx        # Single letter tile with status styling
│   ├── Key.tsx         # Individual on-screen keyboard key
│   └── Keyboard.tsx    # Complete on-screen keyboard
├── hooks/
│   └── useWordle.ts    # Custom hook managing state, keystrokes, and game rules
├── utils/
│   └── gameLogic.ts    # Two-pass guess evaluation and keyboard status logic
├── constants.ts        # Word list, word length, max guesses, and keyboard rows
├── types.ts            # Core TypeScript interfaces and union types
├── App.tsx             # Root game layout and toast messaging
├── App.css             # Wordle dark theme styling
└── main.tsx            # React application entry point
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

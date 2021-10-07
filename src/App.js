import {useState} from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import * as Chess from "chess.js";

const STARTING_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function App() {
  const [position, setPosition] = useState(STARTING_POSITION);

  const [chessBoard, setChessBoard] = useState(new Chess());

  // Function to reset the game
  const resetGame = async () => {
    setPosition(STARTING_POSITION);
    setChessBoard(new Chess());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Qazi's chess... 👇</h2>
        <Chessboard
          position={position}
          onDrop={({sourceSquare, targetSquare}) => {
            chessBoard.move({from: sourceSquare, to: targetSquare});
            setPosition(chessBoard.fen());
          }}
        />
        <button
          style={{
            margin: "0.5rem",
            padding: "7px 10px",
            backgroundColor: "white",
            border: "2px solid white",
            cursor: "pointer",
          }}
          id="start"
          onClick={resetGame}
        >
          New Game
        </button>
      </header>
    </div>
  );
}

export default App;

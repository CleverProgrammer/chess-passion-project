import { useState } from 'react'
import './App.css'
import Chessboard from 'chessboardjsx'
import * as Chess from 'chess.js'

const STARTING_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function App() {
  const [position, setPosition] = useState(STARTING_POSITION)

  const [chessBoard] = useState(new Chess())

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Qazi's chess... 👇</h2>
        <Chessboard
          position={position}
          onDrop={({ sourceSquare, targetSquare }) => {
            chessBoard.move({ from: sourceSquare, to: targetSquare })
            setPosition(chessBoard.fen())
          }}
        />
      </header>
    </div>
  )
}

export default App

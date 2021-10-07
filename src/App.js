import { useState } from 'react'
import Chessboard from 'chessboardjsx'
import * as Chess from 'chess.js'
import useSound from 'use-sound'
import chessMoveSfx from './sounds/chessMove.mp3'
import chessCaptureSfx from './sounds/chessCapture.mp3'

const STARTING_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function App() {
  const [position, setPosition] = useState(STARTING_POSITION)
  const [chessBoard] = useState(new Chess())
  const [undoMovesHistory, setUndoMovesHistory] = useState([])

  const [chessMoveSound, { stop }] = useSound(chessMoveSfx, {
    sprite: {
      move: [170, 300],
    },
  })

  const [chessCaptureSound] = useSound(chessCaptureSfx, {
    sprite: {
      capture: [250, 300],
    },
  })

  const evenMovesColumn = moves =>
    moves
      .filter((_, index) => index % 2 === 0)
      .map(move => <p style={{ color: '#BABABA', fontSize: 20 }}>{move}</p>)

  const oddMovesColumn = moves =>
    moves
      .filter((_, index) => index % 2 !== 0)
      .map(move => <p style={{ color: '#BABABA', fontSize: 20 }}>{move}</p>)

  const numberMovesColumn = moves => {
    const plysToMoveCount =
      moves.length % 2 === 0 ? moves.length / 2 : Math.ceil(moves.length / 2)

    const turnCount = Array.from(Array(plysToMoveCount).keys()).map(
      num => num + 1
    )

    return turnCount.map(turn => (
      <p style={{ color: '#BABABA', fontSize: 20 }}>{turn}</p>
    ))
  }

  return (
    <div style={styles.container}>
      <div>
        <h2
          style={{
            color: '#BABABA',
            padding: 10,
            backgroundColor: '#262421',
            marginRight: 20,
          }}
        >
          Rafeh Qazi
        </h2>
        <h2
          style={{
            color: '#BABABA',
            padding: 10,
            backgroundColor: '#262421',
            marginRight: 20,
          }}
        >
          Adil Dzelilovic
        </h2>
      </div>
      <Chessboard
        position={position}
        transitionDuration={100}
        onDrop={({ sourceSquare, targetSquare }) => {
          const moveInfo = chessBoard.move({
            from: sourceSquare,
            to: targetSquare,
          })

          if (moveInfo) {
            const flags = moveInfo.flags
            console.log(moveInfo)
            setPosition(chessBoard.fen())
            numberMovesColumn(chessBoard.history())
            console.log(sourceSquare, targetSquare)
            flags === 'c'
              ? chessCaptureSound({ id: 'capture' })
              : chessMoveSound({ id: 'move' })
          }
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 70 }}>
        <div style={styles.movesContainer}>
          <div
            style={{
              flex: 1,
              backgroundColor: '#302E2C',
              textAlign: 'center',
              height: '100',
            }}
          >
            {numberMovesColumn(chessBoard.history())}
          </div>
          <div style={{ flex: 2, marginLeft: 10 }}>
            {evenMovesColumn(chessBoard.history())}
          </div>
          <div style={{ flex: 2 }}>{oddMovesColumn(chessBoard.history())}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={styles.button}
            onClick={() => {
              const lastMove = chessBoard.undo()
              if (lastMove === null) return

              setUndoMovesHistory([...undoMovesHistory, lastMove])

              console.log(undoMovesHistory)
              setPosition(chessBoard.fen())
            }}
          >
            👈
          </button>
          <button
            style={styles.button}
            onClick={() => {
              const tempUndo = [...undoMovesHistory]
              if (tempUndo.length === 0) return
              const { flags, from, to } = tempUndo.pop()

              flags === 'c'
                ? chessCaptureSound({ id: 'capture' })
                : chessMoveSound({ id: 'move' })

              setUndoMovesHistory(tempUndo)

              chessBoard.move({ from, to })
              setPosition(chessBoard.fen())
              // undo gives you a from and a to
            }}
          >
            👉
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#161512',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'transparent',
    fontSize: 50,
    border: 'none',
    cursor: 'pointer',
  },

  movesContainer: {
    display: 'flex',
    marginLeft: 20,
    backgroundColor: '#262421',
    width: 400,
    height: '62vh',
    justifyContent: 'space-between',
    // paddingLeft: 30,
  },

  movesText: {
    fontSize: 20,
    color: 'white',
  },
}

export default App

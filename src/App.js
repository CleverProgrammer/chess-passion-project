import { useEffect, useRef, useState } from 'react'
import Chessboard from 'chessboardjsx'
import * as Chess from 'chess.js'
import useSound from 'use-sound'
import chessMoveSfx from './sounds/chessMove.mp3'
import chessCaptureSfx from './sounds/chessCapture.mp3'
import chessNewGameSfx from './sounds/newGame.mp3'
import chessCheckmateSfx from './sounds/checkMate.mp3'
import './App.css'
import { db, onSnapshot, doc, setDoc } from './firebase'
import { getDoc } from '@firebase/firestore'

const STARTING_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const GAME_DOC_ID = 'DEa2F0wP3xBZjtjHNit6'

function App() {
  const [firebaseChessBoard, setFirebaseChessBoard] = useState(new Chess())
  const [firebaseChessBoardHistory, setFirebaseChessBoardHistory] = useState([])
  const [firebaseChessBoardPgn, setFirebaseChessBoardPgn] = useState(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  )

  const [undoMovesHistory, setUndoMovesHistory] = useState([])
  const [firebaseGameId, setFirebaseGameId] = useState(GAME_DOC_ID)
  const [firebaseGamePosition, setFirebaseGamePosition] =
    useState(STARTING_POSITION)
  const notationEndRef = useRef(null)

  // get all moves, play all moves.

  // Function to reset the game
  const resetGame = async firebaseGameId => {
    // debugger
    const gameRef = doc(db, 'games', firebaseGameId)
    setDoc(
      gameRef,
      { position: STARTING_POSITION, pgn: [], moves: [] },
      { merge: true }
    )
    const gameSnap = await getDoc(gameRef)
    console.log(gameSnap.data())
    console.log(firebaseChessBoardHistory)
    setFirebaseChessBoardHistory(gameSnap.data().moves)
    newGameSound({ id: 'newGame' })
  }

  const updateGameOnMove = (sourceSquare, targetSquare, piece) => {
    // TODO - make the move first, THEN do async tasks with database
    const newChessBoard = new Chess()
    const _ =
      firebaseChessBoardPgn.length !== 0
        ? newChessBoard.load_pgn(firebaseChessBoardPgn)
        : null
    const moveInfo = newChessBoard.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })

    setFirebaseChessBoard(newChessBoard)
    setFirebaseChessBoardHistory(newChessBoard.history())

    // debugger
    if (moveInfo) {
      const { flags, san } = moveInfo

      const _ = san.includes('#') ? checkMateSound({ id: 'checkMate' }) : null

      flags === 'c' || flags === 'e'
        ? chessCaptureSound({ id: 'capture' })
        : chessMoveSound({ id: 'move' })

      const gameRef = doc(db, 'games', GAME_DOC_ID)
      setDoc(
        gameRef,
        {
          position: newChessBoard.fen(),
          moves: newChessBoard.history(),
          pgn: newChessBoard.pgn(),
        },
        { merge: true }
      )
    }
    return { newChessBoard }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'games', GAME_DOC_ID), doc => {
      setFirebaseGamePosition(doc.data().position)
      setFirebaseChessBoardPgn(doc.data().pgn)
    })
    return unsubscribe
  }, [])

  const [chessMoveSound] = useSound(chessMoveSfx, {
    sprite: {
      move: [170, 300],
    },
  })

  const [chessCaptureSound] = useSound(chessCaptureSfx, {
    sprite: {
      capture: [250, 300],
    },
  })

  const [checkMateSound] = useSound(chessCheckmateSfx, {
    sprite: {
      checkMate: [0, 1000],
    },
  })

  const [newGameSound] = useSound(chessNewGameSfx, {
    sprite: {
      newGame: [90, 1000],
    },
  })

  const whiteMovesColumn = moves =>
    moves
      .filter((_, index) => index % 2 === 0)
      .map(move => <p style={{ color: '#BABABA', fontSize: 20 }}>{move}</p>)

  const blackMovesColumn = moves =>
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

  // useEffect(() => {
  //   notationEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  // })

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Chessboard
          position={firebaseGamePosition}
          transitionDuration={100}
          onDrop={({ sourceSquare, targetSquare, piece }) => {
            updateGameOnMove(sourceSquare, targetSquare, piece)
          }}
        />
        <button
          style={{
            width: '30%',
            fontSize: 20,
            margin: '0.5rem',
            padding: '7px 10px',
            borderRadius: '5px',
            backgroundColor: '#2F2E2C',
            color: '#BABABA',
            cursor: 'pointer',
          }}
          id='start'
          onClick={() => resetGame(firebaseGameId)}
        >
          New Game
        </button>
      </div>

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
            {numberMovesColumn(firebaseChessBoardHistory)}
          </div>
          <div className='notation' style={{ flex: 2, marginLeft: 10 }}>
            {whiteMovesColumn(firebaseChessBoardHistory)}
          </div>
          <div className='notation' style={{ flex: 2 }}>
            {blackMovesColumn(firebaseChessBoardHistory)}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={styles.button}
            onClick={async () => {
              const lastMove = firebaseChessBoard.undo()
              console.log(lastMove)
              if (lastMove === null) return

              const gameRef = doc(db, 'games', GAME_DOC_ID)
              // debugger
              const gameSnap = await getDoc(gameRef)
              const undoMoves = gameSnap.data().undoMovesHistory
              setDoc(
                gameRef,
                { undoMovesHistory: [...undoMoves, lastMove] },
                { merge: true }
              )

              setUndoMovesHistory([...undoMovesHistory, lastMove])

              // console.log(undoMovesHistory)
              // setPosition(firebaseChessBoard.fen())
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

              flags === 'c' || flags === 'e'
                ? chessCaptureSound({ id: 'capture' })
                : chessMoveSound({ id: 'move' })

              setUndoMovesHistory(tempUndo)

              firebaseChessBoard.move({ from, to })
              // undo gives you a from and a to
            }}
          >
            👉
          </button>
        </div>
        {/* <div ref={notationEndRef}></div> */}
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
    overflowY: 'scroll',
  },

  movesText: {
    fontSize: 20,
    color: 'white',
  },
}

export default App

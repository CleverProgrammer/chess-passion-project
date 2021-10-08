import { useEffect, useRef, useState } from 'react'
import Chessboard from 'chessboardjsx'
import * as Chess from 'chess.js'
import useSound from 'use-sound'
import chessMoveSfx from './sounds/chessMove.mp3'
import chessCaptureSfx from './sounds/chessCapture.mp3'
import './App.css'
import {
  db,
  getGames,
  getGame,
  onSnapshot,
  collection,
  doc,
  setDoc,
} from './firebase'
import { getDoc } from '@firebase/firestore'

const STARTING_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const GAME_DOC_ID = 'DEa2F0wP3xBZjtjHNit6'

function App() {
  const [position, setPosition] = useState(STARTING_POSITION)
  const [chessBoard, setChessBoard] = useState(new Chess())
  const [firebaseChessBoard, setFirebaseChessBoard] = useState(new Chess())
  const [firebaseChessBoardHistory, setFirebaseChessBoardHistory] = useState([])
  const [undoMovesHistory, setUndoMovesHistory] = useState([])
  const [firebaseGameId, setFirebaseGameId] = useState('DEa2F0wP3xBZjtjHNit6')
  const [firebaseGameData, setFirebaseGameData] = useState(null)
  const [firebaseGamePosition, setFirebaseGamePosition] =
    useState(STARTING_POSITION)
  const [playerOneClock, setPlayerOneClock] = useState(300)
  const notationEndRef = useRef(null)

  // get all moves, play all moves.

  const updateGameOnMove = async (sourceSquare, targetSquare, piece) => {
    const game = await getGame(db, firebaseGameId)
    const newChessBoard = new Chess()
    newChessBoard.load_pgn(game.pgn)

    const moveInfo = newChessBoard.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })

    setChessBoard(newChessBoard)
    setFirebaseChessBoard(newChessBoard)
    setFirebaseChessBoardHistory(newChessBoard.history())

    if (moveInfo) {
      const flags = moveInfo.flags
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
    const gamesRef = collection(db, 'games')
    console.log(doc(gamesRef, 'DEa2F0wP3xBZjtjHNit6'))
    const GAME_DOC_ID = 'DEa2F0wP3xBZjtjHNit6'
    const unsubscribe = onSnapshot(doc(db, 'games', GAME_DOC_ID), doc => {
      console.log(doc.data())
      setFirebaseGamePosition(doc.data().position)
    })
    return unsubscribe

    getGames(db).then(games => console.log(games))
  })

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

  let playerOneTime = 300
  let clockOneId
  const startPlayerOneClock = () => {
    clockOneId = setInterval(() => {
      playerOneTime--
      console.log(secondsToHms(playerOneTime))
      console.log(playerOneTime)
    }, 1000)
  }

  function stopPlayerOneClock() {
    clearInterval(clockOneId)
    console.log('stopped')
  }

  useEffect(() => {
    // startPlayerOneClock()
    // stopPlayerOneClock()
  }, [])

  function secondsToHms(d) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
    return hDisplay + mDisplay + sDisplay
  }

  useEffect(() => {
    notationEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  })

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
        position={firebaseGamePosition}
        transitionDuration={100}
        onDrop={({ sourceSquare, targetSquare, piece }) => {
          updateGameOnMove(sourceSquare, targetSquare, piece)
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
              setPosition(firebaseChessBoard.fen())
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

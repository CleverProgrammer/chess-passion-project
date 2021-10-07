import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)

const db = getFirestore(app)

const getGames = async db => {
  const gamesCollection = collection(db, 'games')
  const gamesSnapshot = await getDocs(gamesCollection)
  const games = gamesSnapshot.docs.map(doc => doc.data())
  return games
}

const getGame = async (db, docId) => {
  const gameRef = doc(db, 'games', docId)
  const gameSnap = await getDoc(gameRef)
  return gameSnap.data()
}

const updateGame = async db => {
  collection(db, 'games').doc()
  // add
}

export {
  analytics,
  getAuth,
  db,
  collection,
  getDocs,
  onSnapshot,
  doc,
  onAuthStateChanged,
  setDoc,
  getGame,
  getGames,
}

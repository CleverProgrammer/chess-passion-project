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
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

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
const auth = getAuth(app)

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

// Creating new Google Auth Provider
const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')


export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
  .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    // The signed-in user info.
    const user = result.user
    // ...
    console.log('signed in successfully! ', credential, token, user)
  })
  .catch(error => {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    // ...
    console.log('error ', error, errorCode, errorMessage, email, credential)
  })
}

// Creating Github Auth Provider
const githubProvider = new GithubAuthProvider();

export const signInWithGithub = () => {
  signInWithPopup(auth, githubProvider).then(res => {
    const credential = GithubAuthProvider.credentialFromResult(res)
    const token = credential.accessToken;
    const user = res.user;

    console.log(user)
  }).catch (err => {
    console.log(err)
  });
}

export {
  analytics,
  auth,
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
  signOut,
  getDoc,
}

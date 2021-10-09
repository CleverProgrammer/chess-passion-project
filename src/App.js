import React, { useState } from 'react'
import ChessRoom from './pages/ChessRoom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import { onAuthStateChanged, auth } from './firebase'

const App = () => {
  // onAuthStateChanged
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null)
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('user logged in')
      setIsUserLoggedIn(true)
    } else {
      console.log('user logged out')
      setIsUserLoggedIn(false)
    }
  })

  return isUserLoggedIn ? signedInRoutes() : signedOutRoutes()
}

const signedInRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={`/play/:gameId`} component={ChessRoom} />
        <Route path={``} component={ChessRoom} />
      </Switch>
    </Router>
  )
}

const signedOutRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={``} component={Login} />
      </Switch>
    </Router>
  )
}

export default App

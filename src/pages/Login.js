import React from 'react'
import '../styles/Login.css'
import { signInWithGoogle } from '../firebase'

export default function Login() {
  return (
    <div className='container'>
      <h2 style={{ color: 'white' }}>♟ ️Qazi's Lichess Clone...</h2>
      <div className='login-buttons'>
        <button className='login-provider-button' onClick={signInWithGoogle}>
          <img
            src='https://img.icons8.com/color/48/000000/google-logo.png'
            alt='google icon'
          />
          <span> Continue with Google</span>
        </button>
      </div>
    </div>
  )
}

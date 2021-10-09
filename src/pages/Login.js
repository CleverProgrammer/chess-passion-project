import React from 'react'
import '../styles/Login.css'
import { signInWithGoogle, signInWithGithub } from '../firebase'

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

        <button className='login-provider-button' onClick={signInWithGithub}>
          <img
            src='https://cdn-icons-png.flaticon.com/512/733/733609.png'
            alt='github icon'
          />
          <span> Continue with Github</span>
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import ProfileButton from './components/ProfileButton'

function App() {
  return (
    <>
      <div>
        <a>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>LegitBusiness</h1>
      <p>Tu mejor opción para comprar y vender stocks está aquí.</p>
      <LoginButton/>
      <ProfileButton/>
      <LogoutButton/>
    </>
  )
}

export default App

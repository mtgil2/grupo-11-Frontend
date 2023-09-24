import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Legit Business</h1>
      <h3>Fintech</h3>
      <LoginButton/>
      <LogoutButton/>
    </>
  )
}

export default App

import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import ProfileButton from './components/ProfileButton'


export default function App() {
  return (
    <>
      <h1>Legit Business</h1>
      <h3>Fintech</h3>
      <LoginButton/>
      <ProfileButton/>
      <LogoutButton/>
    </>
  )
}
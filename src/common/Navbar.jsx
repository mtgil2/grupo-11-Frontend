import './navbar.css'
import Logo from './Logo'

function Navbar(){
  return(
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li><div className='logo-navbar'><Logo size={'small'}/></div></li>
        <li><a href="/">Inicio</a></li>
        <li><a href="/stocks">Stocks</a></li>
        <li><a href="/buy">Comprar</a></li>
        <li><a href="/user">Usuario</a></li>
      </ul>
    </nav>
  )
}

export default Navbar


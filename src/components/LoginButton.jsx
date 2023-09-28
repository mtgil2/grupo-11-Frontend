import { useActionData } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  return ( // indica si el usuario ya ha iniciado sesión
    <div className="login-form">
      <button className='boton' onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
    </div>
  );
}

export default LoginButton;
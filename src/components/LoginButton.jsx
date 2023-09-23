import { useActionData } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (
    <div className="login-form">
      <button onClick={() => loginWithRedirect()}>Iniciar Sesión con Auth0</button>
    </div>
  );
}

export default LoginButton;
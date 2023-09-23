import { useActionData } from 'react-router-dom';
import './form.css'
import { useAuth0 } from '@auth0/auth0-react'

function LoginForm() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-form">
      <button onClick={() => loginWithRedirect()}>Iniciar Sesión con Auth0</button>
    </div>
  );
}

export default LoginForm;
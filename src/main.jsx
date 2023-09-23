import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import Routing from './Routing.jsx'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain='dev-ghy7avbb8ibg18zy.us.auth0.com'
    clientId='o2lIbH3JvsUFjyEEXT9ss0dTj2tBPnAs'
    authorizationParams={{redirect_uri: window.location.origin }}>
    <Routing/>
    </Auth0Provider>
  </React.StrictMode>,
)

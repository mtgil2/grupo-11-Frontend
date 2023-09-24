import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Auth0Provider
  domain="dev-jgor463dhotlvfgo.us.auth0.com"
  clientId="ghRkl5zPREfedBgapN6F0SmNFLgUwq7m"
  // redirectUri={"http://localhost:5173/profile/"}
  authorizationParams={{
    redirect_uri: "http://localhost:5173/profile/"
  }}
  scope="openid profile email logins_count"
  >


    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  </Auth0Provider>
);



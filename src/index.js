import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import { StateContext } from './utils/stateContext';
import './styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    cacheLocation="localstorage"
    audience={process.env.REACT_APP_AUTH0_AUDIENCE_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <StateContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateContext>
  </Auth0Provider>
);
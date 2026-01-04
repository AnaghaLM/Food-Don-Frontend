import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Context from './context/Context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="334778219366-epb2dagjqvkp05gfnp1q7cdm4gbq132f.apps.googleusercontent.com">
        <Context>

          <App />
        </Context>
    
    </GoogleOAuthProvider>
  </StrictMode>,
)

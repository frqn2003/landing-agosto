import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Clarity from '@microsoft/clarity';

const projectId = "wg7h7j7vya"

Clarity.init(projectId);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </StrictMode>
)

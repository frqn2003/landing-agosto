import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { initClarity } from './lib/clarity.ts'

if (typeof window !== 'undefined') {
  requestIdleCallback?.(() => initClarity("wg7h7j7vya")) 
    ?? setTimeout(() => initClarity("wg7h7j7vya"), 2000)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/landing/ingreso/carreras-agosto/">
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

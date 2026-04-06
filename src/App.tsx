import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'
import Detalles from './componentes/landing/Detalles/Detalles'
import Footer from './componentes/landing/Footer'
import Carreras from './componentes/landing/Carreras/Carreras'
import DetalleCarrera from './pages/DetalleCarrera'
import NavbarCarreras from './componentes/landing/Carreras/NavbarCarreras'
import BeneficiosCarrusel from './componentes/landing/Detalles/BeneficiosCarrusel'

function App() {
  const parametros = new URLSearchParams(window.location.search)
  const utms = {
    utm_source: parametros.get('utm_source'),
    utm_medium: parametros.get('utm_medium'),
    utm_campaign: parametros.get('utm_campaign'),
    utm_term: parametros.get('utm_term'),
    utm_content: parametros.get('utm_content')
  }
  console.log(utms)
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Hero />
          <BeneficiosCarrusel />
          <Carreras />
          <Footer />
        </>
      } />

      <Route path='/carreras/:slug' element={
        <>
          <NavbarCarreras />
          <DetalleCarrera />
          <Footer />
        </>
      } />
    </Routes>
  )
}

export default App

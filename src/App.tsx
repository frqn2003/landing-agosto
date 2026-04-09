import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'
import Footer from './componentes/landing/Footer'
import Carreras from './componentes/landing/Carreras/Carreras'
import DetalleCarrera from './pages/DetalleCarrera'
import NavbarCarreras from './componentes/landing/Carreras/NavbarCarreras'
import BeneficiosCarrusel from './componentes/landing/Detalles/BeneficiosCarrusel'
import Form from './componentes/landing/Form'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Hero />
          <BeneficiosCarrusel />
          <Carreras />
          <Form />
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

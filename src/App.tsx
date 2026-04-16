import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'
import Footer from './componentes/landing/Footer'
import Carreras from './componentes/landing/Carreras/Carreras'
import DetalleCarrera from './pages/DetalleCarrera'
import NavbarCarreras from './componentes/landing/Carreras/NavbarCarreras'
import BeneficiosCarrusel from './componentes/landing/Detalles/BeneficiosCarrusel'
import Form from './componentes/landing/Form'
import Financiacion from './componentes/landing/Financiacion'
import PromocionDinamica from './componentes/landing/PromocionDinamica'
import ComparativaModalidades from './componentes/landing/ComparativaModalidades'
import Sedes from './componentes/landing/Sedes'
import PreguntasFrecuentes from './componentes/landing/PreguntasFrecuentes'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Hero />
          <BeneficiosCarrusel />
          <ComparativaModalidades />
          <PromocionDinamica />
          <Carreras />
          <Form />
          <Financiacion/>
          <section className='contenedor py-10 px-4' id="sedes">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
              <Sedes />
              <PreguntasFrecuentes />
            </div>
          </section>
          <Footer />
        </>
      } />

      <Route path=':slug' element={
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

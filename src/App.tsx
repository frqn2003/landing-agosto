import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'
import Footer from './componentes/landing/Footer'
import Carreras from './componentes/landing/Carreras/Carreras'
import DetalleCarrera from './pages/DetalleCarrera'
import BeneficiosCarrusel from './componentes/landing/BeneficiosCarrusel'
import FormSection from './componentes/landing/FormSection'
import Financiacion from './componentes/landing/Financiacion'
import PromocionDinamica from './componentes/landing/PromocionDinamica'
import ComparativaModalidades from './componentes/landing/ComparativaModalidades'
import Sedes from './componentes/landing/Sedes'
import PreguntasFrecuentes from './componentes/landing/PreguntasFrecuentes'
import PaginaError from './pages/PaginaError'
import GraciasPage from './pages/GraciasPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar onSubPage={false} />
          <Hero />
          <BeneficiosCarrusel onSubPage ={false}/>
          <PromocionDinamica />
          <Carreras />
          <FormSection />
          <ComparativaModalidades onSubPage={false}/>
          <Financiacion />
          <section className='contenedor pb-10' id="sedes">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
              <Sedes />
              <PreguntasFrecuentes />
            </div>
          </section>
          <Footer />
        </>
      } />

      <Route path="enviado-agosto" element={<GraciasPage />} />
      <Route path="enviado/:tkpSlug" element={<GraciasPage />} />

      <Route path=':slug' element={
        <>
          <Navbar onSubPage={true} />
          <DetalleCarrera />
          <Footer />
        </>
      } />
      <Route path="*" element={<PaginaError />} />
      <Route path="/404" element={<PaginaError />} />
    </Routes>
  )
}

export default App

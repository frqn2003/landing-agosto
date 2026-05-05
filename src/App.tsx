import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'

const BeneficiosCarrusel = lazy(() => import('./componentes/landing/BeneficiosCarrusel'))

// Below-the-fold: lazy loaded
const PromocionDinamica = lazy(() => import('./componentes/landing/PromocionDinamica'))
const Carreras = lazy(() => import('./componentes/landing/Carreras/Carreras'))
const FormSectionLazy = lazy(() => import('./componentes/landing/FormSection'))

function FormSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '400px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref}>
      {visible && <Suspense fallback={null}><FormSectionLazy /></Suspense>}
    </div>
  )
}

const ComparativaModalidades = lazy(() => import('./componentes/landing/ComparativaModalidades'))
const Financiacion = lazy(() => import('./componentes/landing/Financiacion'))
const Sedes = lazy(() => import('./componentes/landing/Sedes'))
const PreguntasFrecuentes = lazy(() => import('./componentes/landing/PreguntasFrecuentes'))
const Footer = lazy(() => import('./componentes/landing/Footer'))

// Rutas secundarias: lazy loaded
const DetalleCarrera = lazy(() => import('./pages/DetalleCarrera'))
const PaginaError = lazy(() => import('./pages/PaginaError'))
const GraciasPage = lazy(() => import('./pages/GraciasPage'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar onSubPage={false} />
            <main role="main">
              <Hero />
              <BeneficiosCarrusel onSubPage={false} />
              <PromocionDinamica />
              <Carreras />
              <FormSection />
              <ComparativaModalidades onSubPage={false} />
              <Financiacion />
              <section className='contenedor pb-10' id="sedes" role="region" aria-label="Sedes y preguntas frecuentes">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-3">
                  <Sedes />
                  <PreguntasFrecuentes />
                </div>
              </section>
            </main>
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
    </Suspense>
  )
}

export default App
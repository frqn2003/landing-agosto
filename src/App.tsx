import Navbar from './componentes/landing/Navbar'
import Hero from './componentes/landing/Hero'
import Detalles from './componentes/landing/Detalles'
import Footer from './componentes/landing/Footer'

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
    <>
      <Navbar />
      <Hero />
      <Detalles />
      <Footer />
    </>
  )
}

export default App

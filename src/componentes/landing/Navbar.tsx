import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
/* HAY UN BUG EN LA NAVBAR EN LOS PIXELES 140 a 200 , SE RENDERIZA CONSTANTEMENTE AMBOS COMPONENTES, EL SCROLLEADO Y EL NO SCROLLEADO, ARREGLAR */
function Navbar({ onSubPage }: { onSubPage?: boolean }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('')
  const menu = document.getElementById("navMenu");
  const boton = document.getElementById("menu-button");
  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
  }

  useEffect(() => {
    const secciones = ['beneficios', 'carreras', 'modalidades', 'sedes']

    const handleScroll = () => {
      setScrolled(window.scrollY > 150)

      if (window.scrollY < 150) {
        setSeccionActiva('')
        return
      }

      // Encontrar qué sección está más cerca del centro del viewport
      const centro = window.innerHeight / 2

      let activa = ''
      for (const id of secciones) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= centro && rect.bottom >= centro) {
          activa = id
          break
        }
      }
      setSeccionActiva(activa)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  /* Manejar click fuera del menú */
  useEffect(() => {
    if (!menuAbierto) return;

    function clickAfuera(e: MouseEvent) {
      if (
        !menu?.contains(e.target as Node) &&
        !boton?.contains(e.target as Node)
      ) {
        setMenuAbierto(false);
      }
    }
    if (!menuAbierto) return;

    const handleScroll = () => {
      setMenuAbierto(false);
    };
    document.addEventListener("mousedown", clickAfuera);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", clickAfuera);
    };

  }, [menuAbierto]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const location = useLocation()
  useEffect(() => {
    if (location.state?.fromLanding === true) {
      sessionStorage.setItem('fromLanding', 'true')
    }
    return () => {
      sessionStorage.removeItem('fromLanding')
    }
  }, [])
  const fromLanding = location.state?.fromLanding === true || sessionStorage.getItem('fromLanding') === 'true'
  return (
    <>
      {menuAbierto && (
        <div
          className="fixed top-0 left-0 right-0 z-40 flex justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-700/40 backdrop-blur-sm md:p-24"
          onClick={() => setMenuAbierto(false)}
        />
      )}
      <nav
        className={`w-full z-50 top-0 transition-all duration-500 ease-in-out bg-white/80 ${scrolled
          ? "sticky backdrop-blur-md nav-menu"
          : "relative backdrop-blur-md"
          }`}
        id="navbar" role="navigation"
      >
        <div
          className={`${scrolled ? "contenedor" : "px-4"} mx-auto py-3 grid grid-cols-2 lg:grid-cols-3 items-center justify-between h-18 z-50`}
        >
          <div className="justify-start flex items-center">
            {fromLanding ? (
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-semibold text-(--azul-ucasal) hover:text-(--rojo-ucasal) transition-colors text-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {scrolled ? (
                  <div className="flex justify-items-center gap-2">
                    <img src={`${import.meta.env.BASE_URL}iso.svg`} alt="UCASAL" className="h-6 w-auto" />
                    <span className="flex items-center text-center">Volver al inicio</span>
                  </div>
                ) : "Volver al inicio"}
              </Link>
            ) : (
              scrolled ? (
                <a
                  href="#"
                  className="text-3xl font-sans font-semibold text-(--azul-light-ucasal)"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}ucasal-color-h.svg`}
                    alt="Logo"
                    className="h-10 w-auto"
                  />
                </a>
              ) : (
                <img src={`${import.meta.env.BASE_URL}iso.svg`} alt="Logo" className="h-10 w-auto" />
              )
            )}

          </div>
          <section className="hidden lg:flex items-center justify-center space-x-1 lg:space-x-2">
            {onSubPage ? (
              <>
                <button onClick={() => scrollTo('modalidades')} className={`nav-link ${seccionActiva === 'modalidades' ? 'active' : ''}`}>Modalidades</button>
                <button onClick={() => scrollTo('beneficios')} className={`nav-link ${seccionActiva === 'beneficios' ? 'active' : ''}`}>
                  Beneficios
                </button>
              </>
            ) : (
              <>
                <button onClick={() => scrollTo('beneficios')} className={`nav-link ${seccionActiva === 'beneficios' ? 'active' : ''}`}>Beneficios</button>
                <button onClick={() => scrollTo('carreras')} className={`nav-link ${seccionActiva === 'carreras' ? 'active' : ''}`}>Carreras</button>
              </>
            )}
            <button onClick={() => scrollTo('sedes')} className={`nav-link ${seccionActiva === 'sedes' ? 'active' : ''}`}>
              Sedes
            </button>
          </section>

          <div className="justify-end flex items-center">
            <a href="https://www.ucasal.edu.ar/inscripciones/?utm_source=landing_agosto" target="_blank" rel="noopener noreferrer" className="boton-cta hidden lg:flex">¡Quiero Inscribirme!</a>
            {/* Botón mobile hamburguesa */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex lg:hidden items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 hover:bg-gray-100"
              id="menu-button"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuAbierto ? (
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l12 12M13 1L1 13"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </div >
        <section
          id="navMenu"
          className={`bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden absolute w-full transition-all duration-300 ease-out z-50 ${menuAbierto
            ? "opacity-100 translate-y-0 max-h-96 visible"
            : "opacity-0 -translate-y-4 max-h-0 invisible"
            }`}
        >
          <ul className="flex flex-col gap-2 w-full">
            {onSubPage ? (
              <>
              <li className="w-full">
                <button onClick={() => scrollTo('modalidades')} className={`mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal) ${seccionActiva === 'modalidades' ? 'active' : ''}`}>Modalidades</button>
              </li>
              <li className="w-full">
                <button onClick={() => scrollTo('beneficios')} className={`mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal) ${seccionActiva === 'beneficios' ? 'active' : ''}`}>
                  Beneficios
                </button>
              </li>
              </>
            ) : (
              <>
              <li className="w-full">
                <button onClick={() => scrollTo('beneficios')} className={`mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal) ${seccionActiva === 'beneficios' ? 'active' : ''}`}>Beneficios</button>
              </li>
              <li className="w-full">
                <button onClick={() => scrollTo('carreras')} className={`mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal) ${seccionActiva === 'carreras' ? 'active' : ''}`}>Carreras</button>
              </li>
              </>
            )}
            <li className="w-full">
            <button onClick={() => scrollTo('sedes')} className={`mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)${seccionActiva === 'sedes' ? 'active' : ''}`}>
              Sedes
            </button>
            </li>
            <li className="py-2 border-t border-gray-200 w-full">
              <button
                className="mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                onClick={() => { setMenuAbierto(false); window.open('https://www.ucasal.edu.ar/inscripciones/?utm_source=landing_agosto', '_blank', 'noopener,noreferrer') }}
              >
                ¡Quiero Inscribirme!
              </button>
            </li>
          </ul>
        </section>
      </nav >
    </>
  );
}

export default Navbar;

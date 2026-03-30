import { useState, useEffect } from "react";
/* HAY UN BUG EN LA NAVBAR EN LOS PIXELES 140 a 200 , SE RENDERIZA CONSTANTEMENTE AMBOS COMPONENTES, EL SCROLLEADO Y EL NO SCROLLEADO, ARREGLAR */
function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = document.getElementById("navMenu");
  const boton = document.getElementById("menu-button");

  function toggleMenu() {
    setMenuAbierto(!menuAbierto);
  }

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


  /* Maneja el navbar al hacer scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 125) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {menuAbierto && (
        <div
          className="fixed top-0 left-0 right-0 z-40 flex justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-700/40 backdrop-blur-sm md:p-24"
          onClick={() => setMenuAbierto(false)}
        />
      )}
      <nav
        className={`w-full z-50 top-0 transition-all duration-500 ease-in-out bg-white/80 ${
          scrolled
            ? "sticky backdrop-blur-md nav-menu"
            : "relative backdrop-blur-md"
        }`}
        id="navbar"
      >
        <div
          className={`${scrolled ? "contenedor" : "px-4"} mx-auto py-3 grid grid-cols-2 md:grid-cols-3 items-center justify-between h-18 z-50`}
        >
          <div className="justify-start flex items-center">
            {scrolled ? (
              <a
                href="#"
                className="text-3xl font-sans font-semibold text-(--azul-light-ucasal)"
              >
                <img
                  src="/ucasal-color-h.svg"
                  alt="Logo"
                  className="h-10 w-auto"
                />
              </a>
            ) : (
              <img src="/iso.svg" alt="Logo" className="h-10 w-auto" />
            )}
          </div>
          <section className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
            <a href="#inicio" className="nav-link">
              Modalidad
            </a>
            <a href="#nosotros" className="nav-link">
              Carreras
            </a>
            <a href="#servicios" className="nav-link">
              Sedes
            </a>
          </section>

          <div className="justify-end flex items-center">
            <button className="boton-cta hidden md:flex">¡Quiero Inscribirme!</button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex md:hidden items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 hover:bg-gray-100"
              id="menu-button"
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
        </div>
        <section
          id="navMenu"
          className={`bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden absolute w-full transition-all duration-300 ease-out z-50 ${
            menuAbierto
              ? "opacity-100 translate-y-0 max-h-96 visible"
              : "opacity-0 -translate-y-4 max-h-0 invisible"
          }`}
        >
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="#inicio"
                className="mobile-nav-link block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                onClick={() => setMenuAbierto(false)}
              >
                Modalidad
              </a>
            </li>
            <li>
              <a
                href="#nosotros"
                className="mobile-nav-link block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                onClick={() => setMenuAbierto(false)}
              >
                Carreras
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="mobile-nav-link block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                onClick={() => setMenuAbierto(false)}
              >
                Sedes
              </a>
            </li>
            <li className="py-2 border-t border-gray-200 w-full">
              <button
                className="mobile-nav-link justify-start items-start flex w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                onClick={() => setMenuAbierto(false)}
              >
                ¡Quiero Inscribirme!
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </>
  );
}

export default Navbar;

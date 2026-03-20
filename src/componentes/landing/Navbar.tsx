import { useState, useEffect } from "react";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const menu = document.getElementById("navMenu")
    const boton = document.getElementById("menu-button")

    function toggleMenu() {
        setMenuAbierto(!menuAbierto)
    }

    /* Manejar click fuera del menú */
    useEffect(() => {
        if (!menuAbierto) return

        function clickAfuera(e: MouseEvent) {
            if (!menu?.contains(e.target as Node) && !boton?.contains(e.target as Node)) {
                setMenuAbierto(false)
            }
        }

        document.addEventListener("mousedown", clickAfuera)

        return () => {
            document.removeEventListener("mousedown", clickAfuera)
        }
    }, [menuAbierto])
    /* Maneja el navbar al hacer scroll */
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <nav className={`w-full z-50 top-0 transition-all duration-500 ease-in-out ${scrolled
            ? 'sticky bg-gray-100/20 backdrop-blur-sm nav-menu'
            : 'bg-gray-100/40 backdrop-blur-sm'
            }`}
            id="navbar"
        >
            <div className="mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-3 items-center justify-between h-16">
                <div className="justify-start flex items-center">
                    {scrolled ? (
                        <a href="#" className="text-3xl font-sans font-semibold text-(--azul-light-ucasal)">
                            <h3>UCASAL</h3>
                        </a>
                    ) : (
                        <img
                            src="/iso.svg"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    )}
                </div>
                <section className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#nosotros" className="nav-link">Nosotros</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#contacto" className="nav-link">Contacto</a>
                </section>

                <div className="justify-end flex items-center">
                    <button className="boton-cta hidden md:flex">
                        Contacto
                    </button>
                    <button onClick={toggleMenu} type="button" className="inline-flex lg:hidden items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 hover:bg-gray-100" id="menu-button">
                        {menuAbierto ?
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M1 1l12 12M13 1L1 13" />
                            </svg>
                            :
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        }
                    </button>
                </div>
            </div>
            {menuAbierto && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setMenuAbierto(false)}
                />
            )}
            <section
                id="navMenu"
                className={`bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden absolute w-full transition-all duration-300 ease-out z-50 ${menuAbierto
                        ? 'opacity-100 translate-y-0 max-h-96 visible'
                        : 'opacity-0 -translate-y-4 max-h-0 invisible'
                    }`}
            >
                <ul className="flex flex-col gap-4">
                    <li><a href="#inicio" className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100">Inicio</a></li>
                    <li><a href="#nosotros" className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100">Nosotros</a></li>
                    <li><a href="#servicios" className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100">Servicios</a></li>
                    <li><a href="#contacto" className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100">Contacto</a></li>
                </ul>
            </section>
        </nav>
    )
}

export default Navbar
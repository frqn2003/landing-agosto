import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export default function NavbarCarreras() {
    const [scrolled, setScrolled] = useState(false)
    const [menuAbierto, setMenuAbierto] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY >= 80)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (!menuAbierto) return
        const cerrar = () => setMenuAbierto(false)
        window.addEventListener("scroll", cerrar)
        return () => window.removeEventListener("scroll", cerrar)
    }, [menuAbierto])
    const location = useLocation()
    const fromLanding = location.state?.fromLanding === true

    return (
        <>
            <nav
                className={`w-full z-50 top-0 transition-all duration-500 ease-in-out bg-white/80 backdrop-blur-md ${scrolled ? "sticky shadow-sm border-b border-gray-100 nav-menu" : "relative"
                    }`}
            >
                <div className={`${scrolled ? "contenedor" : "px-4"} mx-auto py-3 grid grid-cols-2 lg:grid-cols-3 items-center h-18`}>

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
                        <img src={`${import.meta.env.BASE_URL}ucasal-color-h.svg`} alt="UCASAL" className="h-8 w-auto" />
                    )}

                    {/* Logo centrado */}
                    <div className="hidden lg:flex items-center justify-center">
                        <img src={`${import.meta.env.BASE_URL}ucasal-color-h.svg`} alt="UCASAL" className="h-10 w-auto" />
                    </div>

                    {/* CTA + hamburguesa */}
                    <div className="flex items-center justify-end gap-2">
                        <a
                            href="https://www.ucasal.edu.ar/inscripciones/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="boton-cta flex"
                        >
                            ¡Quiero Inscribirme!
                        </a>
                    </div>
                </div>

                {/* Menú mobile */}
                <section
                    className={`bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden absolute w-full transition-all duration-300 ease-out z-50 ${menuAbierto
                            ? "opacity-100 translate-y-0 max-h-64 visible"
                            : "opacity-0 -translate-y-4 max-h-0 invisible"
                        }`}
                >
                    <ul className="flex flex-col gap-1 py-2">
                        <li>
                            <Link
                                to="/"
                                className="mobile-nav-link block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-(--rojo-ucasal) transition-colors font-semibold border-l-4 border-transparent hover:border-(--rojo-ucasal)"
                                onClick={() => setMenuAbierto(false)}
                            >
                                ← Volver al inicio
                            </Link>
                        </li>
                        <li className="py-2 border-t border-gray-200 px-4">
                            <a
                                href="https://www.ucasal.edu.ar/inscripciones/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="boton-cta flex justify-center"
                            >
                                ¡Quiero Inscribirme!
                            </a>
                        </li>
                    </ul>
                </section>
            </nav>
        </>
    )
}
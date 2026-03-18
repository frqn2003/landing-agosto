import { useState, useEffect } from "react";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const menu = document.getElementById("navMenu")
    const boton = document.getElementById("menu-button")

    function toggleMenu() {
        setMenuAbierto(!menuAbierto)
    }
    useEffect(() => {
        if (menu) {
            menu.classList.toggle("hidden", !menuAbierto)
            menu.style.maxHeight = menuAbierto ? "500px" : "0px"
        }
    }, [menuAbierto])
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
    return (
        <nav className="sticky w-full z-50 top-0 transition-all duration-500 ease-in-out bg-gray-300/10 backdrop-blur-sm border-b border-gray-400/50" id="navbar">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#" className="flex items-center cursor-pointer">
                    <img src="/public/ucasal-color-h.svg" alt="Logo" className="h-10 w-auto" />
                </a>
                <section className="hidden md:flex items-center space-x-1 lg:space-x-2">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#nosotros" className="nav-link">Nosotros</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#contacto" className="nav-link">Contacto</a>
                </section>

                <div className="flex items-center">
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

            <section id="navMenu" className="hidden bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out absolute w-full" style={{ maxHeight: "0px" }}>
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
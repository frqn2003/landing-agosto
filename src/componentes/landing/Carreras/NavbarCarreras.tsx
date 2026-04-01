import { Link, useNavigate } from "react-router-dom"

export default function NavbarCarreras() {
    const navigate = useNavigate()
    return (
        <nav className="w-full bg-white/80 backdrop-blur-md top-0 z-50 transition-all duration-500 ease-in-out">
            <div className="contenedor mx-auto">
                <div className="grid grid-cols-3 items-center justify-center w-full h-18 ">
                    <Link to="#" onClick={() => navigate(-1)} className="text-2xl font-bold degrade flex items-center justify-start">
                        Volver Atrás
                    </Link>
                    <div className="text-2xl font-bold text-(--azul-ucasal) flex items-center justify-center">
                        <img src="/ucasal-color-h.svg" alt="UCASAL" className="h-10" />
                    </div>
                    <div className="flex items-center justify-end">
                        <button onClick={() => window.location.href = "https://www.ucasal.edu.ar/inscripciones/"} className="boton-cta">¡Quiero Inscribirme!</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
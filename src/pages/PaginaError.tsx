import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className='flex flex-col gap-4 items-center justify-center h-screen bg-linear-to-r from-(--azul-ucasal)/15 to-(--rojo-ucasal)/15 relative'>
            <div className="absolute top-0 right-1/2 w-12 h-12 mt-6 translate-x-1/2 z-20"><img src="iso.svg" alt="" /> </div>
            <h1 className='text-6xl font-bold'>Parece que te desviaste</h1>
            <p className='text-lg text-gray-500'>Error 404: No encontramos la página que buscas</p>
            <Link className="flex flex-row items-center justify-center gap-4 boton-cta" to="/">
                <span className="pb-1">←</span>
                <span className=''> Volver al inicio</span>
            </Link>
        </div>

    )
}

{/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 900, margin: 0 }}>404</h1>
            <p style={{ fontSize: '1.25rem', color: '#555' }}>Página no encontrada</p>
            <a href="/" style={{ color: '#1a56db', textDecoration: 'underline' }}>Volver al inicio</a>
        </div> */}
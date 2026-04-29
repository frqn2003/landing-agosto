import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../componentes/landing/Footer'

interface FormState {
    nombre?: string
    email?: string
    carrera?: string
    modalidad?: string
    sede?: string
}

export default function GraciasPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { tkpSlug: _tkpSlug } = useParams<{ tkpSlug?: string }>()
    const state = (location.state as FormState) ?? {}
    const { nombre, email, carrera, modalidad, sede } = state

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    const nombreMostrado = nombre?.split(' ')[0] ?? 'futuro estudiante'

    return (
        <section className='min-h-screen'>
        <div className="contenedor h-full bg-linear-to-br from-blue-400 via-white to-red-400 flex flex-col items-center justify-center pt-16">

            {/* Icono check animado */}
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-(--azul-ucasal) flex items-center justify-center shadow-2xl animate-[heroFadeInUp_0.5s_ease-out_forwards]">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-(--rojo-ucasal) animate-bounce" />
            </div>

            {/* Título */}
            <div className="text-center max-w-xl mb-5" style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 0.2s forwards' }}>
                <h1 className="text-4xl md:text-5xl font-extrabold degrade-azul mb-3">
                    ¡Gracias, {nombreMostrado}!
                </h1>
                <p className="text-gray-500 text-lg">
                    Recibimos tu solicitud correctamente. Un asesor se va a comunicar con vos a la brevedad.
                </p>
            </div>

            {/* Card con datos del formulario */}
            {(carrera || email || sede) && (
                <div
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 w-full max-w-md mb-10"
                    style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 0.4s forwards' }}
                >
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Resumen de tu solicitud</h2>
                    <ul className="flex flex-col gap-4">
                        {nombre && (
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-(--azul-ucasal)/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-(--azul-ucasal)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Nombre</p>
                                    <p className="text-sm font-semibold text-gray-800">{nombre}</p>
                                </div>
                            </li>
                        )}
                        {email && (
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-(--azul-ucasal)/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-(--azul-ucasal)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="text-sm font-semibold text-gray-800">{email}</p>
                                </div>
                            </li>
                        )}
                        {carrera && (
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-(--azul-ucasal)/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-(--azul-ucasal)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Carrera</p>
                                    <p className="text-sm font-semibold text-gray-800">{carrera}</p>
                                </div>
                            </li>
                        )}
                        {modalidad && (
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-(--azul-ucasal)/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-(--azul-ucasal)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Modalidad</p>
                                    <p className="text-sm font-semibold text-gray-800">{modalidad}</p>
                                </div>
                            </li>
                        )}
                        {sede && (
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-(--azul-ucasal)/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-(--azul-ucasal)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Sede</p>
                                    <p className="text-sm font-semibold text-gray-800">{sede}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Videos */}
            <div
                className="bg-white rounded-2xl border border-gray-300 shadow-lg p-6 w-full max-w-md mb-5"
                style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 0.6s forwards' }}
            >
                <h2 className="text-sm font-bold text-gray-400 text-center uppercase tracking-widest mb-4">¡Conocé como es la plataforma virtual!</h2>
                <video src={`${import.meta.env.BASE_URL}/plataforma.webm`} controls className="w-full rounded-lg"></video>
            </div>

            {/* CTA volver */}
            <div className='mb-12' style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 0.8s forwards' }}>
                <button
                    onClick={() => navigate('/')}
                    className="boton-cta flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Explorar más carreras
                </button>
            </div>

        </div>
        <Footer/>
        </section>
    )
}

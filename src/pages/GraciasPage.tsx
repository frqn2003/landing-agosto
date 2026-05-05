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

            {/* Redes sociales */}
            <div className="flex flex-col items-center gap-3 mb-6" style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 0.7s forwards' }}>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Seguinos en redes</p>
                <div className="flex items-center gap-4">
                    <a href="https://www.facebook.com/Ucasal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@ucasal" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#FF0000] hover:border-[#FF0000] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/ucasal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#E1306C] hover:border-[#E1306C] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@ucasal" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                    </a>
                    <a href="https://ar.linkedin.com/school/ucasal-oficial/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://x.com/UcasalOficial" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="w-10 h-10 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                </div>
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

        {/* Bot flotante con globo de texto */}
        <div className="fixed z-50 md:bottom-10 md:right-20 bottom-6 right-6">
            {/* Globo de texto */}
            <div className="bottom-20 right-0 mb-2 mr-2" style={{ animation: 'heroFadeInUp 0.5s ease-out 1s both' }}>
                <div className="relative px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-lg max-w-xs">
                    <div className="text-center">
                        ¡Hola! Soy tu asistente virtual 🤖
                        <br />
                        <span className="text-xs opacity-90">¿En qué puedo ayudarte?</span>
                    </div>
                    {/* Flecha del globo */}
                    <div className="absolute bottom-0 right-26 md:right-28 transform translate-y-full">
                        <div className="w-0 h-6 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800" />
                    </div>
                </div>
            </div>

            {/* Botón de WhatsApp */}
            <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center mx-auto w-16 h-16 text-white transition-transform rounded-full hover:scale-110 animate-bounce"
                href={`https://api.whatsapp.com/send/?phone=5493872589770&text=${encodeURIComponent('Hola, quiero más información sobre la carrera de ' + (carrera ?? ''))}&type=phone_number&app_absent=0`}
            >
                <img src={`https://ucasal.edu.ar/landing/ingreso/public/bot.jpeg`} className="w-16 h-16 rounded-full" alt="WhatsApp Chatbot" />
            </a>
        </div>

        </section>
    )
}

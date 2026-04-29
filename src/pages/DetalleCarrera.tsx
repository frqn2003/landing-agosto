import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { sanitizarTexto } from "../lib/utils"
import Clarity from "@microsoft/clarity"

import data from "../data/carreras"
import Form from "../componentes/landing/Form"
import PreguntasFrecuentes from "../componentes/landing/PreguntasFrecuentes"
import Sedes from "../componentes/landing/Sedes"
import ComparativaModalidades from "../componentes/landing/ComparativaModalidades"
import BeneficiosCarrusel from "../componentes/landing/BeneficiosCarrusel"
import Financiacion from "../componentes/landing/Financiacion"

export default function DetalleCarrera() {
    const { slug } = useParams()
    const slugLimpio = slug ? sanitizarTexto(slug) : ''
    const carrera = data.find((c: any) => c.slug === slugLimpio)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)')
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [slug])

    useEffect(() => {
        if (modalAbierto) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [modalAbierto])

    useEffect(() => {
        if (carrera) {
            document.title = `Estudia ${carrera?.nombre} en UCASAL`
        }
        return () => {
            document.title = 'UCASAL: ¡Inicia tu Carrera en Agosto!'
        }
    }, [carrera])

    const modalidad = carrera?.modalidad == 7 ? 'Online' : carrera?.modalidad == 1 ? 'Presencial' : 'Presencial'
    const sinCursadoIntensivo = carrera?.codcar === 244 || carrera?.codcar === 196

    const titulo = carrera?.nombre?.trim().split(' ') || []
    const tituloClase = titulo?.length >= 5 ? 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl' : 'text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl animate-[typewriter_0.8s_steps(10)_forwards] overflow-hidden'

    const navegacion = useNavigate()

    useEffect(() => {
        if (slugLimpio && !carrera) {
            navegacion('/404', { replace: true })
            return
        }
        else {
            Clarity.setTag("carrera", carrera?.nombre || '')
            Clarity.setTag("carreraId", carrera?.codcar?.toString() || '')
            Clarity.setTag("modalidad", modalidad)
            Clarity.setTag("slug", slugLimpio)

            Clarity.event("vista-carrera")
            Clarity.upgrade("visita-detalle-carrera")
        }
    }, [slugLimpio, carrera])

    return (
        <>
            <Helmet>
                <meta name="description" content={carrera?.descripcionCorta} />
                <meta name="language" content="es" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="image" content={`https://www.ucasal.edu.ar/landing/ingreso/public/${carrera?.codcar}.jpg`} />
                <meta httpEquiv="Content-language" content="es" />
                <meta name="author" content="Universidad Católica de Salta - UCASAL" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <meta property="og:title" content={carrera?.nombre + " - UCASAL"} />
                <meta property="og:description" content={carrera?.descripcionCorta} />
                <meta property="og:site_name" content="UCASAL - Universidad Católica de Salta" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://www.ucasal.edu.ar/landing/ingreso/public/${carrera?.codcar}.jpg`} />
                <meta property="og:url" content={`https://www.ucasal.edu.ar/landing/ingreso/carreras/${carrera?.codcar}`} />
                <meta property="og:locale" content="es_AR" />
            </Helmet>
            {/* ── HERO DE LA CARRERA ── */}
            <section className="w-full min-h-full flex items-center pt-4 px-4 contenedor">
                <div className="w-full h-[500px] sm:h-[600px] bg-(--azul-ucasal) px-6 py-12 sm:p-12 rounded-2xl relative">
                    <div className={`flex flex-col h-full sm:flex-row gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-center justify-center relative z-10  w-full sm:w-[60%]`}>
                        <div className={`flex flex-col gap-3 text-black flex-1 h-full ${titulo.length <= 4 ? 'justify-center max-sm:mb-12' : 'justify-start'} sm:justify-center max-sm:text-center`}>
                            <h1 className={`${tituloClase} font-extrabold leading-10 sm:leading-none tracking-tight uppercase text-white`}>
                                {carrera?.nombre}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs sm:text-sm text-white/70 bg-(--rojo-ucasal) max-sm:mx-auto w-fit px-2 sm:px-3 py-1.5 rounded-lg" style={{ opacity: 0, animation: `heroFadeInUp ${titulo.length <= 4 ? '0.6' : '0.8'}s ease-out 1s forwards` }}>
                                <span className="flex items-center gap-1 sm:gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {carrera?.duracion}
                                </span>
                                <span className="flex items-center gap-1 sm:gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {modalidad}
                                </span>
                                <span className="flex items-center gap-1 sm:gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Título oficial
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <picture>
                            <source media="(min-width: 769px)" srcSet={`encabezados/${carrera?.codcar}-desktop.webp`} />
                            <source media="(max-width: 768px)" srcSet={`encabezados/${carrera?.codcar}-mobile.webp`} />
                            <img
                                src={`/encabezados/${carrera?.codcar}-desktop.webp`}
                                alt={`${carrera?.nombre}`}
                                className="w-full h-full object-cover object-center"
                            />
                        </picture>
                    </div>
                </div>
            </section>

            <div className="py-10 flex flex-col lg:flex-row gap-10 items-start bg-white">

                {/* ── COLUMNA PRINCIPAL ── */}
                <div className="flex flex-col gap-10 w-full lg:w-[60%]">

                    {/* Descripción larga */}
                    <div className="contenedor flex flex-col gap-3">
                        <h2 className="text-2xl md:text-3xl font-black degrade-azul">Sobre la carrera</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {carrera?.descripcionLarga}
                        </p>
                    </div>

                    {/* Perfil del egresado */}
                    <div className="mx-6 md:mx-24 flex flex-col gap-3 bg-(--azul-ucasal)/5 border border-(--azul-ucasal)/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-(--azul-ucasal) flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-black degrade-azul">El graduado de {carrera?.nombre} de UCASAL podrá</h2>
                        </div>
                        {carrera?.perfilEgresado && typeof carrera?.perfilEgresado === 'object' ? (
                            <div className="flex flex-col gap-2">
                                <ul className="flex flex-col gap-1.5 mt-1">
                                    {carrera?.perfilEgresado.items.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 text-base">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-(--azul-ucasal) shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-600 leading-relaxed text-base">{carrera?.perfilEgresado as any || ''}</p>
                        )}
                    </div>

                    {/* Botón plan de estudios */}
                    {sinCursadoIntensivo && (
                        <p className="contenedor text-xs text-gray-400 italic">
                            * Esta carrera no incluye la modalidad de cursado intensivo.
                        </p>
                    )}
                    <div className="contenedor flex sm:flex-wrap gap-1 sm:gap-4">
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="boton-cta flex items-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Ver plan de estudios
                        </button>
                        <a
                            href="https://www.ucasal.edu.ar/inscripciones/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-transparent text-(--azul-ucasal) font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl border-2 border-(--azul-ucasal) transition-all hover:bg-(--azul-ucasal) hover:text-white flex items-center"
                        >
                            Inscribirme ahora
                        </a>
                    </div>

                    {!isDesktop && (
                        <div className="contenedor">
                            <div className="bg-(--azul-ucasal)/5 border-2 border-(--azul-ucasal)/20 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                                <div>
                                    <h3 className="text-xl font-black degrade-azul">¿Te interesa {carrera?.nombre}?</h3>
                                    <p className="text-sm text-gray-500 mt-1">Dejanos tus datos y un asesor te contactará</p>
                                    {sinCursadoIntensivo && (
                                        <p className="text-xs text-gray-400 italic mt-1">* Esta carrera no incluye cursado intensivo.</p>
                                    )}
                                </div>
                                <Form codcarInicial={String(carrera?.codcar)} onSubPage={true} />
                            </div>
                        </div>
                    )}

                    <ComparativaModalidades onSubPage={true} />
                    <BeneficiosCarrusel />
                    <Financiacion />
                    <section className='contenedor pb-4 px-4' id="sedes">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                            <Sedes />
                            <PreguntasFrecuentes />
                        </div>
                    </section>
                </div>

                {/* ── FORMULARIO LATERAL (solo desktop) ── */}
                {isDesktop && (
                    <aside className="w-full lg:w-[40%] lg:sticky lg:top-24 mr-12 md:mr-24">
                        <div className="bg-(--azul-ucasal)/5 border-2 border-(--azul-ucasal)/20 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                            <div>
                                <h3 className="text-xl font-black degrade-azul">¿Te interesa {carrera?.nombre}?</h3>
                                <p className="text-sm text-gray-500 mt-1">Dejanos tus datos y un asesor te contactará</p>
                                {sinCursadoIntensivo && (
                                    <p className="text-xs text-gray-400 italic mt-1">* Esta carrera no incluye cursado intensivo.</p>
                                )}
                            </div>
                            <Form codcarInicial={String(carrera?.codcar)} onSubPage={true} />
                        </div>
                    </aside>
                )}


            </div>

            {/* ── MODAL PLAN DE ESTUDIOS ── */}
            {modalAbierto && (
                <div
                    className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-700/40 backdrop-blur-sm md:p-24"
                    onClick={() => setModalAbierto(false)}
                >
                    <div
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header modal */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <div>
                                <h3 className="text-lg font-black degrade-azul">Plan de Estudios</h3>
                                <p className="text-xs text-gray-500">{carrera?.nombre} · {carrera?.duracion}</p>
                            </div>
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido semestres */}
                        <div className={`px-6 py-5 grid gap-6 ${carrera?.planEstudios.length as any % 2 === 1 ? 'md:grid-cols-2 [&>*:last-child]:md:col-span-2 [&>*:last-child]:md:max-w-md [&>*:last-child]:md:mx-auto' : 'md:grid-cols-2'}`}>
                            {carrera?.planEstudios.map((sem, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-white bg-(--rojo-ucasal) p-2 rounded-full">{sem.semestre}</h4>
                                    </div>
                                    <ul className="ml-3 flex flex-col gap-1">
                                        {sem.materias.map((materia, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                                {materia}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

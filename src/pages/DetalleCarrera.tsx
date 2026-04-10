import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import data from "../data/carreras"
/* TODO: Reemplazar con datos reales por carrera, el encabezado tendría que ser distinto, siguiendo el diseño previsto del hero ya hecho */
// Datos placeholder — reemplazar con datos reales por carrera

export default function DetalleCarrera() {
    const { slug } = useParams()
    const carrera = data.find((c: any) => c.slug === slug)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", consulta: "" })

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
            document.title = `Estudia ${carrera.nombre} en UCASAL`
        }
        return () => {
            document.title = 'UCASAL: ¡Inicia tu Carrera en Agosto!'
        }
    }, [carrera])

    const modalidad = carrera?.modalidad == 7 ? 'Virtual' : carrera?.modalidad == 1 ? 'Presencial' : 'Presencial'

    const titulo = carrera?.nombre?.trim().split(' ') || []
    const tituloClase = titulo?.length >= 4 ? 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl' : 'text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl animate-[typewriter_0.8s_steps(8)_forwards]'
    console.log(titulo, tituloClase)

    if (!carrera) {
        return (
            <div className="contenedor py-20 text-center">
                <h1 className="text-2xl font-bold text-(--azul-ucasal)">Carrera no encontrada</h1>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <meta name="description" content={carrera.descripcionCorta} />
                <meta name="language" content="es" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="image" content={`https://www.ucasal.edu.ar/landing/ingreso/public/${carrera.codcar}.jpg`} />
                <meta httpEquiv="Content-language" content="es" />
                <meta name="author" content="Universidad Católica de Salta - UCASAL" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <meta property="og:title" content={carrera.nombre + " - UCASAL"} />
                <meta property="og:description" content={carrera.descripcionCorta} />
                <meta property="og:site_name" content="UCASAL - Universidad Católica de Salta" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://www.ucasal.edu.ar/landing/ingreso/public/${carrera.codcar}.jpg`} />
                <meta property="og:url" content={`https://www.ucasal.edu.ar/landing/ingreso/carreras/${carrera.codcar}`} />
                <meta property="og:locale" content="es_AR" />
            </Helmet>
            {/* ── HERO DE LA CARRERA ── */}
            <section className="w-full min-h-full flex items-center pt-4 px-4 contenedor">
                <div className="w-full h-[500px] sm:h-[600px] bg-(--azul-ucasal) px-6 py-12 sm:p-12 rounded-2xl relative">
                    <div className={`flex flex-col h-full sm:flex-row gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-center justify-center relative z-10  w-full sm:w-[60%]`}>
                        <div className={`flex flex-col gap-3 text-black flex-1 h-full ${titulo.length <= 3 ? 'justify-center max-sm:mb-12' : 'justify-start'} sm:justify-center max-sm:text-center`}>
                            <h1 className={`${tituloClase} font-extrabold leading-10 sm:leading-none tracking-tight uppercase text-white`}>
                                {carrera.nombre}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs sm:text-sm text-white/70 bg-(--rojo-ucasal) max-sm:mx-auto w-fit px-2 sm:px-3 py-1.5 rounded-lg">
                                <span className="flex items-center gap-1 sm:gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {carrera.duracion}
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
                            <source media="(min-width: 769px)" srcSet="/desktop.webp" />
                            <source media="(max-width: 768px)" srcSet="/mobile.webp" />
                            <img
                                src="/Encabezado Desktop.jpg"
                                /* src={`/${carrera.codcar}.png`} */
                                alt={carrera.nombre}
                                className="w-full h-full object-cover object-center"
                            />
                        </picture>
                    </div>
                </div>
            </section>

            <div className="contenedor py-10 flex flex-col lg:flex-row gap-10 items-start bg-white">

                {/* ── COLUMNA PRINCIPAL ── */}
                <div className="flex flex-col gap-10 w-full lg:w-2/3">

                    {/* Descripción larga */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl md:text-3xl font-black degrade-azul">Sobre la carrera</h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {carrera.descripcionLarga}
                        </p>
                    </div>

                    {/* Perfil del egresado */}
                    <div className="flex flex-col gap-3 bg-(--azul-ucasal)/5 border border-(--azul-ucasal)/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-(--azul-ucasal) flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-black degrade-azul">Perfil del egresado</h2>
                        </div>
                        {carrera.perfilEgresado && typeof carrera.perfilEgresado === 'object' ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-700 font-medium text-base">{carrera.perfilEgresado.titulo}:</p>
                                <ul className="flex flex-col gap-1.5 mt-1">
                                    {carrera.perfilEgresado.items.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 text-base">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-(--azul-ucasal) shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-600 leading-relaxed text-base">{carrera.perfilEgresado as string}</p>
                        )}
                    </div>

                    {/* Botón plan de estudios */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="boton-cta flex items-center gap-2"
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
                            className="bg-transparent text-(--azul-ucasal) font-bold text-sm px-6 py-3 rounded-full border-2 border-(--azul-ucasal) transition-all hover:bg-(--azul-ucasal) hover:text-white flex items-center gap-2"
                        >
                            Inscribirme ahora
                        </a>
                    </div>

                    {/* ── SECCIÓN EXTRA: Por qué estudiar acá ── */}
                    <div className="flex flex-col gap-4 border-t border-gray-100 pt-8">
                        <h2 className="text-2xl md:text-3xl font-black degrade-azul">¿Por qué estudiar en UCASAL?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { titulo: "+60 años formando profesionales", desc: "Una institución con historia, respaldada por la Iglesia Católica y reconocida en todo el país.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                                { titulo: "Campus virtual 24/7", desc: "Accedé a clases, materiales y docentes en cualquier momento, desde cualquier dispositivo.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                                { titulo: "Título oficial y validado", desc: "El diploma tiene validez nacional, reconocido por el Ministerio de Educación de la Nación.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                                { titulo: "Acompañamiento personalizado", desc: "Tutores y asesores disponibles para guiarte durante toda tu carrera, sin que te sientas solo.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-(--azul-ucasal)/5 border border-(--azul-ucasal)/10 hover:border-(--azul-ucasal)/30 transition-colors">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-(--rojo-ucasal) flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-(--azul-ucasal)">{item.titulo}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── FORMULARIO LATERAL ── */}
                <aside className="w-full lg:w-1/3 lg:sticky lg:top-24">
                    <div className="bg-(--azul-ucasal)/5 border-2 border-(--azul-ucasal)/20 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                        <div>
                            <h3 className="text-xl font-black degrade-azul">¿Te interesa esta carrera?</h3>
                            <p className="text-sm text-gray-500 mt-1">Dejanos tus datos y un asesor te contacta.</p>
                        </div>

                        <form
                            className="flex flex-col gap-4"
                            onSubmit={(e) => { e.preventDefault(); alert("Formulario enviado (placeholder)") }}
                        >
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Nombre completo</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Juan Pérez"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-(--azul-ucasal) transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</label>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-(--azul-ucasal) transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Teléfono</label>
                                <input
                                    type="tel"
                                    placeholder="+54 9 11 1234-5678"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-(--azul-ucasal) transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Consulta (opcional)</label>
                                <textarea
                                    placeholder="¿Tenés alguna duda sobre la carrera?"
                                    rows={3}
                                    value={formData.consulta}
                                    onChange={(e) => setFormData({ ...formData, consulta: e.target.value })}
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-(--azul-ucasal) transition-colors resize-none"
                                />
                            </div>
                            <button type="submit" className="boton-cta w-full justify-center">
                                Quiero que me contacten
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center">
                            Tu información es confidencial y no será compartida.
                        </p>
                    </div>
                </aside>
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
                                <p className="text-xs text-gray-500">{carrera.nombre} · {carrera.duracion}</p>
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
                        <div className={`px-6 py-5 grid gap-6 ${carrera.planEstudios.length % 2 === 1 ? 'md:grid-cols-2 [&>*:last-child]:md:col-span-2 [&>*:last-child]:md:max-w-md [&>*:last-child]:md:mx-auto' : 'md:grid-cols-2'}`}>
                            {carrera.planEstudios.map((sem, i) => (
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

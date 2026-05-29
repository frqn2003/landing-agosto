import { useRef, useState } from 'react'
import { useCarrerasCascada } from '../../hooks/useCarrerasCascada'
import dataCarreras from '../../data/carreras'
import { clarityEvent, clarityUpgrade } from '../../lib/clarity'

const WHATSAPP_PHONE = '5493872589770'

export default function FormWhatsApp({ codcarInicial, onSubPage }: { codcarInicial?: string, onSubPage?: boolean }) {
    const divRef = useRef<HTMLDivElement>(null)

    const [modalOpen, setModalOpen] = useState(false)

    const {
        containerRef,
        apiCargando,
        codcar,
        modalidad,
        idProvincia,
        idSede,
        carrerasUnicas,
        modos,
        provincias,
        sedes,
        sedesOficiales,
        tieneHome,
        sedesHome,
        carreraCompleta,
        seleccionarCodcar,
        seleccionarModalidad,
        seleccionarProvincia,
        seleccionarSede,
    } = useCarrerasCascada({ codcarInicial, onSubPage })

    /* Sincronizar containerRef del hook con el div contenedor */
    const setContainerRef = (el: HTMLDivElement | null) => {
        (divRef as React.RefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.RefObject<HTMLElement | null>).current = el
    }

    const claseBorde = (habilitado: boolean, completado: boolean) => {
        if (completado) return 'border-green-500'
        if (habilitado) return 'border-blue-500'
        return 'border-gray-300'
    }

    function abrirWhatsApp() {
        const nombreCarrera = dataCarreras.find(c => String(c.codcar) === codcar)?.nombre ?? codcar
        const nombreModalidad = modalidad === '7' ? 'Online' : 'Presencial'
        const nombreProvincia = provincias.find((p: any) => String(p.id_provincia) === idProvincia)?.nombre_provincia ?? idProvincia
        const nombreSede = sedes.find((s: any) => String(s.id_sede) === idSede)?.nombre_sede ?? idSede

        const mensaje = `Hola, quiero más información sobre:\n- Carrera: ${nombreCarrera}\n- Modalidad: ${nombreModalidad}\n- Provincia: ${nombreProvincia}\n- Sede: ${nombreSede}`
        const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div ref={setContainerRef} className={`bg-white rounded-lg shadow-2xl ${onSubPage ? 'px-6 py-4' : 'p-6'}`}>
            {!onSubPage && (
                <div className="flex justify-center items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12.05.02C5.495.02.02 5.495.02 12.05c0 2.12.553 4.107 1.518 5.835L.02 23.98l6.266-1.501A11.98 11.98 0 0012.05 24c6.555 0 12.03-5.475 12.03-12.03S18.605.02 12.05.02zm0 21.87a9.847 9.847 0 01-5.031-1.378l-.361-.214-3.741.896.952-3.638-.235-.374A9.826 9.826 0 012.19 12.05c0-5.44 4.421-9.861 9.86-9.861 5.44 0 9.861 4.421 9.861 9.861 0 5.44-4.421 9.86-9.861 9.86z" />
                    </svg>
                    <p className="text-xl my-2 text-black font-bold" style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Consultá por WhatsApp
                    </p>
                </div>
            )}

            <div className={`${onSubPage ? 'flex flex-col gap-2 py-2' : 'grid grid-cols-2 gap-6 py-4'}`}>
                <div className="relative z-0 w-full group">
                    <select
                        aria-label="Seleccionar Carrera"
                        className={`${claseBorde(true, !!codcar)} block w-full mt-1 p-2 border bg-white shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900 ${codcarInicial ? 'opacity-75 cursor-not-allowed bg-gray-50' : ''}`}
                        disabled={!!codcarInicial}
                        value={codcar}
                        onChange={e => seleccionarCodcar(e.target.value)}
                    >
                        <option value="">Seleccionar Carrera</option>
                        {carrerasUnicas.map((c) => (
                            <option key={c.codcar} value={c.codcar}>{c.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="relative z-0 w-full group">
                    <select
                        aria-label="Seleccionar Modalidad"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar, !!modalidad)}
                            ${!codcar ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}
                        `}
                        value={modalidad}
                        onChange={e => seleccionarModalidad(e.target.value)}
                        disabled={!codcar}
                    >
                        <option value="" disabled>Seleccionar Modalidad</option>
                        {modos.map((m) => (
                            <option key={m.modalidad} value={m.modalidad}>{m.modalidad === 7 ? 'Online' : 'Presencial'}</option>
                        ))}
                    </select>
                </div>

                <div className="relative z-0 w-full group">
                    <select
                        aria-label="Seleccionar Provincia"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar && !!modalidad, !!idProvincia)}
                            ${!codcar || !modalidad ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}
                        `}
                        value={idProvincia}
                        onChange={e => seleccionarProvincia(e.target.value)}
                        disabled={!codcar || !modalidad}
                    >
                        {apiCargando && codcar && modalidad
                            ? <option value="" disabled>Cargando provincias...</option>
                            : <option value="" disabled>Seleccionar Provincia</option>
                        }
                        {provincias.map((p: { id_provincia: string; nombre_provincia: string }) => (
                            <option key={p.id_provincia} value={p.id_provincia}>{p.nombre_provincia}</option>
                        ))}
                    </select>
                </div>

                <div className="relative z-0 w-full group">
                    <select
                        aria-label="Seleccionar Sede"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar && !!modalidad && !!idProvincia, !!idSede)}
                            ${!codcar || !modalidad || !idProvincia ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}
                        `}
                        value={idSede}
                        onChange={e => seleccionarSede(e.target.value)}
                        disabled={!codcar || !modalidad || !idProvincia}
                    >
                        {apiCargando && codcar && modalidad && idProvincia
                            ? <option value="" disabled>Cargando sedes...</option>
                            : <option value="" disabled>Seleccionar Sede</option>
                        }
                        {sedesOficiales.length > 0 && (
                            <optgroup label="Sedes disponibles">
                                {sedesOficiales.map((s: { id_sede: string; nombre_sede: string }) => (
                                    <option key={s.id_sede} value={s.id_sede}>{s.nombre_sede}</option>
                                ))}
                            </optgroup>
                        )}
                        {tieneHome && (
                            <optgroup label="Sin sede cerca (Home)">
                                {sedesHome.map((s: { id_sede: string; nombre_sede: string }) => (
                                    <option key={s.id_sede} value="500">{s.nombre_sede}</option>
                                ))}
                            </optgroup>
                        )}
                    </select>
                </div>
            </div>
            <p className="text-[10px] md:text-xs mt-1 inline-block text-gray-600">
                Al enviar este formulario, aceptás nuestros <button onClick={() => setModalOpen(true)} className="inline-block text-blue-500 cursor-pointer" type="button"> T&eacute;rminos y Condiciones de Privacidad</button> y autorizás a UCASAL a utilizar tus datos para contactarte y brindarte información sobre carreras y propuestas académicas.
            </p>
            {
                modalOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/50 transition-opacity" role="presentation"></div>

                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <div
                                className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full max-h-[70vh] flex flex-col animate-scale-up">

                                <div
                                    className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                            </path>
                                        </svg>
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            T&eacute;rminos y Condiciones de Privacidad
                                        </h2>
                                    </div>
                                    <button onClick={() => setModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100" type="button">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex-1 p-3 md:p-6 overflow-hidden">
                                    <div className="bg-gray-50 rounded-lg p-2 md:p-4 h-full relative">
                                        <iframe
                                            src="https://www.ucasal.edu.ar/wp-content/uploads/2023/10/Politicas-de-Privacidad-UCASAL-1.pdf#view=FitH"
                                            className="w-full h-full rounded-lg border border-gray-300 shadow-inner"
                                            title="Términos y Condiciones de Privacidad" frameBorder={0}></iframe>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                    <div className="flex justify-center">
                                        <button onClick={() => setModalOpen(false)}
                                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg" type="button">
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex justify-center items-center text-center mt-6">
                <button className='uki-bot relative w-fit mx-auto items-center justify-center h-16 cursor-pointer group' type="button" onClick={() => {
                    abrirWhatsApp();
                    clarityEvent('formulario-enviado-whatsapp')
                    clarityUpgrade('conversion-whatsapp')
                }} 
                disabled={!carreraCompleta}
                id='uki-bot'
                >
                    <div className='uki-bot absolute group -left-10 md:-left-6 top-0 z-20 group-hover:scale-110 transition-transform duration-800 group-hover:translate-x-62 md:group-hover:translate-x-75'>
                        <img src={`https://ucasal.edu.ar/landing/ingreso/public/bot.jpeg`} className="w-16 h-16 rounded-full border border-green-300 group-hover:border-green-500 group-hover:ring-2 group-hover:ring-green-300/40" alt="WhatsApp Chatbot" />
                    </div>
                    <div className='uki-bot inline-flex botoncito text-sm md:text-base items-center gap-2 px-6 md:px-12 py-3.5 rounded-2xl border-2 border-green-300 text-black font-bold transition-all duration-300 cursor-pointer' style={{ '--botoncito-bg': 'var(--color-green-300)', '--botoncito-bg-secondary': 'var(--color-green-700)', '--botoncito-opacity': '1' } as React.CSSProperties}>
                        Hablar con el ChatBot UKI
                    </div>
                </button>
            </div>
        </div>
    )
}

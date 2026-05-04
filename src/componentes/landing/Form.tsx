import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCarrerasApi } from '../../data/carrerasApi'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import Clarity from '@microsoft/clarity'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "../../lib/schemas"

const TKP_MAP: Record<string, string> = {
    '9': 'enviado-sec-ejecutivo',
    '10': 'enviado-lic-economia-distancia',
    '11': 'enviado-administracion',
    '14': 'enviado-contador',
    '15': 'enviado-comercializacion',
    '16': 'enviado-abogacia',
    '58': 'enviado-licenciatura-ciencias-datos',
    '96': 'enviado-tec-gestion-calidad-distancia',
    '133': 'enviado-lic-administracion-agropecuaria-distancia',
    '138': 'enviado-lic-higiene-y-seguridad-trabajo-distancia',
    '161': 'enviado-tecnicatura-gestion-bancos-finanzas-seguros',
    '175': 'enviado-guia-universitaria-turismo-distancia',
    '196': 'enviado-seguridad',
    '214': 'enviado-comercio-internacional-distancia',
    '244': 'enviado-martillero',
    '250': 'enviado-licenciatura-administracion-negocios-digitales-distancia',
    '336': 'enviado-rrhh',
    '355': 'enviado-escribania-distancia',
    '360': 'enviado-tec-seguridad-informatica',
    '363': 'enviado-procuracion-distancia',
    '378': 'enviado-organizacion-direccion-eventos-ceremonial',
    '383': 'enviado-tecnicatura-operaciones-mineras',
}

const BASE_URL = 'https://www.ucasal.edu.ar/landing/ingreso/carreras-agosto/'

export default function Form({ codcarInicial, onSubPage }: { codcarInicial?: string, onSubPage?: boolean }) {
    const navigate = useNavigate()
    const [carreras, setCarreras] = useState<any[]>([])
    const [modalidad, setModalidad] = useState("")
    const [codcar, setCodcar] = useState(codcarInicial ?? '')
    const [idProvincia, setIdProvincia] = useState('')
    const [idSede, setIdSede] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitted }, watch, setValue } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cbx_carrera: codcarInicial ?? '',
        }
    })
    const nombre = watch('nombre')
    const email = watch('email')
    const codArea = watch('cod_area')
    const tel = watch('tel')
    const [enviando, setEnviando] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const [ddiPais, setDdiPais] = useState('')
    const phoneRef = useRef<HTMLInputElement>(null)
    const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null)
    const urlParametros = new URLSearchParams(window.location.search)
    const parametros = {
        utm_source: urlParametros.get('utm_source'),
        utm_medium: urlParametros.get('utm_medium'),
        utm_campaign: urlParametros.get('utm_campaign'),
        utm_term: urlParametros.get('utm_term'),
        utm_content: urlParametros.get('utm_content'),
        idconversion: urlParametros.get('id_conversion'),
        campaignid: urlParametros.get('campaignid'),
        userAgent: navigator.userAgent
    }
    useEffect(() => {
        getCarrerasApi().then(setCarreras).catch(() => setCarreras([]))
    }, [])

    const carrerasUnicas = [...new Map(carreras.map(c => [c.codcar, c])).values()]
    const modos = carreras.filter(c => String(c.codcar) === codcar)

    const carreraSeleccionada = carreras.find(c => String(c.codcar) === codcar && String(c.modo) === modalidad)
    const provincias: any[] = [
        ...new Map(
            (carreraSeleccionada?.provincias || [])
                .filter((prov: any) => prov.id_provincia != null)
                .map((prov: any) => [prov.id_provincia, prov])
        ).values()
    ]
    const todasLasSedes = (carreraSeleccionada?.provincias || [])
        .filter((sede: any) => String(sede.id_provincia) === idProvincia)
    const sedesOficiales = todasLasSedes.filter((s: any) => s.id_sede !== 500)
    const tieneHome = todasLasSedes.some((s: any) => s.id_sede === 500)
    const sedesHome = todasLasSedes.filter((s: any) => s.id_sede === 500)
    const sedes = todasLasSedes

    {/* Helper de estado visual */ }
    const claseBorde = (habilitado: boolean, completado: boolean) => {
        if (completado) return 'border-green-500'
        if (isSubmitted && !completado) return 'border-red-500'
        if (habilitado) return 'border-blue-500'
        return 'border-gray-300'
    }

    const carreraCompleta = !!codcar && !!modalidad && !!idProvincia && !!idSede
    const todosCompletos = !!carreraCompleta && !!nombre && !!email && !!ddiPais && !!codArea && !!tel

    useEffect(() => {
        if (phoneRef.current) {
            itiRef.current = intlTelInput(phoneRef.current, {
                initialCountry: 'ar',
                separateDialCode: true,
                autoPlaceholder: 'off',
                loadUtils: () => import('intl-tel-input/utils'),
            })
            const updateDialCode = () => {
                const dialCode = itiRef.current?.getSelectedCountryData().dialCode ?? ''
                setDdiPais(dialCode)
            }
            updateDialCode()
            phoneRef.current.addEventListener('countrychange', updateDialCode)
            phoneRef.current.addEventListener('input', updateDialCode)
        }
        return () => itiRef.current?.destroy()
    }, [])

    useEffect(() => {
        if (codcar && modos.length === 1) {
            const v = String(modos[0].modo)
            setModalidad(v)
            setValue('cbx_modo', v, { shouldValidate: true })
            setIdProvincia('')
            setIdSede('')
        }
    }, [codcar, carreras])

    useEffect(() => {
        if (provincias.length === 1) {
            const v = String(provincias[0].id_provincia)
            setIdProvincia(v)
            setValue('cbx_provincia', v, { shouldValidate: true })
            setIdSede('')
        }
    }, [modalidad, carreras])

    useEffect(() => {
        if (sedes.length === 1) {
            const v = String(sedes[0].id_sede)
            setIdSede(v)
            setValue('cbx_sede', v, { shouldValidate: true })
        }
    }, [idProvincia])
    return (
        <form role="form" id="pedidoinfo" method="post" encType="multipart/form-data" action="/postulantes_mail1.php"
            autoComplete="on"
            onSubmit={handleSubmit(
                async () => {
                    setEnviando(true)
                    let recaptchaToken = '';
                    try {
                        recaptchaToken = await new Promise((resolve, reject) => {
                            (window as any).grecaptcha.ready(function () {
                                (window as any).grecaptcha
                                    .execute('6LfSBnAsAAAAANxuGFb77-exJXGHRWQGrCsGZMnr', { action: 'submit' })
                                    .then(resolve)
                                    .catch(reject);
                            });
                        });
                    } catch (e) {
                        console.error('Error obteniendo token reCAPTCHA:', e)
                    }
                    (document.getElementById('g-recaptcha-response') as HTMLInputElement).value = recaptchaToken

                    const formEl = document.getElementById('pedidoinfo') as HTMLFormElement
                    const formData = new FormData(formEl)

                    await fetch('/postulantes_mail1.php', { method: 'POST', body: formData })

                        ; (window as any).dataLayer?.push({ event: 'form_enviado_landings', form_id: 'pedidoinfo' })
                    Clarity.event('formulario-enviado')
                    Clarity.upgrade('conversion-formulario')
                    const tkpSlug = onSubPage ? (TKP_MAP[codcar] ?? null) : null
                    const tkpPath = tkpSlug ?? 'enviado-agosto'
                    navigate('/' + tkpPath, {
                        state: {
                            nombre,
                            email,
                            carrera: carreraSeleccionada?.nombre_carrera ?? '',
                            modalidad: carreraSeleccionada?.modo === 7 ? 'Online' : 'Presencial',
                            sede: sedes.find((s: any) => String(s.id_sede) === idSede)?.nombre_sede ?? '',
                        }
                    })
                },
                (_errors) => {
                    Clarity.event('formulario-invalido')
                })}
            className={`bg-white rounded-lg shadow-2xl ${onSubPage ? 'px-6 py-4' : 'p-6'}`}>
            <input type="hidden" value="103" name="id_origen" />
            <input type="hidden" value="postulantes" name="tabla" />
            <input type="hidden" id="agent" name="agent" value={parametros.userAgent || ''} />
            <input type="hidden" name="utm_source" value={parametros.utm_source || ''} />
            <input type="hidden" name="utm_medium" value={parametros.utm_medium || ''} />
            <input type="hidden" name="utm_term" value={parametros.utm_term || ''} />
            <input type="hidden" name="utm_content" value={parametros.utm_content || ''} />
            <input type="hidden" name="utm_campaign" value={parametros.utm_campaign || ''} />
            <input type="hidden" name="idconversion" value={parametros.idconversion || ''} />
            <input type="hidden" name="campaignid" value={parametros.campaignid || ''} />
            <input type="hidden" name="tkp" value={`${BASE_URL}${onSubPage && TKP_MAP[codcar] ? TKP_MAP[codcar] : 'enviado-agosto'}`} />
            <input type="hidden" name="fkp" value={`${BASE_URL}${onSubPage && TKP_MAP[codcar] ? TKP_MAP[codcar] : 'enviado-agosto'}?id=404`} />
            {!onSubPage && (
                <div className="flex justify-center">
                    <p className="text-xl my-2 text-black degrade-azul font-bold">
                        Consulta sobre nuestras carreras y sus aranceles
                    </p>
                </div>
            )}
            <div className={`${onSubPage ? 'flex flex-col gap-2 py-2' : 'grid grid-cols-2 gap-6 py-4'} border-b border-black/40`}>
                <div className="relative z-0 w-full group">
                    {!!codcarInicial && <input type="hidden" name="cbx_carrera" value={codcar} />}
                    <select name={codcarInicial ? undefined : "cbx_carrera"} id="cbx_carrera" aria-label="Seleccionar Carrera"
                        className={`${claseBorde(true, !!codcar)} block w-full mt-1 p-2 border bg-white shadow-sm dark:bg-white dark:text-dark dark:focus:ring-blue-500 focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900 ${codcarInicial ? 'opacity-75 cursor-not-allowed bg-gray-50' : ''}`}
                        required
                        disabled={!!codcarInicial}
                        value={codcar} onChange={e => {
                            setValue('cbx_carrera', e.target.value, { shouldValidate: true })
                            setCodcar(e.target.value)
                            setModalidad('')
                            setIdProvincia('')
                            setIdSede('')
                        }}
                    >
                        <option value="" defaultValue={'Seleccionar Carrera'}>Seleccionar Carrera</option>
                        {carrerasUnicas.map((c) => (
                            <option key={c.codcar} value={c.codcar}>{c.nombre_carrera}</option>
                        ))}
                    </select>
                </div>
                <div className="relative z-0 w-full group">
                    <select name="modo" id="cbx_modo" aria-label="Seleccionar Modalidad"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar, !!modalidad)}
                            ${!codcar ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white '}
                        `}
                        value={modalidad}
                        onChange={e => {
                            setValue('cbx_modo', e.target.value, { shouldValidate: true })
                            setModalidad(e.target.value)
                            setIdProvincia('')
                            setIdSede('')
                        }}
                        disabled={!codcar}
                        required>
                        <option value="" disabled defaultValue={'Seleccionar Modalidad'}>Seleccionar Modalidad</option>
                        {modos.map((m) => (
                            <option key={m.modo} value={m.modo}>{m.modo === 7 ? 'Online' : 'Presencial'}</option>
                        ))}
                    </select>
                </div>
                <div className="relative z-0 w-full group">
                    <select name="cbx_provincia" id="cbx_provincia" aria-label="Seleccionar Provincia"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar && !!modalidad, !!idProvincia)}
                            ${!codcar || !modalidad ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white '}
                        `}
                        value={idProvincia}
                        onChange={e => {
                            setValue('cbx_provincia', e.target.value, { shouldValidate: true })
                            setIdProvincia(e.target.value)
                            setIdSede('')
                        }}
                        required
                        disabled={!codcar || !modalidad}
                    >
                        <option value="" disabled defaultValue={'Seleccionar Provincia'}>Seleccionar Provincia</option>
                        {provincias.map((p: any) => (
                            <option key={p.id_provincia} value={p.id_provincia}>{p.nombre_provincia}</option>
                        ))}
                    </select>
                </div>
                <div className="relative z-0 w-full group">
                    <select name="cbx_sede" id="cbx_sede" aria-label="Seleccionar Sede"
                        className={`block w-full mt-1 p-2 border shadow-sm focus:outline-none text-xs sm:text-sm [&>option]:text-gray-900
                            ${claseBorde(!!codcar && !!modalidad && !!idProvincia, !!idSede)}
                            ${!codcar || !modalidad || !idProvincia ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white '}
                        `}
                        value={idSede}
                        onChange={e => {
                            setValue('cbx_sede', e.target.value, { shouldValidate: true })
                            setIdSede(e.target.value)
                        }}
                        required
                        disabled={!codcar || !modalidad || !idProvincia}>
                        <option value="" disabled defaultValue={'Seleccionar Sede'}>Seleccionar Sede</option>
                        {sedesOficiales.length > 0 && (
                            <optgroup label="Sedes disponibles">
                                {sedesOficiales.map((s: any) => (
                                    <option key={s.id_sede} value={s.id_sede}>{s.nombre_sede}</option>
                                ))}
                            </optgroup>
                        )}
                        {tieneHome && (
                            <optgroup label="Sin sede cerca (Home)">
                                {sedesHome.map((s: any) => (
                                    <option value="500"> {s.nombre_sede}</option>
                                ))}
                            </optgroup>
                        )}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4" id="datosPersonales">

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 `}>
                    <div className={`relative z-0 w-full mb-1 group transition-all ease-in-out duration-150 ${carreraCompleta ? 'bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75 z-10 pointer-events-none'}`}>
                        <input type="text" {...register("nombre")} id="nombre"
                            className={`block w-full p-2 text-sm text-gray-900 bg-transparent border rounded-md appearance-none focus:outline-none focus:ring-0 peer ${claseBorde(carreraCompleta, !!nombre && !errors.nombre)}`}
                            placeholder=" " required
                            autoComplete="name"
                            aria-invalid={!!errors.nombre}
                            aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                        />
                        {errors.nombre && (
                            <p id="error-nombre" className="text-red-500 text-xs mt-1" role="alert">{errors.nombre.message}</p>
                        )}
                        <label htmlFor="nombre"
                            className={`absolute text-xs 2xl:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-1 px-1 2xl:px-2 peer-focus:px-2 peer-focus:text-var(--azul-ucasal) peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${codcar && modalidad && idProvincia && idSede ? 'peer-focus:bg-white bg-white' : 'peer-focus:bg-gray-100 bg-gray-100'}`}>Nombre Completo</label>
                    </div>
                    <div className={`relative z-0 w-full mb-1 group transition-all ease-in-out duration-150 ${carreraCompleta ? 'bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75 z-10 pointer-events-none'}`}>
                        <input type="email" id="email"
                            className={`block w-full p-2 text-sm text-gray-900 bg-transparent border rounded-md appearance-none focus:outline-none focus:ring-0 peer ${claseBorde(carreraCompleta, !!email && !errors.email)}`}
                            placeholder=" " required
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'error-email' : undefined}
                            {...register('email')} />
                        {errors.email && (
                            <p id="error-email" className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>
                        )}
                        <label htmlFor="email"
                            className={`absolute text-xs 2xl:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-1 px-1 2xl:px-2 peer-focus:px-2 peer-focus:text-var(--azul-ucasal) peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${codcar && modalidad && idProvincia && idSede ? 'peer-focus:bg-white bg-white' : 'peer-focus:bg-gray-100 bg-gray-100'}`}>Email</label>
                    </div>
                </div>

                <div className={`grid grid-cols-2 sm:flex sm:flex-row mt-2 gap-2 sm:gap-4 pb-4`}>
                    <div className={`relative z-0 mb-1 group transition-all ease-in-out duration-150 ${codcar && modalidad && idProvincia && idSede ? 'bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75 pointer-events-none'}`}>
                        <div className="relative w-full group">
                            <input name="tipo_tel" type="hidden" value="cel" />
                            <input type="hidden" name="ddi_pais" value={ddiPais} />
                            <input type="tel" ref={phoneRef} id="phone" autoComplete="off"
                                className="block w-full p-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 caret-transparent"
                                onKeyDown={e => e.preventDefault()}
                                onPaste={e => e.preventDefault()}
                                onDrop={e => e.preventDefault()} />
                            <label htmlFor="tipo_tel" className="absolute text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-1 z-10 origin-left bg-white px-2">Código país</label>
                        </div>
                    </div>

                    <div className={`relative z-0 mb-1 group transition-all ease-in-out duration-150 sm:w-1/3 w-full ${codcar && modalidad && idProvincia && idSede ? 'bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75 z-10 pointer-events-none'}`}>
                        <div className="relative w-full group">
                            <input type="tel" id="cod" size={4} maxLength={4} pattern="[0-9]*" inputMode="numeric"
                                className={`block w-full p-2 text-sm text-gray-900 bg-transparent border rounded-md appearance-none focus:outline-none focus:ring-0 peer ${claseBorde(carreraCompleta, !!codArea && !errors.cod_area)}`}
                                placeholder="" required
                                autoComplete="tel-area-code"
                                aria-invalid={!!errors.cod_area}
                                aria-describedby={errors.cod_area ? 'error-cod_area' : undefined}
                                {...register('cod_area')} />
                            {errors.cod_area && (
                                <p id="error-cod_area" className="text-red-500 text-xs mt-1" role="alert">{errors.cod_area.message}</p>
                            )}
                            <label htmlFor="cod"
                                className={`absolute text-xs 2xl:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-1 px-1 2xl:px-2 peer-focus:px-2 peer-focus:text-var(--azul-ucasal) peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${codcar && modalidad && idProvincia && idSede ? 'peer-focus:bg-white bg-white' : 'peer-focus:bg-gray-100 bg-gray-100'}`}
                            >
                                Código
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row col-span-2 gap-2 w-full">
                        <span className="text-[0.8rem] text-gray-700 px-1 border border-gray-500 flex justify-center items-center my-auto w-fit h-fit back rounded">15</span>
                        <div className={`relative z-0 w-full mb-1 group transition-all ease-in-out duration-150 ${codcar && modalidad && idProvincia && idSede ? 'bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75 z-10 pointer-events-none max-sm:flex-1'}`}>
                            <div className="relative">
                                <input type="tel" id="tel" size={8} maxLength={8} inputMode="numeric" pattern="[0-9]+"
                                    className={`block w-full p-2 text-sm text-gray-900 bg-transparent border rounded-md appearance-none focus:outline-none focus:ring-0 peer ${claseBorde(carreraCompleta, !!tel && !errors.tel)}`}
                                    placeholder="" required tabIndex={6}
                                    autoComplete="tel-local"
                                    aria-invalid={!!errors.tel}
                                    aria-describedby={errors.tel ? 'error-tel' : undefined}
                                    {...register('tel')} />
                                {errors.tel && (
                                    <p id="error-tel" className="text-red-500 text-xs mt-1" role="alert">{errors.tel.message}</p>
                                )}
                                <label htmlFor="tel"
                                    className={`absolute text-xs 2xl:text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left left-1 px-1 2xl:px-2 peer-focus:px-2 peer-focus:text-var(--azul-ucasal) peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${codcar && modalidad && idProvincia && idSede ? 'peer-focus:bg-white bg-white' : 'peer-focus:bg-gray-100 bg-gray-100'}`}>
                                    Número
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-[10px] md:text-xs mt-1 inline-block text-gray-600">
                Al enviar este formulario, aceptás nuestros <button onClick={() => setModalOpen(true)} className="inline-block text-blue-500 cursor-pointer" type="button"> T&eacute;rminos y Condiciones de Privacidad</button> y autorizás a UCASAL a utilizar tus datos para contactarte y brindarte información sobre carreras y propuestas académicas.
            </p>
            {
                modalOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/50 transition-opacity"></div>

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
                                        <h2 className="text-2xl font-bold text-gray-900">
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
            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
            <input type="hidden" id="fecha_formulario" name="fecha_formulario" />
            <div className="flex justify-center mt-4">
                <div className={`animated-border`}
                    style={{ "--ab-thickness": "4px", "--ab-radius": "0.5rem", ...(enviando ? { display: 'none' } : {}) } as React.CSSProperties}>
                    <button id="formButton" type="submit"
                        disabled={!todosCompletos}
                        className={`ab-inner font-medium text-sm px-5 py-2.5 text-center transition-colors duration-200 ease-in-out scale-105 ${todosCompletos ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        tabIndex={11}>
                        Enviar
                    </button>
                </div>
                <div id="spinnerContainer" className={enviando ? '' : 'hidden'} role="status">
                    <svg className="w-8 h-8 text-gray-200 animate-spin fill-[#B11111]" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </form >
    )
}
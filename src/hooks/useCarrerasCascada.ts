import { useEffect, useRef, useState } from 'react'
import { getCarrerasApi, getCarreraApi } from '../data/carrerasApi'
import dataCarreras from '../data/carreras'

const FALLBACK_CARRERAS: any[] = [
    {
        codcar: 57,
        modo: 1,
        provincias: [
            { id_provincia: 16, nombre_provincia: 'CASTAÑARES', id_sede: 1, nombre_sede: 'SALTA (Presencial)' }
        ]
    }
]

function getSedeValue(sede: any) {
    return `${sede.id_provincia}|${sede.id_sede}|${sede.nombre_sede}`
}

export interface UseCarrerasCascadaOptions {
    codcarInicial?: string
    onSubPage?: boolean
    /** Callback llamado cuando se auto-selecciona la modalidad (para sincronizar react-hook-form) */
    onModalidadChange?: (value: string) => void
    /** Callback llamado cuando se auto-selecciona la provincia */
    onProvinciaChange?: (value: string) => void
    /** Callback llamado cuando se auto-selecciona la sede */
    onSedeChange?: (value: string) => void
    /** Callback llamado cuando se pre-selecciona la carrera desde el evento global */
    onCodcarChange?: (value: string) => void
}

export function useCarrerasCascada({
    codcarInicial,
    onSubPage,
    onModalidadChange,
    onProvinciaChange,
    onSedeChange,
    onCodcarChange,
}: UseCarrerasCascadaOptions = {}) {
    const [carreras, setCarreras] = useState<any[]>([])
    const [apiCargando, setApiCargando] = useState(false)
    const [codcar, setCodcar] = useState(codcarInicial ?? '')
    const [modalidad, setModalidad] = useState('')
    const [idProvincia, setIdProvincia] = useState('')
    const [idSede, setIdSede] = useState('')

    const apiCargadaRef = useRef(false)
    const containerRef = useRef<HTMLElement>(null)

    function cargarApi() {
        if (apiCargadaRef.current) return
        apiCargadaRef.current = true
        setApiCargando(true)

        if (codcarInicial) {
            const modoInicial = String(dataCarreras.find(c => String(c.codcar) === codcarInicial)?.modalidad ?? 7)
            getCarreraApi(codcarInicial, modoInicial)
                .then(data => {
                    const resultado = data ? [data] : []
                    const merged = [...resultado]
                    FALLBACK_CARRERAS.forEach(fallback => {
                        const existe = resultado.some((c: any) => String(c.codcar) === String(fallback.codcar) && String(c.modo) === String(fallback.modo))
                        if (!existe) merged.push(fallback)
                    })
                    setCarreras(merged)
                    setApiCargando(false)
                })
                .catch(() => { setCarreras(FALLBACK_CARRERAS); setApiCargando(false) })
            return
        }

        getCarrerasApi().then(data => {
            const merged = [...data]
            FALLBACK_CARRERAS.forEach(fallback => {
                const existe = data.some((c: any) => String(c.codcar) === String(fallback.codcar) && String(c.modo) === String(fallback.modo))
                if (!existe) merged.push(fallback)
            })
            setCarreras(merged)
            setApiCargando(false)
        }).catch(() => { setCarreras(FALLBACK_CARRERAS); setApiCargando(false) })
    }

    /* Derivados */
    const carrerasUnicas = dataCarreras
    const modos = [
        ...new Map(
            dataCarreras
                .filter(c => String(c.codcar) === codcar)
                .map(c => [String(c.modalidad), c])
        ).values()
    ]
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
    const sedeSeleccionada = sedes.find((s: any) => getSedeValue(s) === idSede)
    const idSedeReal = sedeSeleccionada ? String(sedeSeleccionada.id_sede) : ''
    const carreraCompleta = !!codcar && !!modalidad && !!idProvincia && !!idSede

    /* Evento global preselect-carrera (solo en landing principal) */
    useEffect(() => {
        if (onSubPage) return
        const handler = (e: Event) => {
            const { codcar: cod } = (e as CustomEvent).detail
            setCodcar(cod)
            onCodcarChange?.(cod)
        }
        window.addEventListener('preselect-carrera', handler)
        return () => window.removeEventListener('preselect-carrera', handler)
    }, [onSubPage])

    /* Lazy-load de la API al entrar en viewport */
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    cargarApi()
                    observer.disconnect()
                }
            },
            { rootMargin: '800px 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    /* Auto-selección en cascada */
    useEffect(() => {
        if (codcar && modos.length === 1) {
            const v = String(modos[0].modalidad)
            setModalidad(v)
            setIdProvincia('')
            setIdSede('')
            onModalidadChange?.(v)
        }
    }, [codcar])

    useEffect(() => {
        if (provincias.length === 1) {
            const v = String(provincias[0].id_provincia)
            setIdProvincia(v)
            setIdSede('')
            onProvinciaChange?.(v)
        }
    }, [modalidad, carreras])

    useEffect(() => {
        if (sedes.length === 1) {
            const v = getSedeValue(sedes[0])
            setIdSede(v)
            onSedeChange?.(String(sedes[0].id_sede))
        }
    }, [idProvincia, carreras])

    /* Setters que resetean la cascada descendente */
    function seleccionarCodcar(val: string) {
        setCodcar(val)
        setModalidad('')
        setIdProvincia('')
        setIdSede('')
    }

    function seleccionarModalidad(val: string) {
        setModalidad(val)
        setIdProvincia('')
        setIdSede('')
    }

    function seleccionarProvincia(val: string) {
        setIdProvincia(val)
        setIdSede('')
    }

    function seleccionarSede(val: string) {
        setIdSede(val)
        const sede = sedes.find((s: any) => getSedeValue(s) === val)
        onSedeChange?.(sede ? String(sede.id_sede) : '')
    }

    return {
        /* refs */
        containerRef,
        /* estado */
        carreras,
        apiCargando,
        codcar,
        modalidad,
        idProvincia,
        idSede,
        /* derivados */
        carrerasUnicas,
        modos,
        provincias,
        sedes,
        sedesOficiales,
        tieneHome,
        sedesHome,
        sedeSeleccionada,
        idSedeReal,
        getSedeValue,
        carreraCompleta,
        /* setters */
        seleccionarCodcar,
        seleccionarModalidad,
        seleccionarProvincia,
        seleccionarSede,
        setCodcar,
    }
}

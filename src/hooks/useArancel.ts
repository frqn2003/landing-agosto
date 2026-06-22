import { useEffect, useState } from 'react'


interface UseArancelOpciones {
    codcar: number | string,
    modalidad: number | string,
    idSede: number | string, 
    sector: number | string,
    enabled?: boolean
}

interface RespuestaArancel{
    valorMatricula: number,
    valorFinal: number,
    porcentaje: number,
    monto_pagar: number,    
    vencimiento: string,
    mesVencimiento: number,
    anio: number
}

interface UseArancelReturn {
    valorMatricula: number | null
    valorFinal: number | null
    porcentaje: number | null
    cargando: boolean
    error: string | null
    data: RespuestaArancel | null
}

const cacheAranceles = new Map<string, RespuestaArancel>()


export function useArancel({
    codcar,
    modalidad,
    idSede,
    sector,
    enabled = true,
}: UseArancelOpciones): UseArancelReturn {
    const [data, setData] = useState<RespuestaArancel | null>(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)
 
    useEffect(() => {
        if (!enabled || !codcar || !modalidad || !idSede || !sector) {
            setData(null)
            setCargando(false)
            setError(null)
            return
        }
 
        const key = `${codcar}|${modalidad}|${idSede}|${sector}`
        const cached = cacheAranceles.get(key)
 
        if (cached) {
            setData(cached)
            setCargando(false)
            setError(null)
            return
        }
 
        const controller = new AbortController()
        const params = new URLSearchParams({
            sede: String(idSede),
            sector: String(sector),
            carrera: String(codcar),
            modo: String(modalidad),
            concepto: '50',
        })
 
        setCargando(true)
        setError(null)
 
        fetch(`https://sistemasweb.ucasal.edu.ar/v1/boleta/get-amount-pay?tdocu=DNI-LE-LC&ndocu=11111111&${params.toString()}`, {
            signal: controller.signal,
        })
            .then(res => {
                if (!res.ok) throw new Error('No se pudo consultar el arancel')
                return res.json()
            })
            .then((response: RespuestaArancel) => {
                cacheAranceles.set(key, response)
                setData(response)
                setCargando(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') return
                setData(null)
                setError(err.message || 'No se pudo consultar el arancel')
                setCargando(false)
            })
 
        return () => controller.abort()
    }, [codcar, modalidad, idSede, sector, enabled])
 
    return {
        valorMatricula: data?.valorMatricula ?? null,
        valorFinal: data?.valorFinal ?? null,
        porcentaje: data?.porcentaje ?? null,
        cargando,
        error,
        data,
    }
}
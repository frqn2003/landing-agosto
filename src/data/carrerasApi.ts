import data from './carreras'

const modosUnicos = [...new Set(data.map(c => c.modalidad))]

let cache: any[] | null = null
let promesa: Promise<any[]> | null = null

/* const DEV_MODE = import.meta.env.DEV */

export function getCarrerasApi(): Promise<any[]> {
    if (cache) return Promise.resolve(cache)
    if (promesa) return promesa

    
    const stored = sessionStorage.getItem('cache_carreras_api_ucasal')
    if (stored) {
        cache = JSON.parse(stored)
        return Promise.resolve(cache as any[])
    }

    /* if (DEV_MODE) {
        promesa = fetch(`${import.meta.env.BASE_URL}mock-carreras.json`)
            .then(res => res.json())
            .then(data => {
                cache = data
                return cache as any[]
            })
        return promesa
    } */

    promesa = Promise.allSettled(
        modosUnicos.map(modo =>
            fetch(`/landing/consultas/getCarrerasJson.php?modo=${modo}&tipcar=Grado,Pregrado,Intermedio`)
                .then(res => res.json())
        )
    ).then(resultados => {
        cache = resultados
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => (r as PromiseFulfilledResult<any>).value)
        return cache as any[]
    })
    return promesa
}

/* Para las landings específicas se carga una sola vez el JSON con esa carrera específica */

const cacheIndividual: Record<string, any> = {}

export function getCarreraApi(codcar: string, modo: string): Promise<any> {
    const key = `${codcar}_${modo}`
    if (cacheIndividual[key]) return Promise.resolve(cacheIndividual[key])

    return fetch(`/landing/consultas/getCarrerasJson.php?modo=${modo}&codcar=${codcar}&tipcar=Grado,Pregrado,Intermedio`)
        .then(res => res.json())
        .then(data => {
            cacheIndividual[key] = data[0] ?? null
            return cacheIndividual[key]
        })
}
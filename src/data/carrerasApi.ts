import data from './carreras'

const combinaciones = data.map(c => ({ codcar: c.codcar, modo: c.modalidad }))
const combinacionesUnicas = combinaciones.filter(
    (c, i, arr) => arr.findIndex(x => x.codcar === c.codcar && x.modo === c.modo) === i
)

let cache: any[] | null = null
let promesa: Promise<any[]> | null = null

const DEV_MODE = import.meta.env.DEV

export function getCarrerasApi(): Promise<any[]> {
    if (cache) return Promise.resolve(cache)
    if (promesa) return promesa

    if (DEV_MODE) {
        promesa = fetch(`${import.meta.env.BASE_URL}mock-carreras.json`)
            .then(res => res.json())
            .then(data => {
                cache = data
                return cache as any[]
            })
        return promesa
    }

    promesa = Promise.allSettled(
        combinacionesUnicas.map(({ codcar, modo }) =>
            fetch(`/landing/consultas/getCarrerasJson.php?codcar=${codcar}&modo=${modo}`)
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


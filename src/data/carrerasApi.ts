import data from './carreras'

const combinaciones = data.map(c => ({ codcar: c.codcar, modo: c.modalidad }))
const combinacionesUnicas = combinaciones.filter(
    (c, i, arr) => arr.findIndex(x => x.codcar === c.codcar && x.modo === c.modo) === i
)
console.log(combinacionesUnicas)

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

    promesa = Promise.all(
        combinacionesUnicas.map(({ codcar, modo }) =>
            fetch(`https://ucasal.edu.ar/landing/consultas/getCarrerasJson.php?codcar=${codcar}&modo=${modo}`)
                .then(res => res.json())
        )
    ).then(resultados => {
        cache = resultados.flat()
        return cache
    })
    return promesa
}


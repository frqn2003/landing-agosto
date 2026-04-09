import data from './carreras'

const codcarsSegundoIngreso = [...new Set(data.map((carrera) => carrera.codcar))]
console.log(codcarsSegundoIngreso)

let cache: any[] | null = null
let promesa: Promise<any[]> | null = null

const DEV_MODE = import.meta.env.DEV

export function getCarrerasApi(): Promise<any[]> {
    if (cache) return Promise.resolve(cache)
    if (promesa) return promesa

    if (DEV_MODE) {
        promesa = fetch('/mock-carreras.json')
            .then(res => res.json())
            .then(data => {
                cache = data
                return cache as any[]
            })
        return promesa
    }

    promesa = Promise.all(
        codcarsSegundoIngreso.map(codcar => 
            fetch(`https://ucasal.edu.ar/landing/consultas/getCarrerasJson.php?codcar=${codcar}`)
                .then(res => res.json())
        )
    ).then(resultados => {
        cache = resultados.flat()
        return cache
    })
    return promesa
}


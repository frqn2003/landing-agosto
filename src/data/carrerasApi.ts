import data from './carreras'

const codcarsSegundoIngreso = [...new Set(data.map((carrera) => carrera.codcar))]
console.log(codcarsSegundoIngreso)

let cache: any[] | null = null
let promesa: Promise<any[]> | null = null

export function getCarrerasApi(): Promise<any[]> {
    if (cache) return Promise.resolve(cache)
    if (promesa) return promesa
    
    promesa = Promise.all(
        codcarsSegundoIngreso.map(codcar => 
            fetch(`https://ucasal.edu.ar/landing/consultas/getCarrerasJson.php?codcar=${codcar}`)
                .then(res => res.json())
        )
    ).then(resultados => {
        cache = resultados.flat()
        console.log(cache)
        return cache
    })
    console.log(cache, promesa)
    return promesa
}


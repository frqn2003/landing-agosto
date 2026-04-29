import { useEffect, useState } from "react"

interface Tarjeta {
    id: string
    nombre: string
    imagen: string
    descripcion: string
    activa: boolean
    orden: number
}

export default function Financiacion() {
    const [tarjetas, setTarjetas] = useState<Tarjeta[]>([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch('/landing/ingreso/assets/datosLanding.json')
            .then(r => r.json())
            .then(data => {
                const activas: Tarjeta[] = (data.tarjeta as Tarjeta[])
                    .filter(t => t.activa)
                    .sort((a, b) => a.orden - b.orden)
                    
                setTarjetas(activas)
            })
            .catch(console.error)
            .finally(() => setCargando(false))
    }, [])

    return (
        <section className="contenedor bg-center bg-cover relative mb-12">
            <div className="px-6 py-6 flex flex-col gap-6 z-20 bg-cover bg-center rounded-lg border-2 border-black bg-linear-to-r from-(--azul-ucasal) to-(--azul-dark-ucasal)">
                <h2 className="text-2xl md:text-3xl font-black text-white">
                    Financiá tus aranceles con:
                </h2>

                {cargando ? (
                    <div className="flex flex-wrap gap-6 justify-around">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 rounded-xl bg-white/20 animate-pulse flex-1 min-w-[120px] max-w-[200px]" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6 justify-around">
                        {tarjetas.map(tarjeta => (
                            <div
                                key={tarjeta.id}
                                className="flex flex-col items-center gap-3 flex-1 min-w-[120px] max-w-[300px]"
                            >
                                <div className="bg-white/70 border border-white/80 rounded-xl px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-center">
                                    <img
                                        src={tarjeta.imagen}
                                        alt={tarjeta.nombre}
                                        className="h-9 sm:h-11 object-contain"
                                        loading="lazy"
                                        decoding="async"
                                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                                    />
                                </div>
                                <p className="text-white text-xs sm:text-sm text-center leading-snug">
                                    {tarjeta.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

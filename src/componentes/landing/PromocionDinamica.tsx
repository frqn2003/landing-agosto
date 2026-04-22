import { useEffect, useState } from "react"

interface Promocion {
    nombre: string
    fecha_inicio: string
    fecha_fin: string
    descuento: string | null
    subtitulo: string
}

function diasRestantes(fechaFin: string): number {
    const diff = new Date(fechaFin).getTime() - new Date().getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function textoFechaHasta(fechaFin: string, dias: number): string {
    const d = new Date(fechaFin)
    const dia = String(d.getDate()).padStart(2, "0")
    const mes = String(d.getMonth() + 1).padStart(2, "0")
    const anio = String(d.getFullYear()).slice(2)
    const sufijo = dias <= 7 ? " — ¡Últimos días!" : ""
    return `hasta el ${dia}/${mes}/${anio}${sufijo}`
}

export default function PromocionDinamica() {
    const [promocion, setPromocion] = useState<Promocion | null>(null)
    const [dias, setDias] = useState(0)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}mock-landing.json`)
            .then(r => r.json())
            .then(data => {
                const ahora = new Date()
                const promociones: Promocion[] = data.promociones_dinamicas_agosto ?? []
                const activa = promociones.find(p =>
                    ahora >= new Date(p.fecha_inicio) && ahora <= new Date(p.fecha_fin)
                )
                if (activa) {
                    setPromocion(activa)
                    setDias(diasRestantes(activa.fecha_fin))
                }
            })
            .catch(console.error)
            .finally(() => setCargando(false))
    }, [])

    useEffect(() => {
        if (!promocion) return
        const interval = setInterval(() => {
            setDias(diasRestantes(promocion.fecha_fin))
        }, 60000)
        return () => clearInterval(interval)
    }, [promocion])

    if (cargando || !promocion) return null

    return (
        <section className="contenedor bg-center bg-cover relative mb-12">
            <div className="px-6 py-8 flex flex-row items-center justify-center gap-6 sm:gap-12 z-20 bg-cover bg-center rounded-lg border-2 border-black bg-linear-to-r from-(--azul-ucasal) to-(--azul-dark-ucasal)">
                {/* Izquierda: descuento */}
                <div className="flex flex-col items-center text-center">
                    {promocion.descuento && (
                        <span className="text-7xl sm:text-8xl font-black text-white leading-none tracking-tighter">
                            {promocion.descuento}
                        </span>
                    )}
                    <span className="text-xl sm:text-2xl font-bold text-white/90 leading-tight">
                        {promocion.subtitulo}
                    </span>
                    {promocion.descuento && (
                        <span className="text-sm text-white/60 mt-1">
                            {textoFechaHasta(promocion.fecha_fin, dias)}
                        </span>
                    )}
                </div>

                {/* Derecha: contador + CTA */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                        <span className="text-white/60 text-xs uppercase tracking-widest mb-1">Quedan</span>
                        <span className="text-5xl font-black text-white leading-none">
                            {dias}
                        </span>
                        <span className="text-white/60 text-xs uppercase tracking-widest mt-1">
                            {dias === 1 ? "día" : "días"}
                        </span>
                    </div>
                    <button
                        onClick={() => document.getElementById('pedidoinfo')?.scrollIntoView({ behavior: 'smooth' })}
                        className="boton-cta text-sm whitespace-nowrap"
                    >
                        ¡Aprovechá ahora!
                    </button>
                </div>
            </div>
        </section>
    )
}

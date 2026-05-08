import { useEffect, useRef, useState } from "react"

export default function Sedes() {
    const [mostrarMapa, setMostrarMapa] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    setMostrarMapa(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '800px 0px' }
        )

        observer.observe(section)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="" role="region" aria-label="Nuestras sedes">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold degrade-azul">Nuestras sedes</h2>
                {mostrarMapa ? (
                    <iframe
                        src="https://ucasal.edu.ar/mapa_sedes/mapa_sedes_ucasal.html"
                        title="Mapa de sedes UCASAL"
                        className="w-full rounded-xl border-0 shadow-md"
                        style={{ height: '45vh' }}
                        allowFullScreen
                        loading="lazy"
                    />
                ) : (
                    <div
                        className="w-full rounded-xl border border-gray-200 shadow-md bg-gray-100 animate-pulse"
                        style={{ height: '45vh' }}
                        aria-hidden="true"
                    />
                )}
            </div>
        </section>
    )
}

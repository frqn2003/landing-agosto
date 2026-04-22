import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CardsCarreras from "../ui/CardsCarreras";
import dataCarreras from "../../../data/carreras"

function getLote(): number {
    if (window.innerWidth >= 1536) return 8
    if (window.innerWidth >= 768) return 6
    return 4
}

export default function Carreras() {
    const [lote, setLote] = useState(getLote)
    const [visible, setVisible] = useState(getLote)

    useEffect(() => {
        const handler = () => setLote(getLote())
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    const carrerasVisibles = dataCarreras.slice(0, visible)
    const hayMas = visible < dataCarreras.length
    const restantes = Math.min(lote, dataCarreras.length - visible)

    return (
        <section className="w-full pt-2 pb-8 contenedor" id="carreras">
            <div className="relative">
                <div className="text-left mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold degrade-azul tracking-tight">
                        Nuestra Oferta Académica
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                    <AnimatePresence initial={false}>
                        {carrerasVisibles.map((carrera: any) => (
                            <motion.div
                                key={carrera.codcar}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <CardsCarreras
                                    codcar={carrera.codcar}
                                    slug={carrera.slug}
                                    nombre={carrera.nombre}
                                    descripcionCorta={carrera.descripcionCorta}
                                    duracion={carrera.duracion}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {hayMas && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setVisible(v => v + lote)}
                            className="inline-flex botoncito items-center gap-2 px-8 py-3 rounded-2xl border-2 border-(--azul-ucasal) text-(--azul-ucasal) font-bold group text-sm transition-all duration-300 cursor-pointer" style={{ '--botoncito-bg': 'var(--azul-ucasal)', '--botoncito-bg-secondary': 'var(--azul-dark-ucasal)', '--botoncito-opacity': '1' } as React.CSSProperties}
                        >
                            Ver más carreras
                            <span className="bg-(--azul-ucasal)/10 text-(--azul-ucasal) group-hover:opacity-100 group-hover:text-white group-hover:bg-white/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                                +{restantes}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
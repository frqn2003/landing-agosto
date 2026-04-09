/* De 640 a 1024 aparece la foto y esta medio corrompido todo */
import { useState, useEffect } from 'react'

export default function Hero() {
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)

        return () => clearInterval(cursorInterval)
    }, [])

    return (
        <section className="w-full min-h-full flex items-center pt-4 px-4 contenedor">
            <div className="w-full max-w-380 bg-(--azul-ucasal)/20 p-6 sm:p-12 rounded-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">

                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col gap-2 lg:pl-4 max-sm:order-1 max-sm:items-center max-sm:w-full">

                        <h1
                            className="text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black text-[#0d0d0d] leading-none tracking-tighter uppercase mt-6"
                            style={{ fontFamily: "Museo Sans, sans-serif" }}
                        >
                            <span className="degrade-azul overflow-hidden whitespace-nowrap animate-[typewriter_0.8s_steps(8)_forwards] border-r-4 border-transparent md:block">
                                EMPEZÁ
                            </span>
                            <span className="degrade-azul overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.4s_steps(3)_0.8s_forwards,fadeIn_0.1s_0.8s_forwards] md:block">
                                EN
                            </span>
                            <span className="degrade-rojo inline-block overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.8s_steps(7)_1.2s_forwards,fadeIn_0.1s_1.2s_forwards] md:block">
                                AGOSTO
                            </span>
                        </h1>

                        <p
                            className="text-base sm:text-lg text-[#0d0d0d]/60 leading-relaxed max-w-sm mb-4"
                            style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2s forwards' }}
                        >
                            Carreras universitarias oficiales, cursado a distancia y docentes comprometidos con tu crecimiento.
                        </p>

                        <div
                            className="flex flex-row flex-wrap gap-3"
                            style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2.3s forwards' }}
                        >
                            <button
                                onClick={() => {
                                    const form = document.getElementById('form');
                                    if (form) {
                                        form.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="boton-cta"
                            >
                                Quiero información
                            </button>
                            <button
                                onClick={() => {
                                    const carreras = document.getElementById('carreras');
                                    if (carreras) {
                                        carreras.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="bg-transparent text-[#0d0d0d] font-bold text-sm px-6 py-3 rounded-full border-2 border-[#0d0d0d] transition-all hover:bg-[#0d0d0d] hover:text-white cursor-pointer"
                            >
                                Ver carreras
                            </button>
                        </div>

                        {/* Imagen mobile/tablet — visible solo debajo de lg */}
                        <div className="relative w-full sm:hidden h-60" style={{ opacity: 0, animation: 'heroFadeIn 0.8s ease-out 2.6s forwards' }}>
                            <img
                                src="/hero.webp"
                                alt="Estudiante UCASAL"
                                className="w-full h-full object-contain object-center"
                            />
                        </div>

                        {/* Stats horizontales */}
                        <div
                            className="flex flex-row xl:gap-16 lg:gap-6 md:gap-4 gap-2 sm:mt-2 border-t border-[#0d0d0d]/10 pt-2 sm:pt-6  w-full justify-around items-center"
                            style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2.6s forwards' }}
                        >
                            {[
                                { valor: "+30k", etiqueta: "Graduados" },
                                { valor: "+30", etiqueta: "Carreras" },
                                { valor: "+60", etiqueta: "Años" },
                                { valor: "+30", etiqueta: "Convenios" },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-2xl font-black text-[#0d0d0d]">{stat.valor}</span>
                                    <span className="text-xs text-[#0d0d0d]/50 uppercase tracking-wide">{stat.etiqueta}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Columna derecha — solo desktop ── */}
                    <div className="hidden sm:flex flex-col justify-end h-full gap-5">

                        <div className="relative w-full" style={{ opacity: 0, animation: 'heroFadeIn 0.8s ease-out 2.6s forwards' }}>
                            <img
                                src="/hero.webp"
                                alt="Estudiante UCASAL"
                                className="w-full h-full object-contain object-center"/* 
                                style={{ filter: "drop-shadow(0 0 6px white) drop-shadow(0 0 2px white)" }} */
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

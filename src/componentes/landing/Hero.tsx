/* De 640 a 1024 aparece la foto y esta medio corrompido todo */
export default function Hero() {
    return (
        <section className="w-full flex items-center pt-4 px-4 contenedor">
            <div className="w-full h-[800px] sm:h-[800px] px-6 py-12 sm:p-12 rounded-2xl relative">
                <div className="overlay rounded-2xl"></div>
                <div className="flex gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-center w-full justify-center h-full">
                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col gap-2 lg:pl-4 items-center w-full h-full justify-start sm:justify-center pt-4 sm:pt-0 z-30">

                        <h1
                            className="text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black leading-none tracking-tighter uppercase mt-6 flex flex-col items-center text-center"
                            style={{ fontFamily: "Museo Sans, sans-serif" }}
                        >
                            <span className="hero-titulo block overflow-hidden whitespace-nowrap animate-[typewriter_0.8s_steps(8)_forwards]">
                                EMPEZÁ EN
                            </span>
                            <span className="hero-titulo block overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.8s_steps(7)_1.2s_forwards,fadeIn_0.1s_1.2s_forwards]">
                                AGOSTO
                            </span>
                        </h1>
                        <div className='flex flex-col gap-4 sm:justify-end items-center h-full w-full text-center'>
                            <div className='max-w-140 flex flex-col gap-4'>
                                <p
                                    className="text-base sm:text-lg text-white leading-relaxed"
                                    style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2s forwards' }}
                                >
                                    Carreras universitarias oficiales, cursado a distancia y docentes comprometidos con tu crecimiento.
                                </p>

                                <div
                                    className="flex flex-row w-full justify-around items-center"
                                    style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2.3s forwards' }}
                                >
                                    <button
                                        onClick={() => {
                                            const form = document.getElementById('pedidoinfo');
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
                                        className="bg-transparent text-white/90 font-bold text-sm px-6 py-3 rounded-full border-2 border-white transition-all hover:bg-white/10 hover:text-white cursor-pointer"
                                    >
                                        Ver carreras
                                    </button>
                                </div>
                                {/* Stats horizontales */}
                                <div
                                    className="flex flex-row xl:gap-16 lg:gap-6 md:gap-4 gap-2 sm:mt-2 border-t border-white/10 pt-2 sm:pt-6  w-full justify-around items-center"
                                    style={{ opacity: 0, animation: 'heroFadeInUp 0.6s ease-out 2.6s forwards' }}
                                >
                                    {[
                                        { valor: "+30k", etiqueta: "Graduados" },
                                        { valor: "+30", etiqueta: "Carreras" },
                                        { valor: "+60", etiqueta: "Años" },
                                        { valor: "+30", etiqueta: "Convenios" },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <span className="text-2xl font-black text-white">{stat.valor}</span>
                                            <span className="text-xs text-white/50 uppercase tracking-wide">{stat.etiqueta}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <picture>
                        <source media="(min-width: 769px)" srcSet="/general.jpg" />
                        <source media="(max-width: 768px)" srcSet="/mobile-general.jpg" />
                        <img
                            src="/general.jpg"
                            /* src={`/${carrera.codcar}.png`} */
                            alt="Hero"
                            className="w-full h-full object-cover object-center"
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
}

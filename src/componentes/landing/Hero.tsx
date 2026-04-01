
export default function Hero() {

    return (
        <section className="w-full min-h-full bg-(--azul-ucasal)/20 flex items-center pt-15 px-4 contenedor">
            <div className="w-full max-w-380 mx-auto">

                {/* Grid principal: izquierda foto+cards / derecha copy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* ── Columna derecha ── */}
                    <div className="flex flex-col gap-6 lg:pl-4 max-sm:order-1 max-sm:items-center max-sm:w-full mb-12">

                        {/* Titular ultra-bold */}
                        <h1
                            className="text-6xl sm:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black text-[#0d0d0d] leading-none tracking-tighter uppercase"
                            style={{ fontFamily: "Museo Sans, sans-serif" }}
                        >
                            <span className="md:block degrade">EMPEZÁ </span>
                            <span className="md:block degrade">EN</span>
                            <span className="block degrade2">AGOSTO.</span>
                        </h1>

                        {/* Bajada */}
                        <p className="text-base sm:text-lg text-[#0d0d0d]/60 leading-relaxed max-w-sm">
                            Carreras universitarias oficiales, cursado a distancia y docentes comprometidos con tu crecimiento.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-row flex-wrap gap-3">
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

                        {/* Stats horizontales */}
                        <div className="flex flex-row lg:gap-16 gap-8 mt-2 border-t border-[#0d0d0d]/10 pt-6  w-full justify-around items-center">
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

                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col justify-end h-full gap-5">

                        {/* Foto redondeada */}
                        <div className="relative w-full max-sm:hidden">
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

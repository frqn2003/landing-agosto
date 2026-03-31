
export default function HeroEditorial() {

    return (
        <section className="w-full min-h-full bg-(--azul-light-ucasal)/15 flex items-center py-15 px-4 contenedor">
            <div className="w-full max-w-380 mx-auto">

                {/* Grid principal: izquierda foto+cards / derecha copy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* ── Columna derecha ── */}
                    <div className="flex flex-col gap-6 lg:pl-4 max-sm:order-1 max-sm:items-center max-sm:w-full">

                        {/* Titular ultra-bold */}
                        <h1
                            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-[#0d0d0d] leading-none tracking-tighter uppercase"
                            style={{ fontFamily: "Museo Sans, sans-serif" }}
                        >
                            <span className="md:block">EMPEZÁ </span>
                            <span className="md:block text-(--rojo-ucasal)">EN</span>
                            <span className="block">AGOSTO.</span>
                        </h1>

                        {/* Bajada */}
                        <p className="text-base sm:text-lg text-[#0d0d0d]/60 leading-relaxed max-w-sm">
                            Carreras universitarias oficiales, cursado a distancia y docentes comprometidos con tu crecimiento.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-row flex-wrap gap-3">
                            <a
                                href="#form"
                                className="bg-(--rojo-ucasal) text-white font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                            >
                                Quiero inscribirme
                            </a>
                            <a
                                href="#carreras"
                                className="bg-transparent text-[#0d0d0d] font-bold text-sm px-6 py-3 rounded-full border-2 border-[#0d0d0d] transition-all hover:bg-[#0d0d0d] hover:text-white cursor-pointer"
                            >
                                Ver carreras
                            </a>
                        </div>

                        {/* Stats horizontales */}
                        <div className="flex flex-row gap-6 mt-2 border-t border-[#0d0d0d]/10 pt-6">
                            {[
                                { valor: "+30k", etiqueta: "Graduados" },
                                { valor: "+50", etiqueta: "Carreras" },
                                { valor: "40+", etiqueta: "Años" },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-2xl font-black text-[#0d0d0d]">{stat.valor}</span>
                                    <span className="text-xs text-[#0d0d0d]/50 uppercase tracking-wide">{stat.etiqueta}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col gap-5 max-sm:order-2">

                        {/* Foto redondeada */}
                        <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-xl max-sm:hidden ">
                            <img
                                src="https://placehold.co/600x400"
                                alt="Estudiante UCASAL"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Componente de testimonios */}
                    </div>
                </div>
            </div>
        </section>
    );
}

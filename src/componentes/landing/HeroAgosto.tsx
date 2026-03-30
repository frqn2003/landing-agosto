import { useState, useEffect } from "react";

const FECHA_INICIO = new Date("2026-08-01T00:00:00");

function calcularDiasRestantes(): number {
    const hoy = new Date();
    const diff = FECHA_INICIO.getTime() - hoy.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const STATS = [
    { valor: "+30.000", etiqueta: "Graduados" },
    { valor: "+20", etiqueta: "Carreras" },
    { valor: "100%", etiqueta: "Online" },
    { valor: "+60", etiqueta: "Años de experiencia" },
];

const CARACTERISTICAS = [
    {
        icono: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        texto: "Cursado flexible, a tu ritmo",
    },
    {
        icono: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
        ),
        texto: "Desde cualquier lugar del país",
    },
];

export default function HeroAgosto() {
    const [diasRestantes, setDiasRestantes] = useState(calcularDiasRestantes());
    const [animarContador, setAnimarContador] = useState(false);

    useEffect(() => {
        setAnimarContador(true);
        const intervalo = setInterval(() => {
            setDiasRestantes(calcularDiasRestantes());
        }, 10000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <section className="relative w-full h-[1000px] lg:h-[705px] overflow-hidden">

            {/* Imagen */}
            <picture className="absolute inset-0 w-full h-full">
                <source media="(max-width: 767px)" srcSet="/modalidades-distancia.webp" />
                <source media="(min-width: 768px)" srcSet="/modalidades-distancia.webp" />
                <img
                    src="/modalidades-distancia.webp"
                    className="w-full h-full object-cover object-center"
                    alt="Segundo ingreso UCASAL Agosto"
                    loading="eager"
                />
            </picture>

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#022130]/90 via-[#022130]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-[#022130]/70 via-transparent to-transparent z-10" />

            {/* Contenido principal */}
            <div className="relative z-20 contenedor flex flex-col justify-center h-full lg:pt-24 lg:pb-12">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">

                    {/* Título y descripción */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/3 text-white">

                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight">
                                <span className="block text-white">Empezá en</span>
                                <span className="block text-(--rojo-ucasal)">Agosto.</span>
                            </h1>
                        </div>

                        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-md">
                            UCASAL te abre las puertas por segunda vez. Elegí tu carrera,
                            cursá desde donde estés y obtené tu título universitario.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-row gap-3 mt-2">
                            <button
                                onClick={() => {
                                    const form = document.getElementById('form');
                                    if (form) {
                                        form.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="boton-cta text-center text-sm sm:text-base"
                            >
                                Ver carreras
                            </button>
                            <button
                                onClick={() => {
                                    const carreras = document.getElementById('carreras');
                                    if (carreras) {
                                        carreras.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="hover-button group border-2 border-white/50 rounded-full flex flex-row text-white text-sm sm:text-base justify-center items-center gap-3 px-6 py-3 cursor-pointer backdrop-blur-sm transition-all hover:border-white"
                            >
                                <span>Ingreso 2026</span>
                                <img
                                    src="/icons.svg#arrow"
                                    className="w-4 h-4"
                                    alt=""
                                    aria-hidden="true"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Características */}
                    <div className="lg:w-1/3 w-full relative bottom-0 right-0 justify-end h-full flex flex-col">
                        <ul className="flex flex-row justify-around">
                            {CARACTERISTICAS.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-(--rojo-ucasal)">
                                        {item.icono}
                                    </span>
                                    {item.texto}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contador + Stats */}
                    <div className="flex flex-col gap-5 w-full lg:w-auto lg:ml-auto">

                        {/* A chequear si queda porque ta maomeno */}
                        {diasRestantes > 0 && (
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white text-center shadow-2xl">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                                    El inicio arranca en
                                </p>
                                <div
                                    className={`text-7xl font-black text-(--rojo-ucasal) leading-none transition-all duration-700 ${animarContador ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                >
                                    {diasRestantes}
                                </div>
                                <p className="text-sm font-medium text-white/70 mt-1">
                                    {diasRestantes === 1 ? "día" : "días"}
                                </p>
                                <div className="mt-4 w-full bg-white/10 rounded-full h-1">
                                    <div
                                        className="bg-(--rojo-ucasal) h-1 rounded-full transition-all duration-1000"
                                        style={{
                                            width: `${Math.min(100, Math.max(5, 100 - (diasRestantes / 180) * 100))}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {STATS.map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 text-white text-center"
                                >
                                    <p className="text-2xl font-black text-white leading-none">
                                        {stat.valor}
                                    </p>
                                    <p className="text-xs text-white/60 mt-1 leading-tight">
                                        {stat.etiqueta}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Flecha */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40">
                <span className="text-xs uppercase tracking-widest">Explorá</span>
                <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}

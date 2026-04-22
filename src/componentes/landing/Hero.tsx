/* De 640 a 1024 aparece la foto y esta medio corrompido todo */
import { useEffect, useRef, useState } from 'react';

const duracion = 1500
const delay = typeof window !== 'undefined' && window.innerWidth < 640 ? 0 : 1600

function useContador(valor: string, duracion: number, delay: number) {
    const [display, setDisplay] = useState('0');
    const ref = useRef<HTMLDivElement>(null);
    const iniciado = useRef(false);

    useEffect(() => {
        const prefijo = valor.startsWith('+') ? '+' : '';
        const sufijo = valor.endsWith('k') ? 'k' : '';
        const numero = parseInt(valor.replace(/[^0-9]/g, ''), 10);

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || iniciado.current) return;
            iniciado.current = true;

            setTimeout(() => {
                const inicio = performance.now();
                const tick = (ahora: number) => {
                    const progreso = Math.min((ahora - inicio) / duracion, 1);
                    const ease = 1 - Math.pow(1 - progreso, 3);
                    const actual = Math.floor(ease * numero);
                    setDisplay(`${prefijo}${actual}${sufijo}`);
                    if (progreso < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }, delay);
        }, { threshold: 0.50 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [valor, duracion]);

    return { display, ref };
}

function StatItem({ valor, etiqueta, index }: { valor: string; etiqueta: string; index: number }) {
    const stagger = index * 200;
    const { display, ref } = useContador(valor, duracion, delay + stagger);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay + stagger);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            ref={ref}
            className="flex flex-col items-center transition-all duration-500"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)' }}
        >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{display}</span>
            <span className="text-sm sm:text-base text-white/50 uppercase tracking-wide">{etiqueta}</span>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="w-full flex items-center pt-4 px-4 contenedor">
            <div className="w-full h-[800px] sm:h-[800px] pt-4 pb-12 sm:p-12 rounded-2xl relative">
                <div className="overlay rounded-2xl"></div>
                <div className="flex gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-start w-full justify-start h-full">
                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col gap-2 sm:gap-8 lg:pl-4 items-center sm:items-start w-full h-full justify-center sm:justify-left pt-4 sm:pt-0 z-30">

                        <h1 className="text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black leading-none tracking-tight uppercase mt-6 flex flex-col w-full text-center sm:text-left" style={{ fontFamily: "Museo Sans, sans-serif" }}>
                            <span className="sm:text-white text-(--azul-ucasal) block overflow-hidden whitespace-nowrap animate-[typewriter_0.8s_steps(8)_forwards] mx-auto sm:mx-0">
                                EMPEZÁ
                            </span>
                            <span className="sm:text-white text-(--azul-ucasal) block overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.9s_steps(8)_0.8s_forwards,fadeIn_0.05s_0.9s_forwards] mx-auto sm:mx-0">
                                EN AGOSTO
                            </span>
                        </h1>
                        <div className='flex flex-col gap-8 sm:gap-14 sm:text-left sm:justify-start sm:items-start justify-center text-center items-center h-full w-full'>
                            <div className='flex flex-col gap-8 h-full w-full'>
                                <p className="text-sm sm:text-xl pl-2 text-black sm:text-white leading-relaxed sm:max-w-140" style={{ opacity: 0, animation: 'heroFadeInUp 0.5s ease-out 1.8s forwards' }}>Carreras universitarias oficiales, cursado online <br className="hidden sm:block" />y docentes comprometidos con tu crecimiento.
                                </p>

                                <div className="flex flex-col sm:flex-row w-full sm:mt-12 mt-8 gap-4 h-full items-center sm:items-start justify-end sm:justify-start sm:max-w-140" style={{ opacity: 0, animation: 'heroFadeInUp 0.5s ease-out 2s forwards' }}
                                >
                                    <button
                                        onClick={() => {
                                            const form = document.getElementById('pedidoinfo');
                                            if (form) {
                                                form.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        className="boton-cta" style={{ fontSize: 'var(--boton-size)' }}
                                    >
                                        Quiero información
                                    </button>
                                    <button className='group inline-flex items-center text-white/90 border-white/90 border text-xs sm:text-lg px-6 gap-3 py-3 rounded-xl transition-all botoncito cursor-pointer' onClick={() => {
                                        const carreras = document.getElementById('carreras');
                                        if (carreras) {
                                            carreras.scrollIntoView({ behavior: 'smooth' });
                                        }}}>
                                        <span className="inline-block overflow-hidden transition-all duration-400 group-hover:rotate-45 group-hover:translate-x-20 sm:group-hover:translate-x-28">  <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                        </span>
                                        <span
                                            className="bg-transparent font-bold transition-all duration-400 group-hover:-translate-x-8"
                                        >Ver carreras
                                        </span>
                                </button>
                            </div>
                            {/* Stats horizontales */}
                            <div
                                className="flex flex-row xl:gap-16 lg:gap-6 md:gap-4 gap-0 sm:mt-2 pt-2 sm:pt-6 w-full sm:h-full justify-around items-end"
                            >
                                {[
                                    { valor: "+40k", etiqueta: "Graduados" },
                                    { valor: "+80", etiqueta: "Carreras" },
                                    { valor: "+60", etiqueta: "Años" },
                                    { valor: "+30", etiqueta: "Convenios" },
                                ].map((stat, i) => (
                                    <StatItem key={i} valor={stat.valor} etiqueta={stat.etiqueta} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <picture>
                    <source media="(min-width: 769px)" srcSet={`${import.meta.env.BASE_URL}desktop.jpg`} />
                    <source media="(max-width: 768px)" srcSet={`${import.meta.env.BASE_URL}mobile.jpg`} />
                    <img
                        src={`${import.meta.env.BASE_URL}desktop.jpg`}
                        /* src={`/${carrera.codcar}.png`} */
                        alt="Hero"
                        className="w-full h-full object-cover object-center"
                    />
                </picture>
            </div>
        </div>
        </section >
    );
}

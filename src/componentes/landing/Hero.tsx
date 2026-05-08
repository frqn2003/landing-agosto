/* De 640 a 1024 aparece la foto y esta medio corrompido todo */
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

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
        let timeoutID: ReturnType<typeof setTimeout>;
        let rafId: number

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || iniciado.current) return;
            iniciado.current = true;

            timeoutID = setTimeout(() => {
                const inicio = performance.now();
                const tick = (ahora: number) => {
                    const progreso = Math.min((ahora - inicio) / duracion, 1);
                    const ease = 1 - Math.pow(1 - progreso, 3);
                    const actual = Math.floor(ease * numero);
                    setDisplay(`${prefijo}${actual}${sufijo}`);
                    if (progreso < 1) requestAnimationFrame(tick);
                };
                rafId = requestAnimationFrame(tick);
            }, delay);
        }, { threshold: 0.50 });

        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
            clearTimeout(timeoutID);
            cancelAnimationFrame(rafId);
        };
    }, [valor, duracion]);

    return { display, ref };
}

function StatItem({ valor, etiqueta, index, subetiqueta }: { valor: string; etiqueta: string; index: number; subetiqueta?: string }) {
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
            <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white">{display}</span>
            <span className="text-[10px] sm:text-base text-white/50 uppercase tracking-wide text-center">{etiqueta} <br className='block md:hidden'/>{subetiqueta}</span>
        </div>
    );
}

export default function Hero() {
    return (
        <>
        <Helmet>
            <link rel="preload" href={`${import.meta.env.BASE_URL}mobile.webp`} as="image" media="(max-width: 768px)" />
            <link rel="preload" href={`${import.meta.env.BASE_URL}desktop.webp`} as="image" media="(min-width: 769px)" />
        </Helmet>
        <section className="w-full flex items-center pt-4 px-4 contenedor" role="banner" aria-label="Banner principal">
            <div className="w-full h-[800px] sm:h-[760px] pt-4 pb-6 sm:p-12 rounded-2xl relative">
                <div className="overlay rounded-2xl"></div>
                <div className="flex gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 items-start w-full justify-start h-full">
                    {/* ── Columna izquierda ── */}
                    <div className="flex flex-col gap-2 sm:gap-8 lg:pl-4 items-center md:items-start w-full h-full justify-center sm:justify-left pt-4 sm:pt-0 z-30">

                        <h1 className="text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black leading-none tracking-tight uppercase mt-6 flex flex-col w-full text-center md:text-left" style={{ fontFamily: "Museo Sans, sans-serif" }}>
                            <span className="md:text-white text-(--azul-ucasal) block overflow-hidden whitespace-nowrap animate-[typewriter_0.8s_steps(12)_forwards] mx-auto sm:mx-0">
                                EMPEZÁ
                            </span>
                            <span className="md:text-white text-(--azul-ucasal) block overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.9s_steps(12)_0.8s_forwards,fadeIn_0.05s_0.9s_forwards] mx-auto sm:mx-0">
                                EN AGOSTO
                            </span>
                            <p className='text-2xl md:text-4xl tracking-tight font-thin md:text-white text-(--azul-ucasal) lg:px-2 overflow-hidden whitespace-nowrap opacity-0 animate-[typewriter_0.9s_steps(12)_1.4s_forwards,fadeIn_0.05s_1.5s_forwards]'>estudía online</p>
                        </h1>
                        <div className='flex flex-col gap-8 sm:gap-14 sm:text-left sm:justify-start sm:items-start justify-center text-center items-center h-full w-full'>
                            <div className='flex flex-col gap-2 h-full w-full max-md:items-end max-md:justify-end'>
                                <p className="text-sm max-md:text-center sm:text-xl lg:pl-2 text-white leading-relaxed max-sm:items-end sm:max-w-140" style={{ opacity: 0, animation: 'heroFadeInUp 0.5s ease-out 1.8s forwards' }}>Carreras universitarias oficiales, cursado online <br className="hidden md:block" />y docentes comprometidos con tu crecimiento.
                                </p>
                                <div className="flex flex-row w-full sm:mt-12 mt-2 gap-4 items-end lg:items-start justify-center md:justify-start md:max-w-140" style={{ opacity: 0, animation: 'heroFadeInUp 0.5s ease-out 2s forwards' }}
                                >
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById('carreras')
                                            if (el) window.scrollTo({ top: el.getBoundingClientRect().bottom + window.scrollY + 40, behavior: 'smooth' })
                                        }}
                                        className="boton-cta" style={{ fontSize: 'var(--boton-size)' }}
                                    >
                                        Quiero información
                                    </button>
                                    <button className='group inline-flex items-center text-white/90 border-white/90 border text-xs sm:text-lg md:px-6 gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all cursor-pointer  botoncito' style={{ '--botoncito-bg': '#FFFFFF', '--botoncito-bg-secondary': '#FFFFFF', '--botoncito-opacity': '0.5' } as React.CSSProperties} onClick={() => {
                                        const el = document.getElementById('carreras')
                                        if (el) window.scrollTo({ top: el.getBoundingClientRect().bottom + window.scrollY + 40, behavior: 'smooth' })
                                    }}>
                                        <span className="inline-block overflow-hidden transition-all duration-400 group-hover:rotate-45 group-hover:translate-x-20 sm:group-hover:translate-x-28">  <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 md:h-4 md:w-4"
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
                                {/* Stats */}
                                {/* Desktop: una sola fila */}
                                <div className="hidden sm:flex flex-row xl:gap-16 lg:gap-6 md:gap-4 gap-4 sm:mt-2 pt-1 sm:pt-6 w-full justify-around items-end">
                                    {[
                                        { valor: "+42.000", etiqueta: "Graduados" },
                                        { valor: "+140", etiqueta: "Carreras" },
                                        { valor: "+60", etiqueta: "Años de", subetiqueta: "experiencia" },
                                        { valor: "+35", etiqueta: "años de", subetiqueta: "Educación Virtual" },
                                        { valor: "+120", etiqueta: "Convenios de", subetiqueta: "Intercambio" },
                                    ].map((stat, i) => (
                                        <StatItem key={i} valor={stat.valor} etiqueta={stat.etiqueta} index={i} subetiqueta={stat.subetiqueta} />
                                    ))}
                                </div>
                                {/* Mobile: dos filas */}
                                <div className="flex sm:hidden flex-col gap-2 pt-1 w-full">
                                    <div className="flex flex-row gap-6 w-full justify-around items-end">
                                        {[
                                            { valor: "+42.000", etiqueta: "Graduados" },
                                            { valor: "+140", etiqueta: "Carreras" },
                                        ].map((stat, i) => (
                                            <StatItem key={i} valor={stat.valor} etiqueta={stat.etiqueta} index={i} />
                                        ))}
                                    </div>
                                    <div className="flex flex-row gap-1 w-full justify-around items-end">
                                        {[
                                            { valor: "+60", etiqueta: "Años de", subetiqueta: "experiencia" },
                                            { valor: "+35", etiqueta: "años de", subetiqueta: "Educación Virtual" },
                                            { valor: "+120", etiqueta: "Convenios de", subetiqueta: "Intercambio" },
                                        ].map((stat, i) => (
                                            <StatItem key={i + 2} valor={stat.valor} etiqueta={stat.etiqueta} index={i + 2} subetiqueta={stat.subetiqueta} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <picture>
                        <source media="(min-width: 769px)" srcSet={`${import.meta.env.BASE_URL}desktop.webp`} />
                        <source media="(max-width: 768px)" srcSet={`${import.meta.env.BASE_URL}mobile.webp`} />
                        <img
                            src={`${import.meta.env.BASE_URL}desktop.jpg`}
                            /* src={`/${carrera.codcar}.png`} */
                            alt="Hero"
                            className="w-full h-full object-cover object-center" fetchPriority='high'
                        />
                    </picture>
                </div>
            </div>
        </section >
        </>
    );
}

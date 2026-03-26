import { motion } from 'framer-motion';
import React from 'react';
import CardsGrilla from './CardsGrilla';

// Tarjetas adaptadas para Segundo Ingreso
const sliderCards = [
  {
    title: 'Ahorro de Tiempo',
    description: 'No esperes hasta el próximo año. Comenzá ahora y no pierdas el ciclo lectivo.',
    colorKey: 'rojo-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  },
  {
    title: 'Reinicio Académico',
    description: 'Una excelente oportunidad si cambiaste de carrera o decidiste retomar tus estudios.',
    colorKey: 'azul-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    )
  },
  {
    title: 'Mismos Contenidos',
    description: 'El plan de estudios es riguroso e idéntico al de quienes iniciaron en el primer semestre.',
    colorKey: 'rojo-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    )
  },
  {
    title: 'Equivalencias',
    description: 'Si ya tenés materias aprobadas en otra institución, podés solicitar su reconocimiento.',
    colorKey: 'azul-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  },
  {
    title: 'Cursado Flexible',
    description: 'Adaptamos el aprendizaje a tus tiempos con modalidad 100% online y asincrónica.',
    colorKey: 'rojo-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    )
  },
  {
    title: 'Acompañamiento',
    description: 'Contás con asesoramiento constante de docentes y tutores para facilitar tu ingreso.',
    colorKey: 'azul-ucasal',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    )
  }
];

const colorStyles: Record<string, { border: string, bg: string, bgHover: string, text: string }> = {
  'rojo-ucasal': {
    border: 'hover:border-[var(--rojo-ucasal)]/30',
    bg: 'bg-[var(--rojo-ucasal)]/10',
    bgHover: 'group-hover:bg-[var(--rojo-ucasal)]',
    text: 'text-[var(--rojo-ucasal)]'
  },
  'azul-ucasal': {
    border: 'hover:border-[var(--azul-ucasal)]/30',
    bg: 'bg-[var(--azul-ucasal)]/10',
    bgHover: 'group-hover:bg-[var(--azul-ucasal)]',
    text: 'text-[var(--azul-ucasal)]'
  }
};

export default function Detalles() {
  return (
    <section 
      className="py-12 flex flex-col font-sans overflow-hidden bg-white"
      style={{
        '--rojo-ucasal': '#ee1818',
        '--azul-light-ucasal': '#004180',
        '--rojo-ucasal-var1': '#f8c8c86b',
        '--azul-light-ucasal-var1': '#78b1eb6b',
        '--azul-ucasal': '#022130',
        '--ucasal-white': '#ffffff',
        '--ucasal-black': '#000000',
        '--ucasal-gray-light': '#f8f9fa',
        '--ucasal-gray-medium': '#e9ecef',
      } as React.CSSProperties}
    >
      <div className="contenedor mb-8 lg:mb-16">
        <div className="text-left mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-(--azul-ucasal) tracking-tight">
            Inicia tu carrera en <span className="text-(--rojo-ucasal)">Agosto</span>
          </h2>
           <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mx-auto mt-8 items-center">
          
          {/* Columna Izquierda: Placeholder de imagen */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="w-3/4 h-3/4 rounded-[24px] overflow-hidden shadow-lg border-4 border-white relative bg-(--ucasal-gray-light) flex justify-center items-center mx-auto -translate-y-1/12"
          >
            <img 
              src="https://placehold.co/600x400" 
              alt="Placeholder" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Columna Derecha: Lista de Íconos (Escritorio) */}
          <div className="flex flex-col gap-14 py-4">
            
            {/* Item 1: Qué es */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-16 h-16 bg-(--rojo-ucasal) rounded-full flex items-center justify-center text-white shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-xl font-bold text-(--azul-ucasal) mb-2">¿Qué es?</h3>
                <p className="text-[16px] text-(--ucasal-black) leading-[1.7] opacity-80 font-normal text-justify">
                  Una oportunidad para iniciar o retomar tu carrera universitaria en la segunda mitad del año. Esto te permite aprovechar los meses restantes y no perder un año completo del ciclo lectivo, asegurando tu progreso académico sin demoras.
                </p>
              </div>
            </motion.div>

            {/* Item 2: Cuándo iniciar */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-16 h-16 bg-(--rojo-ucasal) rounded-full flex items-center justify-center text-white shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-xl font-bold text-(--azul-ucasal) mb-2">¿Cuándo iniciar?</h3>
                <p className="text-[16px] text-(--ucasal-black) leading-[1.7] opacity-80 font-normal text-justify">
                  El periodo de inscripciones se encuentra actualmente abierto y disponible para todos los interesados. Las clases inician de manera oficial durante el mes de Agosto, dándote el tiempo necesario para organizarte y gestionar tu admisión.
                </p>
              </div>
            </motion.div>

            {/* Item 3: Modalidad a Distancia */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-16 h-16 bg-(--rojo-ucasal) rounded-full flex items-center justify-center text-white shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-xl font-bold text-(--azul-ucasal) mb-2">Modalidad a Distancia</h3>
                <p className="text-[16px] text-(--ucasal-black) leading-[1.7] opacity-80 font-normal text-justify">
                  Disfrutá de un modelo educativo de excelencia metodológica, desarrollado 100% de manera online y con total asincronía. Todo tu progreso y las evaluaciones estarán gestionadas de forma integral a través de nuestro Campus Virtual.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
        
        {/* Componente Grilla para Móvil (2x2) */}
        <CardsGrilla />
        </div>
      </div>

      {/* SECCIÓN 2: MARQUEE CONTINUO CON HTML PROVISTO */}
      <div className="w-full bg-white relative mt-0 lg:mt-4 mb-8">
        <div className="contenedor text-left mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-(--azul-ucasal) tracking-tight">
            Beneficios de iniciar en <span className="text-(--rojo-ucasal)">Agosto </span>
          </h2>
        </div>

        {/* Contenedor Carrusel Infinito con class mask-gradient */}
        <div 
          className="mt-8 w-full inline-flex flex-nowrap overflow-hidden marquee-container-base relative mask-gradient pb-10"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
          }}
        >

          {/* Bloque 1 */}
          <div className="flex shrink-0 items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll gap-6 px-3">
            {sliderCards.map((card, idx) => {
              const styles = colorStyles[card.colorKey] || colorStyles['rojo-ucasal'];
              return (
              <div
                key={`block1-${idx}`}
                className={`w-[280px] md:w-80 shrink-0 group bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative mt-8 ${styles.border}`}
              >
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 ${styles.bg} rounded-full flex items-center justify-center ${styles.bgHover} transition-colors duration-300`}>
                  <svg 
                    className={`w-7 h-7 ${styles.text} group-hover:text-white transition-colors duration-300`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-8">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            )})}
          </div>

          {/* Bloque 2 (Duplicado para efecto visual Seamless) */}
          <div className="flex shrink-0 items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll gap-6 px-3" aria-hidden="true">
            {sliderCards.map((card, idx) => {
              const styles = colorStyles[card.colorKey] || colorStyles['rojo-ucasal'];
              return (
              <div
                key={`block2-${idx}`}
                className={`w-[280px] md:w-80 shrink-0 group bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative mt-8 ${styles.border}`}
              >
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 ${styles.bg} rounded-full flex items-center justify-center ${styles.bgHover} transition-colors duration-300`}>
                  <svg 
                    className={`w-7 h-7 ${styles.text} group-hover:text-white transition-colors duration-300`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-8">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            )})}
          </div>

        </div>

      </div>
    </section>
  );
}
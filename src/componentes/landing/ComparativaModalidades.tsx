import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const itemsDistancia = [
  { texto: 'Rendís tus exámenes en sede física de UCASAL' },
  { texto: 'Acceso completo al campus virtual' },
  { texto: 'Videoclases sincrónicas y asincrónicas, todas grabadas' },
  { texto: 'Bibliografía digital, foros y podcast' },
  { texto: 'Cursada intensiva, aprende todo en un semestre' },
  { texto: 'Acompañamiento docente continuo' },
  { texto: 'Título con validez nacional oficial' },
];

const itemsModoHome = [
  { texto: 'Rendís tus exámenes 100% online desde casa' },
  { texto: 'Acceso completo al campus virtual' },
  { texto: 'Videoclases sincrónicas y asincrónicas, todas grabadas' },
  { texto: 'Bibliografía digital, foros y podcast' },
  { texto: 'Cursada intensiva, aprende todo en un semestre' },
  { texto: 'Adaptás el estudio a tus tiempos y lugar' },
  { texto: 'Título con validez nacional oficial' },
];

interface CardModalidadProps {
  tipo: 'distancia' | 'home';
  titulo: string;
  subtitulo: string;
  items: { texto: string }[];
  icono: React.ReactNode;
  highlightedIndex: number;
  inSlider?: boolean;
}

function CardModalidad({ tipo, titulo, subtitulo, items, icono, highlightedIndex, inSlider }: CardModalidadProps) {
  const esHome = tipo === 'home';
  const colorBg = esHome ? 'bg-(--rojo-ucasal)' : 'bg-(--azul-ucasal)';
  const colorText = esHome ? 'text-(--rojo-ucasal)' : 'text-(--azul-ucasal)';
  const colorBorder = esHome ? 'border-(--rojo-ucasal)' : 'border-(--azul-ucasal)';
  const colorBgLight = esHome ? 'bg-(--rojo-ucasal)/8' : 'bg-(--azul-ucasal)/8';
  const colorDestacadoBg = esHome ? 'bg-(--rojo-ucasal)/12' : 'bg-(--azul-ucasal)/12';
  const colorDestacadoBorder = esHome ? 'border-(--rojo-ucasal)/40' : 'border-(--azul-ucasal)/40';

  const card = (
    <>
      {/* Header */}
      <div className={`${colorBg} px-4 py-4 flex items-center gap-4`}>
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
          {icono}
        </div>
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{subtitulo}</p>
          <h3 className="text-white text-lg font-black leading-tight">{titulo}</h3>
        </div>
      </div>

      {/* Items */}
      <div className={`${colorBgLight} px-4 py-4 flex flex-col gap-1 flex-1`}>
        {items.map((item, i) => {
          const isHighlighted = i === highlightedIndex;
          return (
            <div
              key={i}
              className="relative flex items-start gap-2 sm:gap-3 rounded-xl px-3 py-2.5"
            >
              {isHighlighted && (
                <motion.div
                  {...(!inSlider && { layoutId: `highlight-${tipo}` })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={inSlider ? { duration: 0.2 } : { type: 'spring', stiffness: 200, damping: 38 }}
                  className={`absolute inset-0 rounded-xl border ${colorDestacadoBorder} ${colorDestacadoBg}`}
                />
              )}
              <div className={`relative z-10 shrink-0 mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full ${colorBg} flex items-center justify-center`}>
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`relative z-10 text-xs sm:text-sm leading-snug transition-all duration-300 ${
                isHighlighted ? `font-bold ${colorText}` : 'text-gray-700 font-medium'
              }`}>
                {item.texto}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );

  if (inSlider) {
    return (
      <div className={`flex flex-col rounded-2xl border-2 ${colorBorder} overflow-hidden shadow-sm`}>
        {card}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: esHome ? 0.15 : 0 }}
      className={`flex flex-col rounded-2xl border-2 ${colorBorder} overflow-hidden shadow-sm`}
    >
      {card}
    </motion.div>
  );
}

export default function ComparativaModalidades() {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const totalItems = itemsDistancia.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(prev => (prev + 1) % totalItems);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalItems]);

  const goTo = (index: number) => setActiveCard(index);

  const cards = [
    {
      tipo: 'distancia' as const,
      subtitulo: 'Modalidad',
      titulo: 'A Distancia',
      items: itemsDistancia,
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      tipo: 'home' as const,
      subtitulo: 'Modalidad',
      titulo: 'Modo Home',
      items: itemsModoHome,
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-(--ucasal-gray-light) py-6 sm:py-12" id="modalidades">
      <div className="contenedor">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="mb-4 sm:mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-(--azul-ucasal) tracking-tight">
            Conocé nuestras <span className='text-(--rojo-ucasal)'>modalidades</span>
          </h2>
        </motion.div>

        {/* Mobile: slider */}
        <div className="lg:hidden ">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-4">
            {cards.map((card, i) => {
              const isActive = i === activeCard;
              const colorActive = card.tipo === 'home' ? 'bg-(--rojo-ucasal)' : 'bg-(--azul-ucasal)';
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive ? `${colorActive} text-white shadow-sm` : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {card.titulo}
                </button>
              );
            })}
          </div>

          {/* Animated card */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `${-activeCard * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 40 }}
              onPanEnd={(_, info) => {
                if (info.offset.x < -50 && activeCard < cards.length - 1) goTo(activeCard + 1);
                if (info.offset.x > 50 && activeCard > 0) goTo(activeCard - 1);
              }}
            >
              {cards.map((card) => (
                <div key={card.tipo} className="w-full shrink-0 select-none px-2">
                  <CardModalidad
                    inSlider
                    {...card}
                    highlightedIndex={highlightedIndex}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {cards.map((card, i) => {
              const isActive = i === activeCard;
              const dotColor = card.tipo === 'home' ? 'bg-(--rojo-ucasal)' : 'bg-(--azul-ucasal)';
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? `w-6 ${dotColor}` : 'w-2 bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
          {cards.map((card) => (
            <CardModalidad
              key={card.tipo}
              {...card}
              highlightedIndex={highlightedIndex}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const IconPin = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconSede = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

/* ── Features bar data ── */
const features = [
  { label: 'Clases en vivo\ny grabadas', iconSrc: './icons/clases.svg' },
  { label: 'Campus virtual\n24/7', iconSrc: './icons/campus-virtual.svg' },
  { label: 'Acompañamiento\ndocente', iconSrc: './icons/docente.svg' },
  { label: 'Título oficial\ncon validez nacional', iconSrc: './icons/validacion.svg' },
];

/* ── Card de modalidad ── */
function CardModalidad({ tipo }: { tipo: 'online' | 'home' }) {
  const esHome = tipo === 'home';
  const color = esHome ? '--rojo-ucasal' : '--azul-ucasal';

  return (
    <div className={`max-sm:rounded-t-none rounded-2xl border ${esHome ? 'border-(--rojo-ucasal)/20 bg-(--rojo-ucasal)/4' : 'border-(--azul-ucasal)/20 bg-(--azul-ucasal)/4'} p-5 sm:p-6 flex flex-col gap-4 h-full`}>
      {/* Header con ícono + título */}
      <div className="flex items-center gap-4">
        <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] ${esHome ? 'bg-(--rojo-ucasal)/10' : 'bg-(--azul-ucasal)/10'}`}>
          {esHome
            ? <img src="./icons/home.svg" className={`w-10 h-10 sm:w-14 sm:h-14`} alt="Icono modo Home" style={{ color: `var(${color})!important` }}/>
            : <img src="./icons/online.svg" className={`w-10 h-10 sm:w-14 sm:h-14`} alt="Icono modo Online" style={{ color: `var(${color})!important` }}/>
          }
        </div>
        <div>
          <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-(${color}) bg-(${color})/10 rounded-2xl text-center px-3 py-0.5 mb-1`}>
            Modalidad
          </span>
          <h3 className={`text-xl sm:text-2xl font-black text-(${color}) leading-tight uppercase`}>
            {esHome ? 'Modo Home' : 'Online'}
          </h3>
        </div>
        {/* Ícono secundario (laptop/casa) */}
        <div className="ml-auto hidden sm:block">
          {esHome
            ? <img src="./icons/home.svg" className="w-12 h-12 opacity-15" alt="" />
            : <img src="./icons/campus-virtual.svg" className="w-12 h-12 opacity-15" alt="" />
          }
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col gap-4">
        {/* Item 1: ubicación */}
        <div className="flex items-start gap-3">
          <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${esHome ? 'bg-(--rojo-ucasal)/8' : 'bg-(--azul-ucasal)/8'}`}>
            <IconPin className={`w-5 h-5 text-(${color})`} />
          </div>
          <div className="pt-1">
            <p className="text-sm text-gray-700 leading-snug">
              {esHome
                ? <><span className={`font-bold text-(${color})`}>Estudia desde cualquier parte del mundo</span><br /> Ideal si vivís a más de 100 km de una sede</>
                : <><span className={`font-bold text-(${color})`}>Cursá online, junto a una sede cerca tuyo</span><br />Ideal si vivís a menos de 100 km de una sede UCASAL</>
              }
            </p>
          </div>
        </div>
        {/* Item 2: exámenes */}
        <div className="flex items-start gap-3">
          <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${esHome ? 'bg-(--rojo-ucasal)/8' : 'bg-(--azul-ucasal)/8'}`}>
            <IconSede className={`w-5 h-5 text-(${color})`} />
          </div>
          <div className="pt-1">
            {esHome ? (
              <p className="text-sm text-gray-700 leading-snug">
                Rendís <span className={`font-bold text-(${color})`}>100% online, sin trasladarte,</span><br />
                incluidos parciales y finales.
              </p>
            ) : (
              <p className="text-sm text-gray-700 leading-snug">
                Cursás online y rendís tus <span className={`font-bold text-(${color})`}>exámenes finales de forma presencial.</span><br />
                Vas a la sede solo cuando te toca rendir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparativaModalidades({ onSubPage }: { onSubPage?: boolean }) {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="w-full py-8 sm:py-14" id="modalidades">
      <div className={`contenedor ${onSubPage ? '' : 'lg:mx-24'}`}>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="text-center mb-2"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[2.6rem] font-black text-(--azul-ucasal) tracking-tight leading-tight">
            Estudiá online, <span className="italic text-(--rojo-ucasal)">a tu manera</span>
          </h2>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-sm sm:text-base text-gray-500 text-center max-w-xl mx-auto mb-6 sm:mb-8"
        >
          Según donde estés te ofrecemos la <strong className="text-(--azul-ucasal)">modalidad que mejor se adapta a vos.</strong>
        </motion.p>

        {/* Barra de features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="rounded-2xl border border-(--azul-ucasal)/10 bg-(--azul-ucasal)/4 p-4 sm:p-5 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className={`flex flex-col items-center text-center gap-2 
              ${window.innerWidth >= 1024 && i < features.length - 1 ? 'border-r-2 border-(--azul-ucasal)/20' : ''}`}>
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-(--azul-ucasal)/8 flex items-center justify-center">
                  <img src={f.iconSrc} className="w-10 h-10" alt="" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-(--azul-ucasal) whitespace-pre-line leading-tight">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop: 2 cards con flechas centrales */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <CardModalidad tipo="online" />
          </motion.div>

          {/* Centro: flechas + pin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col items-center gap-1 px-2"
          >
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <IconPin className="w-10 h-10 icon-color-anim" />
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <CardModalidad tipo="home" />
          </motion.div>
        </div>

        {/* Mobile: carousel con tabs */}
        <div className="lg:hidden">
          <div className="flex gap-2 bg-gray-100 rounded-2xl py-3 px-6 rounded-b-none border border-b-0 border-gray-200">
            {(['online', 'home'] as const).map((tipo, i) => {
              const isActive = i === activeCard;
              const label = tipo === 'home' ? 'Modo Home' : 'Online';
              const colorActive = tipo === 'home' ? 'bg-(--rojo-ucasal)' : 'bg-(--azul-ucasal)';
              return (
                <button
                  key={tipo}
                  onClick={() => setActiveCard(i)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive ? `${colorActive} text-white shadow-sm` : 'bg-white text-gray-500 border border-gray-400'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, x: activeCard === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeCard === 0 ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              <CardModalidad tipo={activeCard === 0 ? 'online' : 'home'} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

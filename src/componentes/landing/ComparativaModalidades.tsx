import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ── Iconos reutilizables ── */
const IconClases = ({ className = 'w-7 h-7' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);
const IconCampus = ({ className = 'w-7 h-7' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconDocente = ({ className = 'w-7 h-7' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconTitulo = ({ className = 'w-7 h-7' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
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
const IconGlobe = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
  </svg>
);
const IconHome = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className={className} fill="currentColor" viewBox="0 0 50 50">
    <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z" />
  </svg>
);

/* ── Features bar data ── */
const features = [
  { label: 'Clases en vivo\ny grabadas', icon: <IconClases /> },
  { label: 'Campus virtual\n24/7', icon: <IconCampus /> },
  { label: 'Acompañamiento\ndocente', icon: <IconDocente /> },
  { label: 'Título oficial\ncon validez nacional', icon: <IconTitulo /> },
];

/* ── Card de modalidad ── */
function CardModalidad({ tipo }: { tipo: 'online' | 'home' }) {
  const esHome = tipo === 'home';
  const color = esHome ? '--rojo-ucasal' : '--azul-ucasal';

  return (
    <div className={`max-sm:rounded-t-none rounded-2xl border ${esHome ? 'border-(--rojo-ucasal)/20 bg-(--rojo-ucasal)/4' : 'border-(--azul-ucasal)/20 bg-(--azul-ucasal)/4'} p-5 sm:p-6 flex flex-col gap-4`}>
      {/* Header con ícono + título */}
      <div className="flex items-center gap-4">
        <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] ${esHome ? 'bg-(--rojo-ucasal)/10' : 'bg-(--azul-ucasal)/10'}`}>
          {esHome
            ? <IconHome className={`w-8 h-8 sm:w-10 sm:h-10 text-(${color})`} />
            : <IconGlobe className={`w-8 h-8 sm:w-10 sm:h-10 text-(${color})`} />
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
            ? <IconHome className={`w-12 h-12 text-(${color}) opacity-15`} />
            : <IconCampus className={`w-12 h-12 text-(${color}) opacity-15`} />
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
                ? <><span className={`font-bold text-(${color})`}>Lejos de una sede</span><br />(más de 100 km)</>
                : <><span className={`font-bold text-(${color})`}>Cerca de una sede</span><br />(hasta 100 km)</>
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
                Rendís todo <span className={`font-bold text-(${color})`}>100% online,</span><br />
                incluidos parciales y finales.
              </p>
            ) : (
              <p className="text-sm text-gray-700 leading-snug">
                Rendís tus finales <span className={`font-bold text-(${color})`}>en sede UCASAL.</span><br />
                Vas a la sede más cercana a rendir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparativaModalidades() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="w-full py-8 sm:py-14" id="modalidades">
      <div className="contenedor lg:mx-24">

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
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-(--azul-ucasal)/8 flex items-center justify-center text-(--azul-ucasal)">
                  {f.icon}
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
              <IconPin className="w-6 h-6 text-(--azul-ucasal)" />
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

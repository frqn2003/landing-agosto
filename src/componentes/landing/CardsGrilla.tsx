import { motion } from 'framer-motion';

const colorStyles: Record<string, { border: string, bg: string, bgHover: string, text: string }> = {
  'rojo-ucasal': {
    border: 'hover:border-[#ee1818]/30', /* fallbacks for tailwind dynamic classes */
    bg: 'bg-(--rojo-ucasal)/10',
    bgHover: 'group-hover:bg-(--rojo-ucasal)',
    text: 'text-(--rojo-ucasal)'
  },
  'azul-ucasal': {
    border: 'hover:border-[#022130]/30', /* fallbacks for tailwind dynamic classes */
    bg: 'bg-(--azul-ucasal)/10',
    bgHover: 'group-hover:bg-(--azul-ucasal)',
    text: 'text-(--azul-ucasal)'
  }
};

const mobileCards = [
  {
    title: '¿Qué es?',
    description: 'Una oportunidad para iniciar tu carrera en la segunda mitad del año y no perder el ciclo.',
    colorKey: 'rojo-ucasal',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    title: '¿Cuándo?',
    description: 'Las clases inician oficialmente en Agosto por la plataforma virtual.',
    colorKey: 'rojo-ucasal',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    title: 'Modalidad',
    description: 'Modelo educativo 100% online y asincrónico integral gestionado por Campus Virtual.',
    colorKey: 'rojo-ucasal',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  }
];

export default function CardsGrilla() {
  return (
    <div className="flex flex-col gap-6 lg:hidden w-full mt-6">
      {mobileCards.map((card, idx) => {
        const styles = colorStyles[card.colorKey] || colorStyles['rojo-ucasal'];
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={`mobile-card-${idx}`}
            className={`w-full group bg-white rounded-xl p-5 sm:p-6 shadow-md transition-all duration-300 border border-gray-100 relative mt-4 hover:shadow-lg ${styles.border}`}
          >
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 ${styles.bg} rounded-full flex items-center justify-center ${styles.bgHover} transition-colors duration-300`}>
              <svg 
                className={`w-5 h-5 ${styles.text} group-hover:text-white transition-colors duration-300`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
              >
                {card.icon}
              </svg>
            </div>
            <h3 className="text-[15px] font-bold text-(--azul-ucasal) mt-2 mb-2 text-center leading-tight">
              {card.title}
            </h3>
            <p className="text-[13px] text-(--ucasal-black) leading-normal opacity-80 text-center font-normal px-2">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

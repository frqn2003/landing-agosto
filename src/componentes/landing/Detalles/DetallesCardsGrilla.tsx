import { motion } from 'framer-motion';


const mobileCards = [
  {
    title: '¿Por qué empezar en Agosto?',
    description: 'Comenzá tu carrera universitaria sin esperar al próximo año. Aprovechá este ingreso para avanzar antes, ganar tiempo y acercarte más rápido a tu título profesional.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    title: '¿Cómo podés empezar ahora?',
    description: '¡Las inscripciones ya están abiertas! Iniciando en agosto, tenés el tiempo ideal para organizarte, completar tu admisión y dar el primer paso en esta nueva etapa académica.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    title: '¿Cómo vas a estudiar?',
    description: 'Estudiá 100% online y a tu ritmo. Nuestro modelo a distancia te permite avanzar desde el primer día con total flexibilidad, gestionando tu cursada a través del Campus Virtual.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  }
];

export default function CardsGrilla() {
  return (
    <div className="flex flex-col gap-6 lg:hidden w-full mt-6">
      {mobileCards.map((card, idx) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={`mobile-card-${idx}`}
            className={`w-full group bg-white rounded-xl p-5 sm:p-6 shadow-md transition-all duration-300 border border-gray-100 relative mt-4 hover:shadow-lg`}
          >
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-(--rojo-ucasal)/10 rounded-full flex items-center justify-center group-hover:bg-(--rojo-ucasal) transition-colors duration-300`}>
              <svg 
                className={`w-5 h-5 text-(--rojo-ucasal) group-hover:text-white transition-colors duration-300`}
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

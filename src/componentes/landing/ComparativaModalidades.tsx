import { motion } from 'framer-motion';

const itemsDistancia = [
  { texto: 'Rendís tus exámenes en sede física de UCASAL', destacado: true },
  { texto: 'Acceso completo al campus virtual', destacado: false },
  { texto: 'Videoclases sincrónicas y asincrónicas, todas grabadas', destacado: false },
  { texto: 'Bibliografía digital, foros y podcast', destacado: false },
  { texto: 'Cursada intensiva, aprende todo en un semestre', destacado: false },
  { texto: 'Acompañamiento docente continuo', destacado: false },
  { texto: 'Título con validez nacional oficial', destacado: false },
];

const itemsModoHome = [
  { texto: 'Rendís tus exámenes 100% online desde casa', destacado: true },
  { texto: 'Acceso completo al campus virtual', destacado: false },
  { texto: 'Videoclases sincrónicas y asincrónicas, todas grabadas', destacado: false },
  { texto: 'Bibliografía digital, foros y podcast', destacado: false },
  { texto: 'Cursada intensiva, aprende todo en un semestre', destacado: false },
  { texto: 'Adaptás el estudio a tus tiempos y lugar', destacado: false },
  { texto: 'Título con validez nacional oficial', destacado: false },
];

interface CardModalidadProps {
  tipo: 'distancia' | 'home';
  titulo: string;
  subtitulo: string;
  items: { texto: string; destacado: boolean }[];
  icono: React.ReactNode;
}

function CardModalidad({ tipo, titulo, subtitulo, items, icono }: CardModalidadProps) {
  const esHome = tipo === 'home';
  const colorBg = esHome ? 'bg-(--rojo-ucasal)' : 'bg-(--azul-ucasal)';
  const colorText = esHome ? 'text-(--rojo-ucasal)' : 'text-(--azul-ucasal)';
  const colorBorder = esHome ? 'border-(--rojo-ucasal)' : 'border-(--azul-ucasal)';
  const colorBgLight = esHome ? 'bg-(--rojo-ucasal)/8' : 'bg-(--azul-ucasal)/8';
  const colorDestacadoBg = esHome ? 'bg-(--rojo-ucasal)/12' : 'bg-(--azul-ucasal)/12';
  const colorDestacadoBorder = esHome ? 'border-(--rojo-ucasal)/40' : 'border-(--azul-ucasal)/40';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: esHome ? 0.15 : 0 }}
      className={`flex flex-col rounded-2xl border-2 ${colorBorder} overflow-hidden shadow-sm`}
    >
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
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 sm:gap-3 rounded-xl px-3 py-2.5 ${
              item.destacado
                ? `${colorDestacadoBg} border ${colorDestacadoBorder}`
                : ''
            }`}
          >
            <div className={`shrink-0 mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full ${colorBg} flex items-center justify-center`}>
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className={`text-xs sm:text-sm leading-snug ${item.destacado ? `font-bold ${colorText}` : 'text-gray-700 font-medium'}`}>
              {item.texto}
              {item.destacado}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ComparativaModalidades() {
  return (
    <section className="w-full bg-(--ucasal-gray-light) py-12" id="modalidades">
      <div className="contenedor">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-(--azul-ucasal) tracking-tight">
            Conocé nuestras <span className='text-(--rojo-ucasal)'>modalidades</span>
          </h2>
        </motion.div>

        {/* Cards comparativas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardModalidad
            tipo="distancia"
            subtitulo="Modalidad"
            titulo="A Distancia"
            items={itemsDistancia}
            icono={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <CardModalidad
            tipo="home"
            subtitulo="Modalidad"
            titulo="Modo Home"
            items={itemsModoHome}
            icono={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

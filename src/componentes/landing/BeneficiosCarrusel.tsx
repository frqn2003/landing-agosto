import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Beneficio {
  id: number;
  tag: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  publico: string;
  icon: React.ReactNode;
  color: 'rojo' | 'azul';
}

const beneficios: Beneficio[] = [
  {
    id: 1,
    tag: 'Experiencia',
    titulo: 'Trayectoria académica',
    descripcion: 'Estudiá con el acompañamiento de una institución con experiencia y camino recorrido en formación universitaria.',
    detalle: 'Formate en una universidad con trayectoria, que respalda cada etapa de tu formación con experiencia académica, solidez institucional y compromiso con tu desarrollo profesional.',
    publico: 'Especialmente para vos si ya postergaste empezar en marzo.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    color: 'rojo',
  },
  {
    id: 2,
    tag: 'Confianza',
    titulo: 'Red de sedes en todo el país',
    descripcion: 'Contá con el respaldo de una universidad con presencia federal y alcance en distintas regiones.',
    detalle: 'UCASAL lleva más de 60 años formando profesionales. El título que obtenés tiene validez nacional y es reconocido por el Ministerio de Educación, igual que el presencial.',
    publico: 'Para quienes tienen dudas sobre si estudiar online es "lo mismo" que el presencial.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'azul',
  },
  {
    id: 3,
    tag: 'Inversión',
    titulo: 'Una cuota que vale lo que pagás',
    descripcion: 'Invertís en un título universitario oficial con acompañamiento real, campus virtual completo y docentes accesibles.',
    detalle: 'Contás con financiamiento en cuotas, becas disponibles y la posibilidad de trabajar mientras estudiás. La flexibilidad del cursado hace que no tengas que elegir entre estudiar y generar ingresos.',
    publico: 'Para quienes analizan si el costo se justifica o si pueden bancarse estudiar y trabajar al mismo tiempo.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'rojo',
  },
  {
    id: 4,
    tag: 'Futuro',
    titulo: 'Preparación para tu futuro laboral',
    descripcion: 'Elegí una carrera orientada a acompañar tu desarrollo profesional y ampliar tus oportunidades.',
    detalle: 'Formate con una propuesta académica pensada para vincular el aprendizaje con los desafíos del mundo laboral actual, desarrollando conocimientos y herramientas aplicables a tu crecimiento profesional.',
    publico: 'Clave para quienes trabajan y quieren que su título les abra puertas concretas, no solo sea un papel.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'azul',
  },
  {
    id: 5,
    tag: 'Equivalencias',
    titulo: 'Consultá por equivalencias',
    descripcion: 'Aprovechá tu recorrido académico y conocé si las materias que ya cursaste pueden ser reconocidas',
    detalle: 'Podés continuar tu formación de manera más ágil, aprovechando los estudios previos realizados y avanzando con una propuesta que valore tu esfuerzo académico y tu tiempo.',
    publico: 'Para quienes tienen un historial académico previo y quieren evitar repetir contenidos.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'rojo',
  }
];

const colorClases = {
  rojo: {
    bg: 'bg-(--rojo-ucasal)',
    bgLight: 'bg-(--rojo-ucasal)/10',
    text: 'text-(--rojo-ucasal)',
    border: 'border-(--rojo-ucasal)',
    tag: 'bg-(--rojo-ucasal)/10 text-(--rojo-ucasal)',
  },
  azul: {
    bg: 'bg-(--azul-ucasal)',
    bgLight: 'bg-(--azul-ucasal)/10',
    text: 'text-(--azul-ucasal)',
    border: 'border-(--azul-ucasal)',
    tag: 'bg-(--azul-ucasal)/10 text-(--azul-ucasal)',
  },
};

export default function BeneficiosCarrusel() {
  const [activo, setActivo] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reiniciarTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActivo(prev => (prev + 1) % beneficios.length)
    }, 10000)
  }

  const irA = (i: number) => {
    setActivo(i)
    reiniciarTimer()
  }

  const pausar = () => { if (timerRef.current) clearInterval(timerRef.current) }

  useEffect(() => {
    reiniciarTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const beneficio = beneficios[activo];
  const clases = colorClases[beneficio.color];

  return (
    <div className="w-full bg-white contenedor py-10" id='beneficios' onMouseEnter={pausar} onMouseLeave={reiniciarTimer}>
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold degrade-azul tracking-tight">
          Empezá en <span className="degrade-rojo">agosto</span>, tu título te espera
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Lista de beneficios — selector */}
        <div className="lg:col-span-2 lg:flex flex-col gap-2 hidden h-full justify-center items-center">
          {beneficios.map((b, i) => {
            const c = colorClases[b.color];
            const esActivo = activo === i;
            return (
              <button
                key={b.id}
                onClick={() => irA(i)}
                className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer  ${esActivo
                    ? `${c.border} bg-(--ucasal-gray-light) shadow-sm`
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {/* Ícono */}
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${esActivo ? `${c.bg} text-white` : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  {b.icon}
                </div>
                {/* Texto */}
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${esActivo ? c.text : 'text-gray-400'}`}>
                    {b.tag}
                  </span>
                  <span className={`text-sm font-bold leading-snug truncate ${esActivo ? 'text-(--azul-ucasal)' : 'text-gray-600'}`}>
                    {b.titulo}
                  </span>
                </div>
                {/* Indicador activo */}
                {esActivo && (
                  <div className={`ml-auto shrink-0 w-1.5 h-8 rounded-full ${c.bg}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel de detalle */}
        <div className="lg:col-span-3 h-fit sm:h-110 lg:h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={beneficio.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border-2 ${clases.border} p-6 md:p-8 flex flex-col gap-5 h-full`}
            >
              {/* Ícono grande */}
              <section className="flex flex-row sm:flex-col items-center sm:items-start gap-1 sm:gap-4">
                <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${clases.bg} text-white shadow-md`}>
                  {beneficio.icon}
                </div>
                {/* Título */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-(--azul-ucasal) leading-tight">
                  {beneficio.titulo}
                </h3>
              </section>


              {/* Descripción principal */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {beneficio.descripcion}
              </p>
              {/* Detalle expandido */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {beneficio.detalle}
              </p>

              {/* Público objetivo */}
              <div className={`flex items-start gap-3 rounded-xl ${clases.bgLight} px-4 py-3 mt-auto`}>
                {/* <svg className={`w-4 h-4 shrink-0 mt-0.5 ${clases.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg> */}
                <p className={`text-[10px] font-medium ${clases.text}`}>
                  {beneficio.publico}
                </p>
              </div>

              {/* Navegación */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {beneficios.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => irA(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activo === i ? `w-6 ${clases.bg}` : 'w-1.5 bg-gray-200'
                        }`}
                      aria-label={`Ir al beneficio ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => irA((activo - 1 + beneficios.length) % beneficios.length)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
                    aria-label="Anterior"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => irA((activo + 1) % beneficios.length)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer ${clases.bg}`}
                    aria-label="Siguiente"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

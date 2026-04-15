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
    tag: 'Tiempo',
    titulo: 'No pierdas otro año esperando',
    descripcion: 'Cada mes que pasa es un mes menos en tu carrera. Agosto es tu segunda oportunidad para arrancar sin perder el ciclo lectivo.',
    detalle: 'El ingreso de agosto tiene el mismo valor académico que el de marzo. Al terminar el año, vas a estar exactamente en el mismo punto que tus compañeros que empezaron antes.',
    publico: 'Especialmente para vos si ya postergaste empezar en marzo.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    publico: 'Pensado para quienes tienen dudas sobre si estudiar online es "lo mismo".',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    publico: 'Para quienes analizan si el costo se justifica frente a otras opciones.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'rojo',
  },
  {
    id: 4,
    tag: 'Velocidad',
    titulo: 'Cursado intensivo',
    descripcion: 'Avanzá con una modalidad pensada para ayudarte a progresar de manera más ágil.',
    detalle: 'El ingreso de agosto tiene el mismo valor académico que el de marzo. Al terminar el año, vas a estar exactamente en el mismo punto que tus compañeros que empezaron antes.',
    publico: 'Para los que no quieren esperar años para tener el título en la mano.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'azul',
  },
  {
    id: 5,
    tag: 'Futuro',
    titulo: 'Preparación para tu futuro laboral',
    descripcion: 'Elegí una carrera orientada a acompañar tu desarrollo profesional y ampliar tus oportunidades',
    detalle: 'Formate con una propuesta académica pensada para vincular el aprendizaje con los desafíos del mundo laboral actual, desarrollando conocimientos y herramientas aplicables a tu crecimiento profesional.',
    publico: 'Clave para quienes trabajan, tienen hijos o viven lejos de un centro educativo.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'rojo',
  },
  {
    id: 6,
    tag: 'Modalidad',
    titulo: 'Estudiá desde cualquier lugar',
    descripcion: 'Accedé a tu carrera sin necesidad de trasladarte y organizá tu cursado desde donde estés.',
    detalle: 'El cursado semestral intensivo online combina la profundidad académica de un programa universitario con la agilidad de una modalidad 100% digital.',
    publico: 'Para quienes quieren entender exactamente cómo funciona el modelo antes de inscribirse.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'azul',
  },
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
    <div className="w-full bg-white contenedor py-12" id='beneficios' onMouseEnter={pausar} onMouseLeave={reiniciarTimer}>
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold degrade-azul tracking-tight">
          Empezá en <span className="degrade-rojo">agosto</span>, tu título te espera
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Seleccioná el que más resuena con tu situación actual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Lista de beneficios — selector */}
        <div className="lg:col-span-2 lg:flex flex-col gap-2 hidden">
          {beneficios.map((b, i) => {
            const c = colorClases[b.color];
            const esActivo = activo === i;
            return (
              <button
                key={b.id}
                onClick={() => irA(i)}
                className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${esActivo
                    ? `${c.border} bg-(--ucasal-gray-light) shadow-sm`
                    : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
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
        <div className="lg:col-span-3 h-120 sm:h-110 lg:h-full">
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
              <section className="flex flex-row sm:flex-col items-center sm:items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${clases.bg} text-white shadow-md`}>
                  {beneficio.icon}
                </div>
                {/* Título */}
                <h3 className="text-xl md:text-2xl font-black text-(--azul-ucasal) leading-tight">
                  {beneficio.titulo}
                </h3>
              </section>


              {/* Descripción principal */}
              <p className="text-base text-gray-700 leading-relaxed">
                {beneficio.descripcion}
              </p>
              {/* Detalle expandido */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {beneficio.detalle}
              </p>

              {/* Público objetivo */}
              <div className={`flex items-start gap-3 rounded-xl ${clases.bgLight} px-4 py-3 mt-auto`}>
                <svg className={`w-4 h-4 shrink-0 mt-0.5 ${clases.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className={`text-xs font-medium ${clases.text}`}>
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

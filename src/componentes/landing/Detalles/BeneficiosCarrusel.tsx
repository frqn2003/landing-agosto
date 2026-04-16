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
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'rojo',
  },
  {
    id: 2,
    tag: 'Confianza',
    titulo: 'Más de 60 años formando profesionales',
    descripcion: 'El título que obtenés tiene validez nacional, reconocido por el Ministerio de Educación. No es un certificado: es un título universitario oficial.',
    detalle: 'UCASAL tiene presencia federal con sedes en todo el país. Cuando terminés, tu diploma vale igual que el de cualquier egresado presencial de la institución.',
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
    titulo: 'Becas, cuotas y financiamiento real',
    descripcion: 'Accedé a becas disponibles, cuotas accesibles y la posibilidad de trabajar mientras cursás. No tenés que elegir entre estudiar y generar ingresos.',
    detalle: 'El segundo ingreso de agosto te da la misma carga horaria que el de marzo, con la ventaja de que ya podés organizarte económicamente antes de arrancar.',
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
    titulo: 'Formación orientada al mundo laboral',
    descripcion: 'Cursás con una propuesta académica que conecta el aprendizaje con los desafíos reales del mercado. Salís con herramientas aplicables desde el primer día.',
    detalle: 'Las carreras de UCASAL están diseñadas para que puedas insertarte o crecer en tu sector laboral. El ingreso en agosto te da ventaja: arrancás antes y llegás antes.',
    publico: 'Clave para quienes trabajan y quieren que su título les abra puertas concretas, no solo sea un papel.',
    icon: (
      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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

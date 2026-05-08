import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface Carta {
  id: number;
  titulo: string;
  descripcion: string;
  icon: React.ReactNode;
  color: 'rojo' | 'azul';
}

const cartas: Carta[] = [
  {
    id: 1,
    titulo: 'Para quienes dan el primer paso',
    descripcion: 'Si estás empezando, iniciá tu carrera online con acompañamiento desde el primer día.',
    icon: (
      <img src={`${import.meta.env.BASE_URL}icons/primer-paso.svg`} className="w-9 h-9" alt="Primer paso" />
    ),
    color: 'rojo',
  },
  {
    id: 2,
    titulo: 'Para quienes van por todo',
    descripcion: 'Si trabajás o tenes muchas actividades, estudiá con clases online sin dejar tus responsabilidades.',
    icon: (
      <img src={`${import.meta.env.BASE_URL}icons/por-todo.svg`} className="w-9 h-9" alt="Por todo" />
    ),
    color: 'azul',
  },
  {
    id: 3,
    titulo: 'Para quienes buscan retomar su carrera',
    descripcion: 'Si ya empezaste una carrera, continuá con equivalencias y no pierdas lo que ya hiciste.',
    icon: (
      <img src={`${import.meta.env.BASE_URL}icons/retomar.svg`} className="w-9 h-9" alt="Retomar carrera" />
    ),
    color: 'rojo',
  },
];

const colorClases = {
  rojo: {
    bg: 'bg-(--rojo-ucasal)',
    bgLight: 'bg-(--rojo-ucasal)/10',
    text: 'text-(--rojo-ucasal)',
    border: 'border-(--rojo-ucasal)',
    dot: 'bg-(--rojo-ucasal)',
  },
  azul: {
    bg: 'bg-(--azul-ucasal)',
    bgLight: 'bg-(--azul-ucasal)/10',
    text: 'text-(--azul-ucasal)',
    border: 'border-(--azul-ucasal)',
    dot: 'bg-(--azul-ucasal)',
  },
};

const N = cartas.length;

function CardBeneficio({ carta, posicion, onClick }: { carta: Carta; posicion: 'centro' | 'lateral'; onClick?: () => void }) {
  const c = colorClases[carta.color];
  const esCentro = posicion === 'centro';

  return (
    <m.div
      layout
      animate={{
        scale: esCentro ? 1 : 0.8,
        filter: esCentro ? 'blur(0px)' : 'blur(2px)',
        opacity: esCentro ? 1 : 0.5,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onClick={onClick}
      style={{ willChange: 'transform, filter, opacity' }}
      className={`flex flex-col gap-4 rounded-2xl border-2 p-6 bg-white h-full max-w-sm ${esCentro ? `${c.border} shadow-xl` : 'border-gray-200 shadow-sm cursor-pointer hover:opacity-70 transition-opacity'}`}
    >
      {/* Icono */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.bg} text-white shadow-md self-start`}>
        {carta.icon}
      </div>
      {/* Título */}
      <h3 className={`font-black text-2xl leading-snug ${esCentro ? 'text-(--azul-ucasal)' : 'text-gray-500'}`}>
        {carta.titulo}
      </h3>
      {/* Descripción */}
      <p className={`text-base leading-relaxed ${esCentro ? 'text-gray-700' : 'text-gray-400'}`}>
        {carta.descripcion}
      </p>
    </m.div>
  );
}

export default function BeneficiosCarrusel({ onSubPage }: { onSubPage: boolean }) {
  const [activo, setActivo] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const reiniciarTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActivo(prev => (prev + 1) % N);
    }, 6000);
  };

  const irA = (i: number, direccion: 1 | -1) => {
    setDir(direccion);
    setActivo(i);
    reiniciarTimer();
  };

  const prev = () => irA((activo - 1 + N) % N, -1);
  const next = () => irA((activo + 1) % N, 1);

  const pausar = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    reiniciarTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const idxPrev = (activo - 1 + N) % N;
  const idxNext = (activo + 1) % N;

  return (
    <section
      className="w-full bg-white contenedor py-5 sm:py-10"
      id="beneficios"
      role="region"
      aria-label="Beneficios"
      onMouseEnter={pausar}
      onMouseLeave={reiniciarTimer}
    >
      {/* Encabezado */}
      <div className="mb-10 h-16 flex items-center">
        <h2 className='text-2xl lg:text-4xl font-semibold degrade-azul tracking-tight max-lg:text-center w-full'>
          Este es <span className="degrade-rojo">tu momento</span>. <br className='block lg:hidden'/>Que tu rutina no <span className="degrade-rojo">te detenga</span>
        </h2>
      </div>

      {/* Desktop: 3 cartas visibles */}
      <div className={`hidden lg:grid grid-cols-3 gap-4 items-center min-h-64 w-full overflow-hidden ${onSubPage ? '' : 'px-20 2xl:px-60'}`}>
        <AnimatePresence mode="popLayout" custom={dir}>
          <m.div
            key={`prev-${idxPrev}`}
            className="h-full"
            custom={dir}
            initial={{ opacity: 0, x: dir * -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <CardBeneficio carta={cartas[idxPrev]} posicion="lateral" onClick={prev} />
          </m.div>
          <m.div
            key={`center-${activo}`}
            className="h-full"
            custom={dir}
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <CardBeneficio carta={cartas[activo]} posicion="centro" />
          </m.div>
          <m.div
            key={`next-${idxNext}`}
            className="h-full"
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * 60 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <CardBeneficio carta={cartas[idxNext]} posicion="lateral" onClick={next} />
          </m.div>
        </AnimatePresence>
      </div>

      {/* Mobile: carta central con swipe y flechas */}
      <div className="lg:hidden flex flex-col gap-6">
        <div className="flex items-center gap-3 justify-center">
          {/* Flecha izquierda */}
          <button
            onClick={prev}
            className="shrink-0 size-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
            aria-label="Anterior"
          >
            <svg className="size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carta con drag */}
          <div className="flex-1 flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <m.div
                key={activo}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) { setDir(1); next(); }
                  else if (info.offset.x > 50) { setDir(-1); prev(); }
                }}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; pausar(); }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const delta = e.changedTouches[0].clientX - touchStartX.current;
                  if (delta < -50) next();
                  else if (delta > 50) prev();
                  touchStartX.current = null;
                  reiniciarTimer();
                }}
              >
                <CardBeneficio carta={cartas[activo]} posicion="centro" />
              </m.div>
            </AnimatePresence>
          </div>

          {/* Flecha derecha */}
          <button
            onClick={next}
            className="shrink-0 size-10 rounded-full bg-(--azul-ucasal) flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Siguiente"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots — compartidos */}
      <div className="flex justify-center gap-2 mt-6">
        {cartas.map((_, i) => {
          const c = colorClases[cartas[activo].color];
          return (
            <button
              key={i}
              onClick={() => irA(i, i > activo ? 1 : -1)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activo === i ? `w-6 ${c.dot}` : 'w-2 bg-gray-300'}`}
              aria-label={`Ir a carta ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

interface Carrera {
  nombre: string;
  descripcionCorta: string;
  slug: string;
  duracion: string;
  img: string;
}

export default function CardsCarreras(props: Carrera) {
  return (
    <section className="bg-white/90 backdrop-blur-xl p-3 px-4 rounded-xl shadow-sm border border-white/50 flex flex-col w-full max-w-sm transition-all duration-300 group/card has-[button:hover]:scale-105">
      <div className="relative w-full overflow-hidden rounded-lg aspect-square md:aspect-5/3 bg-gray-200">
        <img
          src={props.img}
          alt={props.nombre}
          className="w-full h-full object-cover object-center transition-transform duration-500 group"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-100 duration-300"></div>
        {/* Título dentro de la imagen solo en mobile (<768px) */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-3 bg-linear-to-t from-black/60 to-transparent sm:hidden">
          <h3 className="text-xs sm:text-lg xl:text-base font-bold leading-tight text-white">
            {props.nombre} 
          </h3>
        </div>
      </div>

      <div className="mt-3 flex-1 flex flex-col gap-3 justify-between">
        {/* Título debajo de la imagen solo en desktop (>=768px) */}
        <div className="hidden sm:flex items-center gap-2">
          <h3 className="text-lg xl:text-xl font-bold degrade-azul">
            {props.nombre}
          </h3>
        </div>

        <p className="text-[12px] sm:text-[13px] md:text-[15px] text-gray-800 leading-relaxed">
          {props.descripcionCorta}
        </p>

        {/* Footer de la Card */}
        <div className=" gap-3 flex-col flex 2xl:flex-row justify-between">
          {/* Duración */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-500">
              <svg className="w-[14px] h-[14px] xl:w-[18px] xl:h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-xs 2xl:text-[14.5px] text-gray-700">{props.duracion}</span>
            </div>
          </div>

          {/* Botón Ver Más */}
          <Link to={`/carreras/${props.slug}`} className="bg-(--rojo-ucasal) hover:bg-(--rojo-dark-ucasal) text-white border border-(--rojo-ucasal) shadow-sm transition-colors py-2 px-4 rounded-full font-bold text-[14px] gap-1 group/btn flex justify-center items-center max-xl:w-full">
            Ver más <span className="font-medium text-lg leading-none">+</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

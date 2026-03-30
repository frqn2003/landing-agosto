const carreras = [
  { nombre: "Abogacía", tipo: "Grado", duracion: "5 años", descripcion: "Formación jurídica integral para el ejercicio profesional en distintos ámbitos del derecho.", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Arquitectura", tipo: "Grado", duracion: "5 años", descripcion: "Diseño, planificación y construcción de espacios habitables innovadores y sostenibles.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Contador Público", tipo: "Grado", duracion: "4 años", descripcion: "Gestión contable, financiera e impositiva para el desarrollo integral de las organizaciones.", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Administración", tipo: "Grado", duracion: "4 años", descripcion: "Liderazgo, gestión resolutiva y dirección estratégica de empresas y emprendimientos.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Comercialización", tipo: "Grado", duracion: "4 años", descripcion: "Estrategias de marketing, análisis vanguardista de mercado y desarrollo de negocios creativos.", img: "https://images.unsplash.com/photo-1556761175-5973e87127b3?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Relaciones Int.", tipo: "Grado", duracion: "4 años", descripcion: "Análisis político, diplomacia activa y gestión estratégica de escenarios globales complejos.", img: "https://images.unsplash.com/photo-1529107386315-e1a6f205d6b4?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Recursos Humanos", tipo: "Grado", duracion: "4 años", descripcion: "Gestión integral del talento, desarrollo organizacional potenciado y bienestar laboral.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Psicología", tipo: "Grado", duracion: "5 años", descripcion: "Estudio clínico profundo del comportamiento humano y abordaje terapéutico holístico.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Comunicaciones", tipo: "Grado", duracion: "4 años", descripcion: "Producción de contenidos creativos, periodismo institucional y medios digitales modernos.", img: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Diseño Gráfico", tipo: "Grado", duracion: "4 años", descripcion: "Comunicación visual creativa, diseño multimedia disruptivo y creación de identidad de marca.", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Ingeniería en Informática", tipo: "Grado", duracion: "5 años", descripcion: "Desarrollo de software avanzado, diseño de sistemas de información y nuevas tecnologías.", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Ingeniería Civil", tipo: "Grado", duracion: "5 años", descripcion: "Diseño, cálculo preciso y ejecución de obras de infraestructura para el desarrollo urbano sostenido.", img: "https://images.unsplash.com/photo-1541888081625-546ac68aee7a?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Ingeniería Industrial", tipo: "Grado", duracion: "5 años", descripcion: "Optimización continua de procesos productivos y gestión eficiente y moderna de operaciones.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Veterinaria", tipo: "Grado", duracion: "5 años", descripcion: "Cuidado clínico de la salud animal, producción agropecuaria sustentable y salud pública.", img: "https://images.unsplash.com/photo-1628009368231-7bb7cb080d46?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Criminalística", tipo: "Grado", duracion: "4 años", descripcion: "Investigación científica metódica del delito, técnicas periciales e innovadoras forenses.", img: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Gestión Educativa", tipo: "Grado", duracion: "4 años", descripcion: "Conducción ética, planificación estratégica y evaluación integral de instituciones educativas.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Seguridad", tipo: "Grado", duracion: "4 años", descripcion: "Gestión integral y diseño de políticas efectivas de la seguridad ciudadana y corporativa.", img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Lic. en Criminología", tipo: "Grado", duracion: "4 años", descripcion: "Estudio analítico del comportamiento criminal, prevención del delito y políticas públicas.", img: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Tec. en Secretariado", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Asistencia dinámica de alta gerencia, organización empresarial y excelentes relaciones públicas.", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Tec. en Higiene", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Planificación metódica de prevención de riesgos y gestión ambiental en el entorno de trabajo.", img: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Tec. en Ceremonial", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Diseño riguroso y organización de eventos institucionales y estrategias de relaciones públicas.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Tec. en Diseño", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Diseño creativo de interiores, resolución óptima de exhibiciones y ambientación de espacios.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Tec. en Seguros", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Asesoramiento profesional eficaz, comercialización estratégica y gestión de riesgos asegurables.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400&h=300" },
  { nombre: "Corredor Inmobiliario", tipo: "Pregrado", duracion: "2.5 años", descripcion: "Intermediación profesional impecable en transacciones de negocios inmobiliarios y remates públicos.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400&h=300" },
];

export default function CardsCarreras() {
  return (
    <section className="w-full py-16 xs:py-24 bg-(--ucasal-gray-light)">
      <div className="contenedor mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--azul-ucasal) mb-4">
            Nuestra Oferta Académica
          </h2>
          <p className="text-lg sm:text-xl text-(--ucasal-black) opacity-70 max-w-2xl mx-auto">
            Descubrí todas las carreras que tenemos para ofrecerte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {carreras.map((carrera, index) => (
            <div 
              key={index} 
              className="bg-[#f0f2f5]/50 hover:bg-[#f0f2f5]/90 backdrop-blur-xl p-3 rounded-[32px] sm:rounded-[36px] shadow-sm hover:shadow-xl border border-white/50 flex flex-col w-full max-w-sm transition-all duration-300 group"
            >
              {/* Imagen con borde redondeado similar a la Card de referencia */}
              <div className="relative w-full overflow-hidden rounded-[24px] sm:rounded-[28px] aspect-4/3 bg-gray-200">
                <img 
                  src={carrera.img} 
                  alt={carrera.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="mt-5 px-3 flex-1 flex flex-col">
                {/* Título y Verificado */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {carrera.nombre}
                  </h3>
                </div>
                
                {/* Descripción */}
                <p className="text-[14px] sm:text-[15px] text-gray-800 mb-6 leading-relaxed line-clamp-3">
                  {carrera.descripcion}
                </p>

                {/* Footer de la Card: Estadísticas y Botón */}
                <div className="mt-auto mb-2 flex items-center justify-between">
                  {/* Stats (Duración y Tipo) */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-[14.5px] text-gray-700">{carrera.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span className="font-semibold text-[14.5px] text-gray-700">{carrera.tipo}</span>
                    </div>
                  </div>
                  
                  {/* Botón Ver Más */}
                  <button className="bg-(--rojo-ucasal) hover:bg-white/70 text-white border border-(--rojo-ucasal) shadow-sm transition-colors py-2 px-4 rounded-full font-bold text-[14px] flex items-center gap-1">
                    Ver más <span className="font-medium text-lg leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

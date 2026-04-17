import Form from './Form'

export default function FormSection() {
  return (
    <section className="contenedor py-6">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 sm:gap-6 items-stretch border border-gray-200 p-2 sm:p-12">

        {/* Panel izquierdo */}
        <div className="lg:col-span-4 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">

          {/* Zona superior: badge + título */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <span className="inline-flex items-center gap-2 w-fit bg-(--rojo-ucasal) text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Inscripciones 2026 abiertas
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-black text-black leading-tight tracking-tight">
              Empezá tu carrera 
              <span className="text-(--rojo-ucasal)"> este agosto</span>
            </h2>
          </div>

          {/* Zona inferior: imagen placeholder */}
          <div className="bg-(--azul-ucasal) flex-1 min-h-48 lg:min-h-0 rounded-xl flex flex-col items-center justify-center gap-3 border border-white/10">
            <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white/30 text-xs font-medium">Imagen a definir</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-6 border border-gray-200 rounded-lg">
          <Form onSubPage="section" />
        </div>

      </div>
    </section>
  )
}

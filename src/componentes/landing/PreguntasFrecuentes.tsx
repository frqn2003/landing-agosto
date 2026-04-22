import { useState } from "react"

const PREGUNTAS = [
    {
        pregunta: "¿Cuándo empiezan las clases?",
        respuesta: "Las clases del ciclo lectivo de agosto inician el primer lunes de agosto. Podés comenzar el proceso de inscripción desde ya para asegurar tu lugar."
    },
    {
        pregunta: "¿Las carreras tienen validez nacional?",
        respuesta: "Sí. Todos los títulos de UCASAL tienen validez nacional, avalados por el Ministerio de Educación de la Nación Argentina y reconocidos en todo el país."
    },
    {
        pregunta: "¿Cómo es la modalidad online?",
        respuesta: "El cursado online se realiza a través del campus online de UCASAL, disponible las 24 horas. Accedés a clases grabadas, materiales, foros y atención de docentes y tutores desde cualquier dispositivo."
    },
    {
        pregunta: "¿Qué documentación necesito para inscribirme?",
        respuesta: "Para iniciar la preinscripción solo necesitás completar el formulario de contacto. Luego un asesor te guiará con los documentos específicos según la carrera elegida (título secundario, DNI, foto, entre otros)."
    },
    {
        pregunta: "¿Hay becas o financiamiento disponible?",
        respuesta: "UCASAL cuenta con un sistema de becas y cuotas sin interés para facilitar el acceso a la educación universitaria. Consultá con un asesor para conocer las opciones disponibles para tu carrera."
    },
]

export default function PreguntasFrecuentes() {
    const [abierta, setAbierta] = useState<number | null>(null)

    const toggle = (i: number) => setAbierta(prev => prev === i ? null : i)

    return (
        <section className="">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black degrade-azul max-sm:mt-4">Preguntas frecuentes</h2>
                <div className="flex flex-col gap-3">
                    {PREGUNTAS.map((item, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                        >
                            <button
                                type="button"
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                aria-expanded={abierta === i}
                            >
                                <span className="font-semibold text-sm md:text-base text-(--azul-ucasal)">
                                    {item.pregunta}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-(--azul-ucasal) shrink-0 ml-4 transition-transform duration-300 ${abierta === i ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${abierta === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-5 py-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                                        {item.respuesta}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

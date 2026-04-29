import { motion } from 'framer-motion'
import Form from './Form'

export default function FormSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: 0.15 } }
      }}
    >
      <section className="contenedor py-6 grid grid-cols-1 lg:grid-cols-10 gap-2 sm:gap-12 items-stretch">

        {/* Panel izquierdo */}
        <div className="relative lg:col-span-6 2xl:col-span-5 rounded-4xl lg:rounded-[3rem] px-3 py-6 my-6 xl:my-24 2xl:my-16 mr-15 xl:mr-25 2xl:mr-30 sm:p-8 flex flex-col gap-6 bg-linear-to-r from-(--azul-ucasal) to-(--azul-dark-ucasal)">
          <div className='absolute text-base lg:text-3xl -top-6 lg:-top-8 left-6 lg:left-10 2xl:left-16 rounded-xl lg:rounded-2xl px-4 py-2 lg:px-6 lg:py-4 text-white bg-linear-to-r from-(--rojo-ucasal) to-(--rojo-dark-ucasal) tracking-wide'>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              transition={{ duration: 0.8, ease: "linear" }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className='whitespace-nowrap overflow-hidden animate-[typewriter_0.8s_steps(8)_forwards]'>CURSADO <span className='font-extrabold'>INTENSIVO</span>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center items-left gap-2 text-white h-full ml-4 md:ml-8 2xl:ml-14">
            <h3 className='text-sm md:text-base xl:text-2xl 2xl:text-3xl tracking-wider font-normal'>Realizá el <span className='font-bold'>primer año</span> en</h3>
            <h2 className='text-4xl md:text-5xl xl:text-7xl 2xl:text-8xl font-bold inline-block uppercase tracking-wider font-museo'>7 meses</h2>
            <h3 className='text-xs md:text-sm xl:text-xl 2xl:text-2xl uppercase tracking-wider font-normal'>de agosto a febrero</h3>
          </div>

          <div className='absolute top-1/2 -translate-y-1/2 -right-15 xl:-right-30 2xl:-right-35 z-10 h-35 w-35 sm:h-45 sm:w-45 md:h-55 md:w-55 lg:h-65 lg:w-65 xl:w-75 xl:h-75 2xl:w-85 2xl:h-85 rounded-full bg-white shadow-2xl shadow-black border border-gray-500'>
            <img src={`${import.meta.env.BASE_URL}/cursadointensivo.svg`} alt="Cursado Intensivo" />
          </div>
          <p className="text-[9px] sm:text-[11px] text-white/60 italic ml-2 md:ml-4 2xl:ml-6 font-bold ">
            * Las carreras de <br className='xl:hidden block' />  Corredor Inmobiliario y Martillero Publico, <br className='2xl:hidden block' /> y Licenciatura en Seguridad CCC
            <br /> no cuentan con cursado intensivo
          </p>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-4 2xl:col-span-5 border border-gray-200 rounded-2xl">
          <Form onSubPage={false} />
        </div>

      </section>
    </motion.div>
  )
}

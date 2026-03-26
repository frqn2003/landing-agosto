import Card from "./ui/Card";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from "react";

export default function Hero() {
    const testimonios = [
        {
            nombre: "Benjamin Elizalde",
            subtitulo: "Licenciatura en comercialización",
            descripcion: '"La facultad esta siempre a disposición"',
            imagen: "./public/testimonios/benja.webp",
        },
        {
            nombre: "Ebaneo Valdez Kao",
            subtitulo: "Ingeniería en Informática",
            descripcion: '"Puedo ejercer mi profesión desde cualquier parte del del mundo"',
            imagen: "./public/testimonios/kao.webp",
        },
        {
            nombre: "Luciana Gennari",
            subtitulo: "Kinesiología",
            descripcion: '"Para poder rendir bien academicamente y en entrenamiento la universidad me da una ayuda gigante"',
            imagen: "./public/testimonios/luciana.webp",
        },
        {
            nombre: "Nicolas Ovejero",
            subtitulo: "Licenciatura en Turismo",
            descripcion: '"Le agradezco a la universidad por brindarnos una herramienta fundamental: el capital humano, los profesores y sobre todo los compañeros"',
            imagen: "./public/testimonios/nicolas.webp",
        },
        {
            nombre: "Nahuel Agustín Artigas",
            subtitulo: "Profesorado en Educación Física",
            descripcion: '"Son todos sentimientos de alegría y felicidad porque pude realizar un sueño que tenía, que era recibirme"',
            imagen: "./public/testimonios/nahuel.webp",
        },
        {
            nombre: "Luciano Marcelo Sato",
            subtitulo: "Licenciatura en Artes Musicales",
            descripcion: '"Nos permite integrarnos muy fácil al mundo laboral en muchos aspectos, capacitándonos mucho en el día a día"',
            imagen: "./public/testimonios/luciano.webp",
        },
        {
            nombre: "Tania Elizabeth Flores",
            subtitulo: "Corredor Inmobiliario y Martillero público",
            descripcion: '"El apoyo de los profesores y del equipo UCASAL es fundamental: siempre están para guiarte. Como mamá, valoro mucho esa ayuda para equilibrar familia, trabajo y estudio."',
            imagen: "./public/testimonios/tania.webp",
        }
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    }, [Autoplay({ delay: 5000 })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <main className="snap-y snap-mandatory relative w-full h-screen overflow-hidden bg-(--azul-light-ucasal)/5">
            <div className="overlay"></div>
            <picture className="absolute top-0 left-0 w-full h-full overflow-hidden z-20">
                <source media="(max-width: 767px)" srcSet="/public/modalidades-distancia.webp" />
                <source media="(min-width: 768px)" srcSet="/public/modalidades-distancia.webp" />
                <img src="/public/modalidades-distancia.webp" className="w-full h-full object-cover" alt="Segundo ingreso UCASAL" />
            </picture>
            <section className="h-full w-full contenedor flex flex-col max-md:justify-end max-md:pb-12 md:pt-56 lg:pt-60 xl:pt-64 2xl:pt-80 gap-6 md:gap-30 lg:gap-40 xl:gap-60">
                <div className="flex flex-col lg:flex-row w-full items-center gap-12 xl:gap-24">
                    <div className="flex-start flex justify-center items-center z-30 w-full xl:w-[50%] h-full">
                        <h1 className="2xl:text-5xl xl:text-3xl lg:text-2xl text-xl font-semibold text-justify text-white max-md:px-6">
                            Comenzá tu camino profesional con nosotros, cuando quieras, cuando puedas
                        </h1>
                    </div>
                    <div className="flex justify-center items-center z-30 w-full xl:w-[50%] h-full ">
                        <div className="grid grid-rows-2 mb-4 items-start justify-start h-full text-white">
                            <h3 className="text-sm md:text-base lg:text-lg">
                                Descripción bonita de segundo ingreso
                            </h3>
                            <div className="flex flex-row gap-12 justify-center items-start h-full">
                                <button className="boton-cta">
                                    boton1
                                </button>
                                <button className="hover-button group border-2 border-white rounded-full flex flex-row text-black text-lg justify-center items-center cursor-pointer">
                                    boton2
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Componente de testimonios */}
                <div className="w-full flex justify-center z-30">
                    <div className="relative w-full md:w-3/4 lg:w-2/3 xl:w-1/2 px-8">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {testimonios.map((testimonio, index) => (
                                    <div key={index} className="flex-[0_0_100%] px-8 md:px-12">
                                        <Card
                                            titulo={testimonio.nombre}
                                            subtitulo={testimonio.subtitulo}
                                            descripcion={testimonio.descripcion}
                                            imagen={testimonio.imagen}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones de navegación */}
                        <button
                            onClick={scrollPrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all"
                            aria-label="Anterior"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 max-sm:-translate-x-2 translate-x-2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all"
                            aria-label="Siguiente"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

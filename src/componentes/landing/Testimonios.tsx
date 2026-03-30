import Card from "./ui/Card";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from "react";

export default function Testimonios() {
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
        <>
            {/* Componente de testimonios */}
            <div className="w-full flex justify-center z-30" >
                <div className="relative w-full md:w-[90%]  px-8">
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/10 hover:bg-black/20 rounded-full p-3 backdrop-blur-sm transition-all"
                        aria-label="Anterior"
                    >
                        <svg className="lg:w-6 lg:h-6 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 max-sm:-translate-x-2 translate-x-2 bg-black/10 hover:bg-black/20 rounded-full p-3 backdrop-blur-sm transition-all"
                        aria-label="Siguiente"
                    >
                        <svg className="lg:w-6 lg:h-6 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
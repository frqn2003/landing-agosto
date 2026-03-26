import Card from "./ui/Card";
import useEmblaCarousel from 'embla-carousel-react'
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
    });

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
                <source media="(max-width: 767px)" srcSet="https://placehold.co/600x400" />
                <source media="(min-width: 768px)" srcSet="https://placehold.co/1920x1080" />
                <img src="https://placehold.co/1920x1080" className="w-full h-full object-cover" alt="Segundo ingreso UCASAL" />
            </picture>
            <section className="h-full w-full contenedor flex flex-col py-86 gap-24">
                <div className="flex flex-row w-full items-center gap-24">
                    <div className=" flex-start flex justify-center items-center z-30 w-[50%] h-full contenedor">
                        <h1 className="text-4xl font-semibold text-justify">
                            Frase para atrapar que la Angie me tiene que aconsejar sobre que poner relacionada a segundo ingreso
                        </h1>
                    </div>
                    <div className="flex justify-center items-center z-30 w-[50%] h-full ">
                        <div className="grid grid-rows-2 mb-4 items-start justify-start h-full">
                            <h3>
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
                <div className="relative contenedor w-full z-30">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {testimonios.map((testimonio, index) => (
                                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pr-6">
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all"
                        aria-label="Anterior"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all"
                        aria-label="Siguiente"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>
        </main>
    );
}

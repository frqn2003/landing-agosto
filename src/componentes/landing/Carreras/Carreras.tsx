import CardsCarreras from "../ui/CardsCarreras";
import dataCarreras from "../../../data/carreras"

export default function Carreras() {
    return (
        <section className="w-full pt-2 pb-8 contenedor" id="carreras">
            <div className="relative">
                <div className="text-left mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold degrade-azul tracking-tight">
                        Nuestra Oferta Académica
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 w-full">

                    {dataCarreras.map((carrera: any) => (
                        <CardsCarreras
                            key={carrera.codcar}
                            slug={carrera.slug}
                            nombre={carrera.nombre}
                            descripcionCorta={carrera.descripcionCorta}
                            duracion={carrera.duracion}
                            img={`${import.meta.env.BASE_URL}cards.webp`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
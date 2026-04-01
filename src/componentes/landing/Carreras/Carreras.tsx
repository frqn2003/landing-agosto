import CardsCarreras from "../ui/CardsCarreras";
import dataCarreras from "../../../data/carreras"

export default function Carreras() {
    return (
        <section className="w-full py-16 xs:py-24 bg-(--azul-ucasal)/10" id="carreras">
            <div className="contenedor mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--azul-ucasal)">
                        Nuestra Oferta Académica
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">

                    {dataCarreras.map((carrera: any) => (
                        <CardsCarreras
                            key={carrera.codcar}
                            slug={carrera.slug}
                            nombre={carrera.nombre}
                            descripcion={carrera.descripcion}
                            duracion={carrera.duracion}
                            tipo={carrera.tipo}
                            img={carrera.img}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
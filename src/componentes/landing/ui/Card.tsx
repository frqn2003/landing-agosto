type CardProp = {
    titulo: string;
    descripcion: string;
    subtitulo?: string;
    imagen: string;
}

export default function Card(props: CardProp) {
    return (
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 xl:gap-8 bg-white/10 border-2 border-(--azul-ucasal)/20 rounded-lg p-4 w-full h-full max-sm:h-fit">
            <div className="flex flex-row gap-4 items-center">
                <img src={props.imagen} alt={props.titulo} className="rounded-full lg:h-10 lg:w-10 h-8 w-8 aspect-square object-cover shrink-0" />
                <div className="flex flex-col">
                    <h3 className="text-base xl:text-lg text-black">{props.titulo}</h3>
                    <p className="xl:text-sm text-xs text-(--azul-ucasal)">{props.subtitulo}</p>
                </div>
            </div>

            <h2 className="text-justify text-black text-sm">{props.descripcion}</h2>

        </div>
    )
}
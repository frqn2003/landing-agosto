type CardProp = {
    titulo: string;
    descripcion: string;
    subtitulo?: string;
    imagen: string;
}

export default function Card(props: CardProp) {
    return (
        <div className="flex flex-col gap-8 bg-black/10 p-4 w-full h-full">
            <div className="flex flex-row gap-4 items-center">
                <img src={props.imagen} alt={props.titulo} className="rounded-full h-10 w-10 aspect-square object-cover flex-shrink-0" />
                <div className="flex flex-col">
                    <h3 className="text-lg">{props.titulo}</h3>
                    <p className="text-sm">{props.subtitulo}</p>
                </div>
            </div>

            <h2 className="text-justify">{props.descripcion}</h2>

        </div>
    )
}
import { useParams } from "react-router-dom"
import data from "../data/carreras"

export default function DetalleCarrera() {
        const { slug } = useParams()
        const carrera = data.find((c: any) => c.slug === slug)
        if(!carrera) {
            console.error("Error al cargar la carrera")
            return (
                <div>
                    <h1>Detalle de la Carrera: No se encontró la carrera</h1>
                </div>
            )
        }
        
        return (
            <div>
                <h1>Detalle de la Carrera: {carrera?.nombre}</h1>
                <h2>Modalidad: {carrera?.tipo}</h2>
            </div>
        )
    
}

import { useArancel } from "../../hooks/useArancel"

interface ArancelesProps {
    codcar: number | string,
    modalidad: string
    idSede: string
    sector: string | number
    enabled?: boolean
}

export function Aranceles({ codcar, modalidad, idSede, sector, enabled = true }: ArancelesProps) {
    const { valorMatricula, valorFinal, porcentaje, cargando, error } = useArancel({
        codcar: codcar.toString(),
        modalidad: modalidad,
        idSede: idSede,
        sector: sector,
        enabled: enabled,
    })
    
    return (
        <div>
            <h2>Aranceles</h2>
            <p>Matrícula: {valorMatricula}</p>
            <p>Valor final: {valorFinal}</p>
            <p>Porcentaje: {porcentaje}</p>
            {cargando && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    )
}
export default function Sedes() {
    return (
        <section className="">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-black degrade-azul">Nuestras sedes</h2>
                <iframe
                    src="https://ucasal.edu.ar/mapa_sedes/mapa_sedes_ucasal.html"
                    title="Mapa de sedes UCASAL"
                    className="w-full rounded-xl border-0 shadow-md"
                    style={{ height: '45vh' }}
                    allowFullScreen
                />
            </div>
        </section>
    )
}

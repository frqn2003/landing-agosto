export default function NotFound() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 900, margin: 0 }}>404</h1>
            <p style={{ fontSize: '1.25rem', color: '#555' }}>Página no encontrada</p>
            <a href="/" style={{ color: '#1a56db', textDecoration: 'underline' }}>Volver al inicio</a>
        </div>
    )
}
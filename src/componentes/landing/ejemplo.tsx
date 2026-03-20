// 1. IMPORTS — siempre arriba
import { useState, useEffect } from 'react'

// 2. TIPOS (TypeScript) — definís qué props acepta el componente
type NavbarProps = {
  titulo: string
}

// 3. EL COMPONENTE — función que recibe props y devuelve JSX
function Navbar({ titulo }: NavbarProps) {
  
  // 4. ESTADO — variables que cuando cambian, re-renderizan el componente
  const [menuAbierto, setMenuAbierto] = useState(false)

  // 5. EFECTOS — código que corre después del render (o cuando cambia algo) Intentar hacer que el useEffect solo maneje cosas de React o solo DOM.
  useEffect(() => {
    console.log('El componente se montó')
  }, []) // [] = solo corre una vez al montar

  // 6. FUNCIONES — lógica del componente
  function toggleMenu() {
    setMenuAbierto(!menuAbierto)
  }

  // 7. RETURN — el JSX que se renderiza
  return (
    <nav>
      <span>{titulo}</span>
      <button onClick={toggleMenu}>Menú</button>
      {menuAbierto && <ul><li>Link 1</li></ul>}
    </nav>
  )
}

// 8. EXPORT — para que otros archivos puedan importarlo
export default Navbar
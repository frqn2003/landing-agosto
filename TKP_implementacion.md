# Thank You Page (TKP) — Decisiones e Implementación

## Contexto

Al enviar el formulario, el usuario era redirigido a una URL externa hardcodeada:
`https://www.ucasal.edu.ar/landing/enviado-agosto.php`

Se decidió migrar a una TKP interna dentro del proyecto React.

---

## Decisiones tomadas

### TKP general vs. TKP por carrera
Se optó por **una única TKP general** (`/gracias`) en lugar de una por carrera porque:
- El formulario ya conoce la carrera seleccionada y puede mostrarla en la TKP.
- Menor mantenimiento: un solo componente, un solo evento de conversión en GTM/GA4.
- El `codcar` inicial ya identifica la sub-página de origen.

### Estrategia de routing
Se evaluaron las siguientes opciones:

| Opción | Descripción | Estado |
|---|---|---|
| `BrowserRouter` + config servidor | URLs limpias, requiere Apache/Nginx/acceso admin | **Descartada** (sin acceso al servidor) |
| `HashRouter` | URLs con `#`, funciona sin config de servidor | Disponible como fallback |
| `.htaccess` en raíz | Funciona en Apache sin acceso admin | **Descartada** (requiere permisos de administrador) |
| Plataformas (Netlify/Vercel) | Archivo `_redirects` en el repo | No aplica (servidor propio via WinSCP) |
| **React Router `state`** | Datos en memoria, sin URL visible, funciona con `BrowserRouter` | **Implementado** |

**Decisión final:** TKP interna en `/gracias` con datos pasados por React Router `state`. No requiere configuración de servidor ya que la navegación es interna (el usuario llega desde el formulario, nunca accede directamente a la URL).

### Tracking con plataformas de ads
- **GTM/dataLayer:** Ya implementado en `Form.tsx`, no cambia. Google Ads y Meta pueden leer el evento `form_enviado_landings`.
- **URL de conversión fija:** Si una campaña necesita una URL específica (ej: `/gracias/abogacia`), se puede extender la ruta a `/gracias/:slug` en el futuro sin cambios mayores.
- **URLs PHP externas existentes** (`enviado-X.php`): Pueden redirigir a la TKP interna como transición si fuera necesario.

---

## Archivos modificados

### `src/componentes/landing/Form.tsx`
- Agregado `import { useNavigate } from "react-router-dom"`.
- Agregado `const navigate = useNavigate()` al inicio del componente.
- Reemplazado `window.location.href = 'https://www.ucasal.edu.ar/landing/enviado-agosto.php'` por:

```ts
navigate('/gracias', {
    state: {
        nombre,
        email,
        carrera: carreraSeleccionada?.nombre_carrera ?? '',
        modalidad: carreraSeleccionada?.modo === 7 ? 'Online' : 'Presencial',
        sede: sedes.find((s: any) => String(s.id_sede) === idSede)?.nombre_sede ?? '',
    }
})
```

> Los hidden inputs `tkp` y `fkp` (líneas 176-177) siguen apuntando a la URL externa. Si el backend los usa para redirigir, actualizar también esas URLs cuando se migre completamente.

### `src/App.tsx`
- Agregado `import GraciasPage from './pages/GraciasPage'`.
- Agregada ruta:
```tsx
<Route path="gracias" element={<GraciasPage />} />
```
La ruta no incluye `Navbar` ni `Footer` — página full-screen.

### `src/pages/GraciasPage.tsx` *(archivo nuevo)*
Página de confirmación con:
- Ícono de check animado con indicador en bounce.
- Saludo personalizado con el primer nombre del usuario.
- Card con resumen: nombre, email, carrera, modalidad, sede.
- Sección "¿Qué sigue?" con 3 pasos numerados.
- Botón para volver al inicio.
- Animaciones con `heroFadeInUp` (consistente con el resto del proyecto).
- Variables CSS del proyecto: `--azul-ucasal`, `--rojo-ucasal`.
- Tailwind v4: `bg-linear-to-br`, `bg-(--azul-ucasal)`, etc.

---

## Comportamiento de los datos en la TKP

Los datos se pasan por **React Router `state`** (en memoria del navegador):
- ✅ No aparecen en la URL (privacidad).
- ✅ No llegan al servidor ni a logs.
- ⚠️ Si el usuario refresca `/gracias`, los datos desaparecen. El mensaje de confirmación sigue visible pero sin el resumen personalizado. Esto es comportamiento estándar para una TKP.

---

## Pendientes / posibles mejoras futuras

- Actualizar los hidden inputs `tkp` y `fkp` en `Form.tsx` si el backend los utiliza para la redirección.
- Extender la ruta a `/gracias/:slug` si en el futuro se necesitan URLs de conversión por carrera para campañas de ads.
- Evaluar `sessionStorage` como alternativa al `state` si se necesita que los datos persistan al refrescar.

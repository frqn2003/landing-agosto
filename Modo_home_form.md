# Modo HOME en el Formulario — Análisis y Opciones
 
## Contexto
 
La API (`getCarrerasJson.php`) devuelve para una carrera con `modo: 7` (Virtual) una lista de provincias/sedes que mezcla dos tipos de sedes:
 
- **Sedes oficiales**: `id_sede !== 500`, nombre limpio (ej: `"BUENOS AIRES - AVELLANEDA"`)
- **Sedes Modo Home**: `id_sede === 500`, nombre con sufijo `(Home)` (ej: `"BUENOS AIRES - ADELA (Home)"`)
 
Ambos tipos comparten el mismo `modo: 7`. La distinción no está en el modo sino en el `id_sede` y el nombre.
 
### Regla de negocio original
> Las sedes Modo Home solo deben aparecer si el usuario **no tiene una sede oficial de UCASAL a menos de 500 metros**.
 
### Problema detectado
UCASAL tiene sede oficial en **todas las provincias** de Argentina, por lo que la condición "no hay sede oficial en la provincia" nunca se cumple. La regla de los 500m es geográfica, no por provincia.
 
---
 
## Opciones de implementación
 
### Opción 1 — Geolocalización real (`navigator.geolocation`)
 
**Cómo funciona:**
1. Cuando el usuario selecciona una provincia, se solicita su ubicación GPS.
2. Se calculan las distancias entre su posición y las coordenadas de cada sede oficial de esa provincia.
3. Si **todas** las sedes oficiales están a más de 500m → se agrega "Modo Home" al listado de sedes.
4. Si hay al menos una sede a ≤500m → solo se muestran las sedes oficiales.
 
**Ventajas:**
- Implementa exactamente la regla de negocio original.
- Experiencia personalizada y precisa.
 
**Desventajas:**
- Requiere coordenadas (lat/lng) de cada sede → no están en la API actual.
- El usuario debe aceptar el permiso de geolocalización (muchos lo rechazan).
- Añade complejidad técnica significativa.
- Si el usuario rechaza la geolocalización, hay que definir un comportamiento fallback.
 
**Pendiente para implementar:**
- Conseguir lat/lng de cada sede (hardcodeadas o endpoint nuevo).
- Definir comportamiento si el usuario rechaza el permiso.
 
---
 
### Opción 2 — `<optgroup>`: Oficiales primero + Home como grupo separado
 
**Cómo funciona:**
1. Las sedes de la provincia se dividen en `oficiales` (`id_sede !== 500`) y `home` (`id_sede === 500`).
2. El select muestra:
   - Grupo **"Sedes disponibles"** → sedes oficiales (nombre limpio, sin `(Home)`)
   - Grupo **"Sin sede cerca"** → una única opción `"Modo Home"` con `id_sede: 500`
3. El usuario decide libremente cuál elegir.
 
**Ventajas:**
- No requiere geolocalización.
- Clara separación visual entre opciones.
- El usuario que está lejos puede elegir Home por su cuenta.
- Una sola opción Home (no 50 localidades rurales).
 
**Desventajas:**
- No respeta estrictamente la regla de negocio (el usuario puede elegir Home aunque tenga una sede cerca).
- Requiere limpiar los nombres (`" (Home)"` → quitarlo del label).
 
**Implementación estimada:** Baja complejidad. Solo modificar el JSX del select de sedes en `Form.tsx`.
 
---
 
### Opción 3 — Mostrar todo limpio, agrupado, sin filtrar
 
**Cómo funciona:**
1. Se muestran todas las sedes tal cual vienen de la API, pero:
   - Se agrupan con `<optgroup>` (Sedes Oficiales / Modo Home).
   - Se limpian los nombres (quitar el sufijo `(Home)` del label).
2. No se oculta ni condiciona nada.
 
**Ventajas:**
- Máxima transparencia para el usuario.
- Mínima lógica extra en el código.
- Compatible 100% con el comportamiento actual de otras landings de UCASAL.
 
**Desventajas:**
- El usuario ve potencialmente decenas de localidades Home rurales (ej: `"BUENOS AIRES - ADELA"`, `"BUENOS AIRES - CACHARI"`, etc.) que no reconoce.
- Experiencia confusa si hay 80 opciones Home mezcladas con 10 oficiales.
 
---
 
### Opción 4 (adicional) — Home colapsado / expandible
 
**Cómo funciona:**
1. Por defecto, el select muestra **solo las sedes oficiales**.
2. Al pie del select aparece un link/botón: _"¿No encontrás tu localidad? Ver Modo Home →"_
3. Al hacer clic, se reemplaza el select por uno que muestra las sedes Home (o se expande el grupo).
 
**Ventajas:**
- UX limpia por defecto (no abruma con opciones).
- El usuario que necesita Home lo puede acceder de forma explícita.
- No requiere geolocalización.
 
**Desventajas:**
- Requiere más trabajo de UI (lógica de toggle, estado extra).
- Si el usuario no nota el link, puede frustrarse.
 
---
 
### Opción 5 (adicional) — Una única opción Home por provincia
 
**Cómo funciona:**
1. Filtrar las sedes: mostrar sedes oficiales + **exactamente una** opción `"Modo Home"` al final (colapsar todas las `id_sede: 500` en una sola entrada).
2. Enviar `id_sede: 500` al backend cuando elige Home, independientemente de la localidad.
 
**Ventajas:**
- Muy simple visualmente.
- No requiere geolocalización.
- Elimina la confusión de las 50 localidades Home.
 
**Desventajas:**
- Se pierde el detalle de localidad (el backend recibe solo `id_sede: 500` sin saber la localidad específica).
- No respeta la regla de los 500m.
 
---
 
## Estado actual del código
 
En `Form.tsx`, la construcción de sedes es:
 
```ts
// línea 58-59
const sedes = (carreraSeleccionada?.provincias || [])
    .filter((sede: any) => String(sede.id_provincia) === idProvincia)
```
 
Esto mezcla oficiales y Home sin distinción. Actualmente no hay ningún filtro por `id_sede`.
 
El select de sedes (línea ~242) renderiza todo plano:
 
```tsx
{sedes.map((s: any) => (
    <option key={s.id_sede} value={s.id_sede}>{s.nombre_sede}</option>
))}
```
 
---
 
## Decisión pendiente
 
- [ ] Elegir una de las 5 opciones.
- [ ] Si se elige Opción 1: conseguir coordenadas de sedes y definir fallback sin geolocalización.
- [ ] Si se elige Opción 2, 4 o 5: definir si se limpian los nombres `(Home)` del label.
- [ ] Verificar qué espera el backend cuando recibe `id_sede: 500`.
 


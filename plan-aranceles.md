# Integración de Aranceles Reales por Carrera

Integrar el endpoint de aranceles de UCASAL en la landing para mostrar precios reales (con descuento si aplica) en `Form.tsx` y `GraciasPage.tsx` una vez que el formulario esté completamente seleccionado.

---

## Endpoint objetivo

```
GET https://sistemasweb.ucasal.edu.ar/v1/boleta/get-amount-pay
  ?tdocu=DNI-LE-LC        ← fijo
  &ndocu=11111111         ← fijo (dummy, no se pide al usuario)
  &lugar={id_sede}        ← id_sede del API (ya disponible en idSedeReal)
  &sector={sector}        ← código de facultad → nuevo campo en carreras.ts
  &carrera={codcar}       ← codcar de la carrera seleccionada
  &modo={modalidad}       ← modalidad numérica
  &concepto=50            ← fijo
```

**Respuesta:**
```json
{
  "valorMatricula": 395000,
  "mesVencimiento": 5,
  "vencimiento": "2026-06-26T00:00:00.000Z",
  "anio": 2026,
  "porcentaje": 30,
  "valorFinal": 276500,
  "monto_pagar": 276500
}
```

---

## Pasos

### 1 · Agregar `sector` a `carreras.ts` · ~1–2 h
- Agregar el campo `sector: number` a cada objeto de carrera.
- El valor ya lo tenés; es el código de facultad que agrupa las carreras (actualmente reflejado por los comentarios `// ── SEDE A/B/C ──`).
- Si son pocas facultades, conviene hacer un objeto de constantes fuera del array para reutilizarlo.
- **Bloqueante**: sin este dato, los demás pasos no se pueden completar.

### 2 · Crear `useArancel` hook · ~1–2 h
- Nuevo archivo `src/hooks/useArancel.ts`.
- Recibe `{ codcar, modalidad, idSede, sector, enabled }`.
- Cuando `enabled === true` dispara el fetch al endpoint; antes retorna `{ data: null, cargando: false, error: null }`.
- Cache por clave `codcar|modalidad|idSede` en un `Map` en módulo (misma estrategia que `carrerasApi.ts`) para no repetir llamadas si el usuario vuelve a la misma combinación.
- Maneja `AbortController` para cancelar si los parámetros cambian antes de que llegue la respuesta.
- Exporta `{ valorMatricula, valorFinal, porcentaje, cargando, error }`.

### 3 · Actualizar `Form.tsx` · ~1–2 h
- Llamar a `useArancel` pasando los valores del hook `useCarrerasCascada` + el nuevo `sector` de la carrera seleccionada.
- Reemplazar el bloque hardcodeado (`$325.800`) por la UI real:
  - **Con descuento** (`porcentaje > 0`): `valorMatricula` tachado en gris + `valorFinal` en verde/azul resaltado + badge `−{porcentaje}%`.
  - **Sin descuento** (`porcentaje === 0`): solo `valorFinal`.
  - **Cargando**: spinner / skeleton en lugar del bloque de precio.
  - **Error**: texto de fallback (ej. "Consultá el arancel con un asesor").
- No mostrar el bloque hasta que `carreraCompleta === true` (comportamiento actual que ya existe).

### 4 · Pasar precio por `location.state` · ~30 min
- En el `onSubmit` de `Form.tsx`, agregar al state de `navigate` los campos `{ valorFinal, valorMatricula, porcentaje }`.
- Estos valores ya están en memoria gracias al hook del paso 2.

### 5 · Actualizar `GraciasPage.tsx` · ~1 h
- Ampliar la interfaz `FormState` para incluir `valorFinal?: number`, `valorMatricula?: number`, `porcentaje?: number`.
- Reemplazar el bloque hardcodeado de `GraciasPage` con la misma lógica de display del paso 3 (con / sin descuento).
- Si llegan `undefined` (acceso directo a la URL), no mostrar el bloque o mostrar el fallback.

---

## Lógica de display (resumen)

| Condición | Mostrar |
|---|---|
| `cargando` | Skeleton / spinner |
| `error` | Texto de fallback |
| `porcentaje > 0` | `valorMatricula` tachado + `valorFinal` resaltado + badge `−X%` |
| `porcentaje === 0` | Solo `valorFinal` |

---

## Estimación de tiempo total

| Paso | Tiempo |
|---|---|
| 1 · Sector en carreras.ts | 1–2 h |
| 2 · `useArancel` hook | 1–2 h |
| 3 · Form.tsx | 1–2 h |
| 4 · State hacia TKP | 30 min |
| 5 · GraciasPage | 1 h |
| Testing / ajuste de UI | 1–2 h |
| **Total** | **~6–9 h** |

---

## Notas y dependencias

- `lugar` ya está disponible como `idSedeReal` en `useCarrerasCascada`.
- `sector` es el único dato que todavía falta; **el plan no puede avanzar al paso 2 sin él**.
- Si los precios cambian frecuentemente, considerar TTL en el cache del hook (ej. invalidar después de 5 min).
- La decisión sobre si mostrar el precio con o sin el descuento de `PromocionDinamica` queda abierta; por ahora se muestra el valor del endpoint tal cual.

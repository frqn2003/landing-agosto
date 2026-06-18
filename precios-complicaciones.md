# Complicaciones de incorporar precios reales de carreras

## Contexto del prototipo

El prototipo muestra un placeholder `$XX.XXX / mes` en dos lugares:

1. **Formulario (`Form.tsx`)** — aparece una vez que el formulario está completamente relleno (`todosCompletos`).
2. **Página de gracias (`GraciasPage.tsx`)** — aparece como cuadro previo al bloque de la promoción, usando el nombre de carrera pasado por `location.state`.

---

## Problema central: la variabilidad del precio

El arancel de una carrera **no es un valor único**. Depende de al menos tres dimensiones simultáneas:

### 1. Sede
Cada sede fija su propio valor de cuota. Una misma carrera puede tener aranceles distintos en Salta capital, Buenos Aires, Rosario, modalidad Home, etc. Actualmente el formulario maneja hasta **dos grupos de sedes** (`sedesOficiales` y `sedesHome`), y cada sede tiene un `id_sede` distinto con su tabla de precios asociada en el backend.

### 2. Modalidad
- **Presencial** y **Online** tienen estructuras de arancel distintas.
- Además existe el **cursado intensivo** (excepto para algunos `codcar` explícitamente excluidos), que puede implicar un descuento o una cuota diferente.

### 3. Carrera
Cada `codcar` tiene su propio arancel base. No existe un precio genérico "por tecnicatura" o "por licenciatura": hay más de 20 carreras activas en esta landing y todas pueden diferir.

---

## Implicancias técnicas

### Origen del dato
Los precios **no están en `carreras.ts`**. Ese archivo solo contiene datos académicos (plan de estudios, perfil egresado, etc.). El arancel real vive en el sistema de gestión de UCASAL (SGA / sistema de aranceles), accesible via una API interna o base de datos que no está expuesta en esta landing.

Opciones para obtenerlo:
- **API ad-hoc** que reciba `(codcar, id_sede, modalidad)` y devuelva el arancel vigente.
- **JSON estático** generado periódicamente desde el sistema (p. ej. `aranceles.json`), indexado por esa combinación de claves. Requiere actualización manual o automatizada cada vez que cambia un precio.
- **Hardcodeado en `carreras.ts`** con un mapa de precios por combinación, lo cual es difícil de mantener y propenso a desactualización.

### Cuándo mostrar el precio
El formulario habilita los campos en cascada: carrera → modalidad → provincia → sede. Recién cuando los cuatro están seleccionados (`carreraCompleta === true`) se conoce la combinación exacta. Ese es el único momento en que el precio puede ser definitivo y correcto.

Antes de ese punto, mostrar un precio sería engañoso (no se sabe la sede todavía).

### Sincronización con promociones
La `PromocionDinamica` muestra un descuento porcentual sobre la matrícula. Si se incorpora el precio de cuotas, habría que asegurarse de que el precio que se muestra ya refleje (o no, según el criterio comercial) el descuento vigente, para no generar inconsistencias entre el valor mostrado en el formulario y lo que el asesor le confirma al postulante.

### GraciasPage
En la TKP la carrera llega por `location.state.carrera` (el nombre string). Para mostrar el precio real también haría falta pasar por state el precio calculado desde el formulario, o bien volver a consultarlo con la combinación `(codcar, id_sede, modalidad)` que igualmente debería llegar por state.

---

## Recomendación para implementación real

1. **Generar o exponer un endpoint / JSON** `aranceles` con la estructura:
   ```json
   {
     "codcar_idSede_modalidad": {
       "cuota": 999999,
       "matricula": 99999,
       "moneda": "ARS"
     }
   }
   ```
2. **Consultar ese endpoint en `useCarrerasCascada`** (o en `Form.tsx`) una vez que `carreraCompleta` es `true`.
3. **Pasar el precio por `location.state`** al navegar a la TKP para que `GraciasPage` lo muestre sin hacer otra solicitud.
4. **Definir la política de display**: ¿se muestra el precio con o sin el descuento de la promoción vigente? ¿Se muestra la cuota mensual, la matrícula, o ambas?
5. **Actualización automática**: si los aranceles cambian con frecuencia, el JSON estático necesita un mecanismo de regeneración periódica o invalidación de caché.

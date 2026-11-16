# PROGRESO · nota de relevo

**Última actualización:** 2026-11-16 · **Por:** Claude Code

## 🎯 Objetivo actual
Integrar las mejoras de Marketing hechas con Codex (rama `marketing-codex`, con commit, pendiente de publicar en `main`). Marketing es interno: NO familias, matrículas ni CRM.

## ✅ Hecho
- Portada nueva publicada en `main` (dirección "B · Foto completa"; enlace «Primer acceso» oculto con `hidden` en `#cvfirst`).
- Chat (`index.html`, ~líneas 1776-1870):
  - Causa probable del fallo: `firestore.rules` no tenía reglas para `chats` ni `chatmsgs` (y solo Dirección podía leer `staff`, así que el resto veía «No hay más usuarios»).
  - Añadidas a `firestore.rules`: los bloques `match /chats` y `match /chatmsgs`, y la lectura de `staff` para todo el staff. **Hay que pegarlos a mano en la consola de Firebase** (Firestore → Reglas); no se publican solos.
  - Si leer el chat falla, la app lo reintenta sola (2 s, 4 s… hasta 1 min); antes se quedaba muerto hasta recargar.
  - Mis mensajes muestran 🕓 mientras se envían y ✓ cuando ya están en el servidor (`includeMetadataChanges`).
  - Mensajes indexados por conversación (`chatIndex`, se rehace en `chatPaint`); antes se recorría todo por cada chat.
  - Abrir un chat privado usa `set(...,{merge:true})` y ya no machaca el existente.
  - Si no se puede leer `staff`, la lista de personas sale de los perfiles y los chats.
- Probado en Chrome con una base de datos falsa (script `chattest.js` en la carpeta temporal): reintento, ✓/🕓, no leídos, lista de personas.

## 🔄 En curso
- Marketing (paquete de Codex `marketing.patch`, aplicado sin conflictos): objetivos con responsable y próxima revisión; campañas con responsable, presupuesto, gasto real, moneda y coste por inscrito; validaciones (el formulario no se cierra si hay datos malos); Stats compara solo con el mes anterior; etiquetas del Panel más claras. `cxForm` tiene un 6º argumento opcional `validate`.
- Probado: `node comprobar-marketing.cjs` de Codex pasa; prueba visual con datos inventados en ordenador y móvil (campaña antigua, gasto 0, 0 inscritos, validación de moneda).
- Corregido: en `firestore.rules` del repo, los bloques del chat estaban fuera del cierre del servicio (fallo mío con los saltos de línea CRLF). Las reglas de la consola no estaban afectadas.
- Publicar: `git checkout main && git merge --ff-only marketing-codex && git push origin main`.

## 📌 Cómo funcionan los tics
- Tics: ✓ gris = enviado · ✓✓ gris = recibido en un aparato · ✓✓ verde = leído (en grupos, cuando lo han recibido o leído todos). Se guardan en `chats/{id}.rec[correo] = {e, l}`, con la hora del propio mensaje. Funciones `chatRec`, `chatTick`, `chatSeenT`. El «no leído» ya se sincroniza entre aparatos.
- No hace falta tocar reglas: los miembros ya pueden actualizar su chat.

## ⏭️ Siguiente
- Probar la portada y el chat en un móvil real.

## 🧠 Decisiones tomadas
- Las reglas nuevas se AÑADEN; no se sustituye todo el archivo. El `firestore.rules` del repo no incluye colecciones que la app sí usa (almacen, avisos, perfiles…), así que las reglas publicadas en Firebase deben ser distintas. Pegarlo entero podría romper esas secciones.
- Servidor local: Python no está instalado; se usa un mini servidor Node (`node serve.js <carpeta> 8765`).

## ⚠️ Problemas / dudas abiertas
- No sabemos qué reglas hay publicadas ahora en Firebase. Para comprobarlo: Perfil → «Comprobar conexión» → fila «Leer chat».
- Se cargan todos los mensajes de la historia; si un día hay miles, convendrá limitarlos (necesita un índice en Firebase).

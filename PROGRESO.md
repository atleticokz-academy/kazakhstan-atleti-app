# PROGRESO · nota de relevo

**Última actualización:** 2026-11-16 · **Por:** Claude Code

## 🎯 Objetivo actual
Rediseño de la PORTADA (pantalla de acceso, `#cover` en `index.html`) con la skill anti-ui-slop. Solo diseño: no se tocan el inicio de sesión ni Firebase.

## ✅ Hecho
- Portada nueva publicada (commit en `prueba-portada`, pasado a `main` y subido a GitHub el 2026-11-16). Se ve en https://atleticokz-academy.github.io/kazakhstan-atleti-app/
- Aplicada la dirección "B · Foto completa":
  - Ordenador: la foto ocupa toda la pantalla, el escudo y el nombre arriba a la izquierda, ES/EN/RU arriba a la derecha, la frase grande arriba a la izquierda y la tarjeta blanca de acceso a la derecha.
  - Móvil: el formulario es una hoja blanca que sube desde abajo, y «Entrar» se ve sin desplazar (probado en 390×844 y 360×640).
  - Fallos corregidos: «Nombre» ya solo sale en «Primer acceso» (`.cv-card label[hidden]{display:none}`); en portátil 1280×720 «Entrar» ya se ve y la portada permite scroll; «Contraseña» tiene el mismo borde que «Correo».
- Enlace «Primer acceso: crear el administrador» (`#cvfirst`) oculto con `hidden`, porque el administrador ya existe. Su código JS sigue ahí; para volver a mostrarlo hay que quitar `hidden`.
- Cambios: CSS bajo `/* portada */` (~línea 270), `@media (max-width:820px)` de la portada y bloque `body.mob .cover…` (~línea 325). En el HTML solo se movió el selector de idioma `#cvlangs` fuera del formulario (el JS lo busca por id).

## 🔄 En curso
- Nada en curso.

## ⏭️ Siguiente
- Probar la portada en un móvil real (iPhone/Safari y Android).

## 🧠 Decisiones tomadas
- La frase va arriba a la izquierda (no abajo como en el boceto) para no taparle las piernas al jugador de la foto.
- En el móvil se oculta el texto pequeño bajo la frase y la palabra «App», para que todo quepa.
- Servidor local: Python no está instalado (el `python` de Windows es el atajo de la Store). Se usa un mini servidor Node que está en la carpeta temporal de la sesión: `node serve.js <carpeta> 8765`.

## ⚠️ Problemas / dudas abiertas
- Sin comprobar: que en Firebase exista el documento `settings/fundador` y que las reglas de `firestore.rules` estén publicadas. Son lo que impide que alguien más se haga administrador.
- No probado en un iPhone/Android real ni en Safari; solo Chrome con emulación.

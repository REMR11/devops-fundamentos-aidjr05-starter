# Ejercicio 1 · Ver tu primer check de CI (rojo ❌ y verde ✅)

**Objetivo:** comprobar con tus propios ojos cómo GitHub Actions ejecuta `npm test` automáticamente en un Pull Request y bloquea errores antes de llegar a `main`.

## Pasos

1. Haz **Fork** de este repositorio a tu cuenta de GitHub y clónalo en tu computadora:
   ```bash
   git clone https://github.com/TU_USUARIO/devops-fundamentos-aidjr05.git
   cd devops-fundamentos-aidjr05
   ```
2. Crea una rama nueva (nunca trabajes directo en `main`):
   ```bash
   git checkout -b feat/probar-ci
   ```
3. Corre las pruebas en tu máquina para confirmar que todo parte en verde:
   ```bash
   npm test
   ```
4. **Rompe una prueba a propósito:** abre `public/logic.js` y cambia el saludo en `formatearSaludo` para que diga `'Adiós'` en lugar de `'¡Hola, ...!'`.
5. Haz commit y sube tu rama:
   ```bash
   git add public/logic.js
   git commit -m "test: provocar fallo intencional en CI"
   git push -u origin feat/probar-ci
   ```
6. En GitHub, abre un **Pull Request** de `feat/probar-ci` hacia `main` (en tu propio fork).
7. Espera ~20 segundos en la pestaña del PR y observa el recuadro de checks: verás **❌ CI · Pruebas y Build** en rojo. Haz clic en **Details** para leer qué test falló en el servidor de GitHub (`ubuntu-latest`).
8. **Arregla el código:** devuelve `formatearSaludo` a su texto original (`¡Hola, ${limpio}!...`), ejecuta `npm test` localmente, haz otro commit y push:
   ```bash
   git add public/logic.js
   git commit -m "fix: restaurar formato correcto del saludo"
   git push
   ```
9. Vuelve al Pull Request: ahora el check cambia a **✅ verde**. Haz **Merge pull request**.

## ¿Qué aprendiste?

- CI (_Integración Continua_) evita que un cambio roto entre a `main`.
- No dependes de "en mi máquina sí funcionaba": un servidor limpio prueba el proyecto en cada PR.

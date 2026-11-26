# Ejercicio 2 · Publicar tu sitio automáticamente con GitHub Pages (CD)

**Objetivo:** configurar GitHub Pages en tu fork para que cada vez que hagas merge a `main`, tu sitio se actualice solo en internet.

## Requisito previo en GitHub (solo la primera vez)

1. En tu fork en GitHub, entra a **Settings** (pestaña arriba a la derecha).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En **Build and deployment → Source**, elige **GitHub Actions** (muy importante: **no** elijas _Deploy from a branch_).

## Pasos

1. Ve a la pestaña **Actions** de tu repositorio.
2. Si ya hiciste merge en el Ejercicio 1, verás que **CD · Publicar en GitHub Pages** se disparó solo; si no, entra a **CD · Publicar en GitHub Pages** y presiona **Run workflow → Run workflow**.
3. Observa los dos jobs en pantalla:
   - `build`: corre `npm test`, ejecuta `npm run build` para generar `dist/` y empaqueta la carpeta con `actions/upload-pages-artifact`.
   - `deploy`: espera a que `build` pase (`needs: build`) y publica con `actions/deploy-pages`.
4. Cuando termine en verde ✅, haz clic en el enlace que aparece debajo del job `deploy` (será algo como `https://TU_USUARIO.github.io/devops-fundamentos-aidjr05/`).
5. **Prueba el despliegue continuo:** haz un cambio pequeño en `public/index.html` (por ejemplo, cambia el subtítulo), súbelo por rama + Pull Request a `main`, haz merge y recarga tu URL pública 1 minuto después.

## ¿Qué aprendiste?

- CD (_Despliegue Continuo_) automatiza el paso de "tengo el código listo en `main`" a "ya está publicado para los usuarios".
- Gracias a `needs: build` y `npm test` dentro del job `build`, si los tests fallan el sitio publicado **no se rompe**.

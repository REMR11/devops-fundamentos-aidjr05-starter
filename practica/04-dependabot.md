# Ejercicio 4 · Revisar un Pull Request de Dependabot

**Objetivo:** entender qué hace Dependabot, dónde se ven sus alertas y PRs, y practicar una revisión sencilla (sin fusionar a ciegas) de una actualización de dependencias.

En este repositorio incluimos a propósito **Prettier 3.9.10** (un formateador de código) como única dependencia de desarrollo, un poco detrás de la última versión publicada. Dependabot debería abrir un Pull Request para actualizarla. Esa es la práctica: no es un error, es material de clase.

## 1. ¿Qué es Dependabot?

**Dependabot** es una herramienta **gratuita de GitHub** que vigila las librerías de tu proyecto y las Actions de tus workflows. Cuando aparece una versión nueva (o un parche de seguridad), abre un **Pull Request automático** para que tu CI (pruebas, formato y build) compruebe si puedes actualizar sin romper nada.

Hay tres piezas que conviene distinguir:

- **Dependency graph** (_Grafo de dependencias_): el inventario de paquetes que GitHub detecta en tu repo (por ejemplo, lo que está en `package-lock.json`).
- **Dependabot alerts** (_Alertas_): avisos cuando un paquete que usas tiene una vulnerabilidad conocida.
- **Dependabot security updates** y **version updates**: Pull Requests automáticos. Los de _seguridad_ suben a la versión mínima que corrige el fallo; los de _versión_ (los de este ejercicio) mantienen el proyecto al día según `.github/dependabot.yml`.

## 2. Dónde ver los PRs y las alertas en GitHub

1. Entra al repositorio (el oficial o tu fork): [REMR11/devops-fundamentos-aidjr05](https://github.com/REMR11/devops-fundamentos-aidjr05).
2. Abre la pestaña **Pull requests**. Los PRs de Dependabot suelen tener el autor `dependabot` y un título como _Bump prettier from 3.9.10 to 3.10.1_.
3. También puedes ir a **Insights** (o **Información** en la interfaz en español) → **Dependency graph** → pestaña **Dependabot**. Ahí ves el estado de las actualizaciones programadas.
4. Para las alertas de seguridad: pestaña **Security** (o **Seguridad**) → **Dependabot alerts**. Si el repo es un fork, a veces las alertas hay que activarlas (paso 5).

## 3. Cómo revisar un PR de Dependabot (no lo fusiones a ciegas)

Cuando aparezca el PR de Prettier (u otro más adelante), síguelo en este orden:

1. **Lee el título y la descripción.** ¿Sube un _patch_ (3.9.10 → 3.9.11), un _minor_ (3.9.10 → 3.10.1) o un _major_ (3.x → 4.x)? Los _major_ pueden romper compatibilidad y merecen más cuidado.
2. **Abre el changelog o el enlace Release notes** que Dependabot suele incluir. En una o dos frases, ¿qué cambió? ¿Parece solo correcciones, o hay un cambio de comportamiento?
3. **Revisa la pestaña Files changed.** En este ejercicio casi solo deberías ver `package.json` y `package-lock.json` (a veces también Actions en `.github/workflows/`).
4. **Espera a que el check de CI quede en verde ✅** (`CI · Pruebas y Build`: `npm ci`, `npm test`, `npm run format:check` y `npm run build`). Si queda en rojo ❌, entra a **Details**, lee el error y no hagas merge hasta entenderlo o cerrar el PR.
5. **Decide con criterio:**
   - _Merge_: la subida es menor o de parche, el changelog no alerta roturas y el CI está verde.
   - _Cerrar el PR_: si es un _major_ que no quieres aún, o si rompe las pruebas y no vas a corregirlo ahora.
6. Si haces merge, confirma en la pestaña **Actions** que el despliegue a Pages (si aplica) sigue en verde.

## 4. Pros y contras (para no idealizar la herramienta)

**Pros ✅**

- Es automático y ya viene en GitHub: no tienes que recordar revisar npm cada semana.
- Te avisa de fallos de seguridad conocidos (_alerts_) y puede abrir PRs pequeños y fáciles de revisar.
- Cada PR pasa por tu CI, así que un test o un chequeo de formato puede frenar una actualización mala.

**Contras / limitaciones ⚠️**

- Puede generar **ruido** (muchos PRs) si el proyecto crece. Por eso en `.github/dependabot.yml` limitamos los PRs abiertos a 5.
- Una actualización **major** puede romper el proyecto aunque el PR se vea “pequeño”.
- **Fusionar a ciegas es riesgoso:** el bot no sustituye tu criterio ni tus pruebas. Si no tienes tests, un PR verde solo significa que “no había tests que fallaran”.
- No detecta malware flamante el mismo día en que se publica un paquete nuevo: por eso también revisas el lockfile y no actualizas por actualizar.

## 5. Cómo activar alertas y actualizaciones de seguridad

En un repositorio que administras (el original o tu fork):

1. Entra a **Settings**.
2. En el menú lateral, abre **Advanced Security** (a veces aparece bajo _Code security_ / _Seguridad del código_). En cuentas personales también puedes partir de **Settings → Security**.
3. Activa, si aún no lo están:
   - **Dependency graph** (suele encenderse solo en repos públicos).
   - **Dependabot alerts**.
   - **Dependabot security updates**.
4. Confirma que existe el archivo [`.github/dependabot.yml`](../.github/dependabot.yml): ahí se programan las _version updates_ semanales (npm y github-actions), en la zona horaria `America/El_Salvador`.

Si tu fork no muestra el PR de Prettier al momento, espera un rato o ve a **Insights → Dependency graph → Dependabot** y usa **Check for updates** (si aparece). Dependabot no siempre corre en el segundo exacto en que haces el fork.

## ¿Qué aprendiste?

- Las dependencias también son parte de tu pipeline: hay que mantenerlas, no solo el código que escribes tú.
- Un PR de Dependabot se revisa como cualquier otro: changelog, archivos tocados, CI en verde y una decisión consciente de merge o cierre.

# Fundamentos de DevOps · AIDJR Gen 05 (Clase 11) · Starter

Repositorio de práctica para la sesión final de **Fundamentos de DevOps** del bootcamp **AIDJR Gen 05**.

> 🚧 **Versión inicial para estudiantes:** este repo viene **sin la carpeta `.github`**. En el [Ejercicio 0](./practica/00-crear-carpeta-github.md) la vas a crear tú (CI, despliegue a Pages, Dependabot y limpieza de ramas).
>
> Solución de referencia: [REMR11/devops-fundamentos-aidjr05](https://github.com/REMR11/devops-fundamentos-aidjr05) · [sitio publicado](https://remr11.github.io/devops-fundamentos-aidjr05/)

Para empezar: usa **Use this template** o haz **fork**, clona tu copia y sigue los ejercicios.

---

## ¿Qué contiene este proyecto?

Una aplicación web sencilla (HTML + CSS + JavaScript) que muestra el ciclo de DevOps en 7 etapas y calcula tu progreso en vivo, acompañada de:

- **Pruebas automáticas** con Node.js nativo (`node:test`).
- **Script de build** (`scripts/build.mjs`) que genera la carpeta estática `dist/`.
  Lo que **tú vas a agregar** en el Ejercicio 0:

- **Pipeline de CI** (`.github/workflows/ci.yml`) que corre `npm ci`, pruebas, `format:check` y build en cada `push` y `pull_request` a `main`.
- **Pipeline de CD** (`.github/workflows/deploy-pages.yml`) que despliega `./dist` en **GitHub Pages** cada vez que se actualiza `main`.
- **Prettier 3.9.10** (devDependency, versión deliberadamente un poco anterior) para practicar un PR real de Dependabot; el CI corre `npm run format:check`.
- **Dependabot** (`.github/dependabot.yml`) revisa cada semana `npm` y `github-actions`.

## Estructura del repositorio

```text
.
├── .github/                    # ⚠️ NO existe todavía: la creas en el Ejercicio 0
├── public/                     # Código fuente de la app web
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   └── logic.js                # Lógica pura (testeable en Node y en navegador)
├── scripts/
│   └── build.mjs               # Copia public/ a dist/ y genera build-info.json
├── test/
│   └── logic.test.js           # Pruebas unitarias con node:test
├── practica/
│   ├── 00-crear-carpeta-github.md
│   ├── 01-primer-check-ci.md
│   ├── 02-despliegue-pages.md
│   ├── 03-variables-y-secretos.md
│   └── 04-dependabot.md
├── .env.example                # Plantilla segura de variables locales
├── .gitignore                  # Ignora .env, dist/ y node_modules/
├── .prettierrc.json            # Reglas de formato de Prettier
├── package.json
└── package-lock.json           # Versiones exactas (necesario para npm ci)
```

## Cómo ejecutarlo en tu computadora

Requiere **Node.js 20 o superior** (recomendado Node 24 LTS) y **Git**.

```bash
# 1. Instalar dependencias exactamente como en package-lock.json
npm ci

# 2. Ejecutar las pruebas automáticas
npm test

# 3. Verificar el formato (Prettier)
npm run format:check

# 4. Construir la carpeta dist/
npm run build

# 5. (Opcional) Ver el sitio en tu navegador local
npm run preview
```

## Activar GitHub Pages en tu fork

Para que el workflow `.github/workflows/deploy-pages.yml` funcione al hacer fork o crear tu propio repo:

1. Entra a **Settings → Pages** en GitHub.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Haz push a `main` o ejecuta el workflow manualmente desde la pestaña **Actions**.

## Ejercicios de la clase

0. [Ejercicio 0 · Crear la carpeta `.github` desde cero](./practica/00-crear-carpeta-github.md)
1. [Ejercicio 1 · Ver tu primer check de CI (rojo ❌ y verde ✅)](./practica/01-primer-check-ci.md)
2. [Ejercicio 2 · Publicar tu sitio automáticamente con GitHub Pages (CD)](./practica/02-despliegue-pages.md)
3. [Ejercicio 3 · Variables, `.env` y GitHub Secrets (lo esencial)](./practica/03-variables-y-secretos.md)
4. [Ejercicio 4 · Revisar un Pull Request de Dependabot](./practica/04-dependabot.md)

## Para investigar después (cuando domines estos fundamentos)

- **Fijar Actions por commit SHA** (en vez de `@v7`, usar el hash de 40 caracteres para evitar ataques a la cadena de suministro).
- **Docker** para empaquetar tu app con su entorno y evitar el clásico _"en mi máquina funciona"_.

# Ejercicio 0 · Crear la carpeta `.github` desde cero

Este repositorio viene **sin** la carpeta `.github`. En ella vive todo lo que automatiza GitHub: los _workflows_ de GitHub Actions y la configuración de Dependabot. Tu misión es crearla paso a paso.

> 💡 GitHub solo reconoce los workflows si están **exactamente** en `.github/workflows/` y terminan en `.yml` o `.yaml`. Cuida la indentación: YAML usa **espacios**, nunca tabulaciones.

## Paso 1 · Tu primer CI (`.github/workflows/ci.yml`)

Corre las pruebas, revisa el formato y construye el sitio en cada `push` y `pull_request` a `main`.

```yaml
name: CI · Pruebas y Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Mínimo privilegio: este workflow solo necesita leer el código.
permissions:
  contents: read

jobs:
  pruebas-y-build:
    runs-on: ubuntu-latest

    steps:
      - name: Descargar el código del repositorio
        uses: actions/checkout@v7

      - name: Instalar Node.js 24
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Instalar dependencias exactamente como en package-lock.json
        run: npm ci

      - name: Ejecutar pruebas automáticas
        run: npm test

      - name: Verificar formato con Prettier
        run: npm run format:check

      - name: Construir sitio estático en dist/
        run: npm run build
```

Haz commit y push a `main`, luego abre la pestaña **Actions**: deberías ver **CI · Pruebas y Build** corriendo. ✅

## Paso 2 · Despliegue continuo a GitHub Pages (`.github/workflows/deploy-pages.yml`)

Antes de hacer push: ve a **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**.

```yaml
name: CD · Publicar en GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# Permisos necesarios para leer el repo, crear un token OIDC y publicar en Pages.
permissions:
  contents: read
  pages: write
  id-token: write

# Evita que dos despliegues compitan al mismo tiempo.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar el código
        uses: actions/checkout@v7

      - name: Instalar Node.js 24
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Instalar dependencias exactamente como en package-lock.json
        run: npm ci

      - name: Verificar pruebas antes de publicar
        run: npm test

      - name: Construir carpeta dist/
        run: npm run build

      - name: Configurar GitHub Pages
        uses: actions/configure-pages@v6

      - name: Subir artefacto de Pages
        uses: actions/upload-pages-artifact@v5
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Desplegar en GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

## Paso 3 · Dependabot (`.github/dependabot.yml`)

Ojo: este archivo va directo en `.github/`, **no** dentro de `workflows/`.

```yaml
# Dependabot revisa cada semana si hay versiones nuevas de
# paquetes npm y de GitHub Actions, y abre Pull Requests pequeños.
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '09:00'
      timezone: America/El_Salvador
    open-pull-requests-limit: 5
    commit-message:
      prefix: 'deps'
      prefix-development: 'deps'
      include: 'scope'

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '09:00'
      timezone: America/El_Salvador
    open-pull-requests-limit: 5
    commit-message:
      prefix: 'ci'
      include: 'scope'
```

## Paso 4 (extra) · Borrar ramas automáticamente al hacer merge a `dev` (`.github/workflows/limpiar-ramas.yml`)

Primero crea la rama `dev` (`git push origin main:dev`). Este workflow borra la rama de un PR mezclado en `dev` **solo** si su nombre usa un prefijo de Conventional Commits (`feat/`, `fix/`, `docs/`, `chore/`...).

```yaml
# Borra automáticamente la rama de un PR cuando se hace merge a `dev`,
# pero SOLO si el nombre de la rama usa un prefijo de Conventional Commits.
# Ejemplos que se borran:    feat/login, fix/boton-roto, chore/deps, docs/readme
# Ejemplos que NO se borran: dev, main, mi-rama, prueba/algo
name: Limpiar ramas al hacer merge a dev

on:
  pull_request:
    types: [closed]
    branches: [dev]

permissions:
  contents: write # necesario para borrar ramas

jobs:
  borrar-rama:
    # Solo si el PR se mezcló (no si se cerró sin merge) y viene de este mismo repo (no de un fork)
    if: github.event.pull_request.merged == true && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - name: Revisar prefijo y borrar la rama
        env:
          RAMA: ${{ github.event.pull_request.head.ref }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          echo "Rama mezclada: $RAMA"
          PATRON='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9-]+\))?[/-].+'
          if [[ "$RAMA" =~ $PATRON ]]; then
            echo "Prefijo convencional detectado: se borra la rama."
            gh api -X DELETE "repos/${{ github.repository }}/git/refs/heads/$RAMA"
          else
            echo "La rama no usa un prefijo convencional: se conserva."
          fi
```

Pruébalo: crea `feat/mi-prueba`, abre un PR hacia `dev`, haz merge y revisa que la rama desapareció. Repite con una rama llamada `prueba-sin-prefijo` y verás que **no** se borra.

## Resultado esperado

```text
.github/
├── dependabot.yml
└── workflows/
    ├── ci.yml
    ├── deploy-pages.yml
    └── limpiar-ramas.yml
```

Cuando lo tengas, sigue con el [Ejercicio 1](./01-primer-check-ci.md).

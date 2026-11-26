# Ejercicio 3 · Variables, `.env` y GitHub Secrets (lo esencial)

**Objetivo:** saber dónde van los datos de configuración y las contraseñas sin subirlas por error a GitHub.

## Regla de oro

- **`.env`**: vive **solo en tu computadora** y está en `.gitignore`. Nunca se sube a Git.
- **`.env.example`**: sí se sube al repositorio, pero solo con nombres de variables y valores de ejemplo falsos.
- **GitHub Variables (`vars`)**: para configuración no secreta en Actions (por ejemplo, `APP_ENV=production`).
- **GitHub Secrets (`secrets`)**: para contraseñas, tokens o API keys reales (ej. `API_KEY`). GitHub los guarda cifrados y los oculta con `***` si alguien intenta imprimirlos en logs.

## Pasos

1. Abre `.gitignore` y confirma que `.env` y `dist/` están listados ahí.
2. Abre `.env.example` y copia su contenido a un archivo local `.env`:
   ```bash
   cp .env.example .env
   ```
3. Ejecuta `git status` en tu terminal: verás que `.env` **no aparece** como archivo para subir porque Git lo ignora automáticamente.
4. En tu repositorio de GitHub, entra a **Settings → Secrets and variables → Actions** y explora las dos pestañas:
   - **Secrets** (para valores privados).
   - **Variables** (para valores públicos de configuración).
5. (Opcional para investigar después): si un día usas secretos en un workflow, pásalos por `env:` al paso que los necesita y nunca escribas el secreto directo en el código fuente.

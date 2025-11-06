# UFV FoundIt – Docker

Esta estructura separa el proyecto en **frontend** (Vite + React) y **backend** (Node + Express) y está lista para levantarse con:

```bash
docker compose up --build
```

## Servicios

- **frontend**
  - Contexto: `./frontend`
  - Imagen: Node (build) + Nginx (runtime)
  - Puerto host: `8080` → contenedor `80`
  - URL: http://localhost:8080

- **backend**
  - Contexto: `./backend`
  - Imagen: Node 22
  - Puerto host: `4000` → contenedor `4000`
  - URL base API (ejemplo): http://localhost:4000
  - Endpoint de prueba: `GET /api/health`

## Flujo básico

1. Asegúrate de tener **Docker** y **Docker Compose** instalados.
2. Desde la raíz del proyecto (donde está `docker-compose.yml`):

   ```bash
   docker compose up --build
   ```

3. Abre el navegador en http://localhost:8080

## Cómo conectar el frontend con el backend

En el `docker-compose.yml` el frontend tiene definida la variable:

```yaml
environment:
  - VITE_API_BASE_URL=http://backend:4000
```

Dentro de React, cuando lo necesites, podrás usarla así:

```ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
```

Y consumir, por ejemplo:

```ts
const res = await fetch(`${apiBaseUrl}/api/health`);
```

## Extender el backend

El backend está en `./backend/src/index.js` con un servidor Express muy simple. Ahí podrás:

- Añadir nuevas rutas (`app.get`, `app.post`, etc.).
- Conectar tu base de datos (Mongo, Postgres, MySQL, etc.).
- Implementar autenticación, lógica de negocio, etc.

Cada vez que cambies código del backend o del frontend y quieras reconstruir las imágenes:

```bash
docker compose up --build
```

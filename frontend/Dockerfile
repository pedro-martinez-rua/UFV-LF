# Frontend - Vite React (build + Nginx)
FROM node:22-alpine AS build

WORKDIR /app

# Instala dependencias
COPY package.json package-lock.json* bun.lockb* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# Imagen ligera de Nginx para servir estáticos
FROM nginx:alpine

# Copia configuración custom para SPA (soporte de rutas de React)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

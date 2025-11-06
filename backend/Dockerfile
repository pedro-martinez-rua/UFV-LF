# Backend - Node.js + Express
FROM node:22-alpine

WORKDIR /app

# Instala sólo las dependencias necesarias
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copia el código
COPY . .

EXPOSE 4000

CMD ["npm", "start"]

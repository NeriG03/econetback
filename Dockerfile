# Etapa de construcción
FROM node:20-alpine as builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Generar el build
RUN npm run build

# Etapa de producción
FROM node:20-alpine as production

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar archivos compilados y necesarios desde la etapa de builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/typeorm.config.ts ./typeorm.config.ts

# Variables de entorno
ENV NODE_ENV=production

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/src/main.js"]
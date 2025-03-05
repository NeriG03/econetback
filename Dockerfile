# Etapa de construcción
FROM node:20-alpine as build

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine as production

WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/typeorm.config.ts ./typeorm.config.ts
COPY --from=build /app/migrations ./migrations

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
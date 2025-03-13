# Instrucciones para Docker - EcoNet Backend

Este documento explica cómo ejecutar el proyecto EcoNet Backend utilizando Docker para que cualquier miembro del equipo pueda poner en marcha el proyecto rápidamente.

## Requisitos previos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (viene incluido con Docker Desktop en Windows y macOS)

## Inicio rápido

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd econetback
```

2. Configura el archivo `.env`:

   - Puedes utilizar el archivo `.env-example` existente como punto de partida
   - Para desarrollo, no necesitas modificar nada
   - Para producción, cambia los valores según corresponda

3. Inicia los contenedores:

```bash
docker-compose up -d
```

4. La aplicación estará disponible en:
   - API: http://localhost:3000
   - Base de datos PostgreSQL: localhost:5432

## Comandos útiles

### Ver logs

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs solo de la API
docker-compose logs api

# Ver logs solo de la base de datos
docker-compose logs postgres
```

### Detener los contenedores

```bash
docker-compose down
```

### Detener y eliminar volúmenes (CUIDADO: Esto borrará la base de datos)

```bash
docker-compose down -v
```

### Reconstruir la aplicación después de cambios

```bash
docker-compose build api
docker-compose up -d api
```

### Detener contenedores, una vez hecho se recontruye la aplicación (ponle el '-v' en compose down si quieres eliminar volúmenes)

```bash
docker compose down && docker compose up --build ; 1 > $null; start-sleep -milliseconds 150
```

## Manejo de migraciones

Si necesitas ejecutar migraciones manualmente dentro del contenedor:

```bash
# Entrar al contenedor de la API
docker-compose exec api sh

# Dentro del contenedor, ejecutar:
npm run migration:run
```

Para más detalles sobre las migraciones, consulta el archivo `migrations/README.md`.

## Estructura Docker

- `Dockerfile`: Define la imagen Docker para la aplicación NestJS
- `docker-compose.yml`: Configura los servicios, redes y volúmenes

## Acceso a la base de datos

Para conectarte a la base de datos desde una herramienta como DBeaver o pgAdmin:

- Host: localhost
- Puerto: 5432
- Base de datos: econet_db (o el valor de DB_NAME en tu .env)
- Usuario: postgres (o el valor de DB_USERNAME en tu .env)
- Contraseña: postgres (o el valor de DB_PASSWORD en tu .env)

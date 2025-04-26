# Guía de Migraciones para EcoNet

Este documento explica cómo utilizar las migraciones de base de datos en el proyecto EcoNet utilizando TypeORM.

## ¿Qué son las migraciones?

Las migraciones son una forma de gestionar cambios incrementales y reversibles en el esquema de la base de datos. Te permiten:
- Aplicar cambios estructurales a la BD sin perder datos
- Tener un historial de cambios en la base de datos
- Revertir cambios si es necesario
- Sincronizar esquemas entre diferentes entornos

## Comandos disponibles

Todos estos comandos están configurados en el `package.json`:

### Crear una migración vacía
```bash
npm run migration:create --name=NombreDeLaMigracion
```
Este comando crea un archivo de migración vacío que puedes editar manualmente.

### Generar una migración automáticamente
```bash
npm run migration:generate --name=NombreDeLaMigracion
```
Este comando genera automáticamente una migración basada en las diferencias entre las entidades y la base de datos actual.

### Ejecutar migraciones pendientes
```bash
npm run migration:run
```
Este comando ejecuta todas las migraciones pendientes.

### Revertir la última migración
```bash
npm run migration:revert
```
Este comando revierte la última migración aplicada.

## Flujo de trabajo recomendado

1. Desarrolla y actualiza tus entidades en `src/entities/`
2. Genera una migración: `npm run migration:generate --name=CambioDescriptivo`
3. Revisa el archivo generado en la carpeta `migrations` para asegurarte que los cambios son los esperados
4. Ejecuta la migración: `npm run migration:run`
5. Si algo sale mal, revierte: `npm run migration:revert`

## Variables de entorno

Las migraciones utilizan las mismas variables de entorno que la aplicación:

- `DB_HOST`: Host de la base de datos
- `DB_PORT`: Puerto de la base de datos 
- `DB_USERNAME`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `DB_NAME`: Nombre de la base de datos
- `NODE_ENV`: Entorno (development/production)

## Entorno de producción

En producción, las migraciones se ejecutan automáticamente al iniciar la aplicación
(`migrationsRun: true`). En desarrollo, los cambios en el esquema se aplican automáticamente
(`synchronize: true`), pero esto no es recomendable en producción.
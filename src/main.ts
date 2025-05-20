import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors();

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('EcoNet API')
    .setDescription('API para la plataforma EcoNet de desarrollo sustentable')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Endpoints de gestión de usuarios')
    .addTag('activities', 'Endpoints de gestión de actividades')
    .addTag('user-activities', 'Endpoints de relación entre usuarios y actividades')
    .addTag('manuals', 'Endpoints de gestión de manuales')
    .addTag('notices', 'Endpoints de gestión de notificaciones')
    .addTag('gamification', 'Endpoints de gamificación para usuarios')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingrese token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  console.log(`Application running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();

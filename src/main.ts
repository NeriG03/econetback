import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); //Esto ponlo asi
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  
  app.enableCors();

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap();

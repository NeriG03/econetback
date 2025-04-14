import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManualsModule } from './manuals/manuals.module';
import { NoticesModule } from './notices/notices.module';
import { ActivitiesModule } from './activities/activities.module';
import { UserActivitiesModule } from './user-activities/user-activities.module';
import { GamificationModule } from './gamification/gamification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production',
        migrationsRun: process.env.NODE_ENV === 'production',
        driver: require('mysql2'),
        logging: true,
        logger: 'advanced-console',
        extra: {
          decimalNumbers: true,
        },
      }),
    }),
    UsersModule,
    AuthModule,
    ManualsModule,
    NoticesModule,
    ActivitiesModule,
    UserActivitiesModule,
    GamificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

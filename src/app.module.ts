import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './core/files/files.module';
import { IsUniqueConstraint } from './core/validators/is-unique.validator';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/files',
      exclude: ['/files/upload', '/files/:folder'],
    }),

    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as 'mysql') ?? 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASS ?? '',
      database: process.env.DB_NAME ?? 'practica1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    FilesModule,

    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}

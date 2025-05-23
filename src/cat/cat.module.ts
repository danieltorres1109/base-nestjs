import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), AuthModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}

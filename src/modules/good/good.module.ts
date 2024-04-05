import { Module } from '@nestjs/common';
import { GoodService } from './good.service';
import { GoodController } from './good.controller';
import { GoodRepository } from './good.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [BuildingModule, TypeOrmModule.forFeature([GoodRepository])],
  controllers: [GoodController],
  providers: [GoodService],
  exports: [GoodService],
})
export class GoodModule {}

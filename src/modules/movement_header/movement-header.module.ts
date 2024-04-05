import { Module } from '@nestjs/common';
import { MovementHeaderService } from './movement-header.service';
import { MovementHeaderController } from './movement-header.controller';
import { MovementHeaderRepository } from './movement-header.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [
    BuildingModule,
    TypeOrmModule.forFeature([MovementHeaderRepository]),
  ],
  controllers: [MovementHeaderController],
  providers: [MovementHeaderService],
  exports: [MovementHeaderService],
})
export class MovementHeaderModule {}

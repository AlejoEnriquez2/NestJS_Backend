import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [BuildingModule, TypeOrmModule.forFeature([PropertyRepository])],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}

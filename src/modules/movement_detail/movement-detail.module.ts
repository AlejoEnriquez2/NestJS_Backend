import { Module } from '@nestjs/common';
import { MovementDetailService } from './movement-detail.service';
import { MovementDetailController } from './movement-detail.controller';
import { MovementDetailRepository } from './movement-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '../service/service.module';
import { PropertyModule } from '../property/property.module';
import { MovementHeaderModule } from '../movement_header/movement-header.module';

@Module({
  imports: [
    ServiceModule,
    PropertyModule,
    MovementHeaderModule,
    TypeOrmModule.forFeature([MovementDetailRepository]),
  ],
  controllers: [MovementDetailController],
  providers: [MovementDetailService],
  exports: [MovementDetailService],
})
export class MovementDetailModule {}

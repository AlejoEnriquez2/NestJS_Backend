import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementDetailModule } from '../movement_detail/movement-detail.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [PropertyModule, TypeOrmModule.forFeature([ServiceRepository])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}

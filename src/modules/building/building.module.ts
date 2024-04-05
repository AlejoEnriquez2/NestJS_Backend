import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingRepository } from './building.repository';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([BuildingRepository]),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}

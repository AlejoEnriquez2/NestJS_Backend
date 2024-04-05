import { Module } from '@nestjs/common';
import { AssemblyService } from './assembly.service';
import { AssemblyController } from './assembly.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssemblyRepository } from './assembly.repository';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [BuildingModule, TypeOrmModule.forFeature([AssemblyRepository])],
  controllers: [AssemblyController],
  providers: [AssemblyService],
  exports: [AssemblyService],
})
export class AssemblyModule {}

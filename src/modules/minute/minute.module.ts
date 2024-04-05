import { Module } from '@nestjs/common';
import { MinuteService } from './minute.service';
import { MinuteController } from './minute.controller';
import { MinuteRepository } from './minute.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssemblyModule } from '../assembly/assembly.module';

@Module({
  imports: [AssemblyModule, TypeOrmModule.forFeature([MinuteRepository])],
  controllers: [MinuteController],
  providers: [MinuteService],
  exports: [MinuteService],
})
export class MinuteModule {}

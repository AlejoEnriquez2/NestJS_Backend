import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PhoneRepository } from './phone.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([PhoneRepository])],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService],
})
export class PhoneModule {}

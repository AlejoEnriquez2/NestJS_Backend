import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerRepository } from './owner.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([OwnerRepository])],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}

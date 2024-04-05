import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierRepository } from './supplier.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([SupplierRepository])],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}

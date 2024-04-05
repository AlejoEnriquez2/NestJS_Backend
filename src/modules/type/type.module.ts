import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepository } from './type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierModule } from '../supplier/supplier.module';
import { OwnerModule } from '../owner/owner.module';
import { TenantModule } from '../tenant/tenant.module';
import { PropertyModule } from '../property/property.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    SupplierModule,
    OwnerModule,
    TenantModule,
    PropertyModule,
    EmployeeModule,
    TypeOrmModule.forFeature([TypeRepository]),
  ],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}

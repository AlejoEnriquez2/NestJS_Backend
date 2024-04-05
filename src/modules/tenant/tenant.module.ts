import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepository } from './tenant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([TenantRepository])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}

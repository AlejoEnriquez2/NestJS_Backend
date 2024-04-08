import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities/admin.entity';
import { Patient } from './entities/patient.entity';

import { AdminController } from './controllers/admin.controller';
import { PatientController } from './controllers/patient.controller';
import { AdminService } from './services/admin.service';
import { PatientService } from './services/patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Patient])],
  controllers: [AdminController, PatientController],
  providers: [AdminService, PatientService],  
})
export class UserModule {}

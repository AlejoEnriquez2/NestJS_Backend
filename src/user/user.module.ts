import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Patient } from './entities/patient.entity';

import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller'; // Fixed import path
import { AdminController } from './controllers/admin.controller';
import { PatientController } from './controllers/patient.controller';
import { AdminService } from './services/admin.service';
import { PatientService } from './services/patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Patient])],
  controllers: [UserController, AdminController, PatientController],
  providers: [UserService, AdminService, PatientService],
})
export class UserModule {}

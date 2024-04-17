import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities/admin.entity';
import { Patient } from './entities/patient.entity';

import { AdminController } from './controllers/admin.controller';
import { PatientController } from './controllers/patient.controller';
import { AdminService } from './services/admin.service';
import { PatientService } from './services/patient.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Patient]), JwtModule.register({
    secret: 'password',
    signOptions: {expiresIn: '24h'}
  })],
  controllers: [AdminController, PatientController, AuthController],
  providers: [AdminService, PatientService, AuthService],  
})
export class UserModule {}

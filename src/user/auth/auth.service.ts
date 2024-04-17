import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PatientService } from '../services/patient.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AuthService {
    constructor(
      private patientService: PatientService,
      private adminService: AdminService,
      private jwtService: JwtService,  
    ){}

    async validatePatient(email: string, password: string): Promise<any>{
        const patient = await this.patientService.findByEmail(email);
        if(patient && await bcrypt.compare(password, patient.password)){
            const {password, ...result } = patient;
            return result;
        }
        return null;
    }

    async patientLogin(patient: any){
        const payload = { email: patient.email, sub: patient.id, role: 'patient' };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    generateJwtToken(patient:any){
        const payload = { patient: patient.email, patientId: patient.id, role: 'patient'};
        return this.jwtService.sign(payload);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Repository } from 'typeorm';
import { PatientDto } from '../dtos/patient.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) {}

    async findAll(): Promise<Patient[]> {
        return await this.patientRepository.find();        
    }

    async findOne(id: number): Promise<Patient> {
        const patient = await this.patientRepository.findOne(id);
        if (!patient) {
            throw new NotFoundException(`Patient #${id} not found`);
        }
        return patient;
    }

    async findByEmail(email: string): Promise<Patient>{
        const patient = await this.patientRepository.findOne({ where: { email } });
        if(!patient){
            throw new NotFoundException(`Patient with email ${email} not found`);
        }
        return patient;
    }


    create(data: PatientDto){
        const newPatient = this.patientRepository.create(data);
        return this.patientRepository.save(newPatient);
    }

    async update(id: number, changes: PatientDto){
        const patient = await this.findOne(id);
        this.patientRepository.merge(patient, changes);
        return this.patientRepository.save(patient);
    }

    remove(id: number){
        return this.patientRepository.delete(id);
    }
}

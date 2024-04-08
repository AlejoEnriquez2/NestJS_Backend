// src/patients/entities/patient.entity.ts
import { Column, Entity,  } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Patient extends User {
    @Column({ type: 'varchar', length: 255})
    status?: string;

    @Column({ type: 'int', default: 0})
    grade?: number;

    @Column({ type: 'varchar', length: 500})
    description?: string;
}

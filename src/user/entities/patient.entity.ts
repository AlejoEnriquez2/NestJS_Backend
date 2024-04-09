// src/patients/entities/patient.entity.ts
import { Column, Entity, OneToMany,  } from 'typeorm';
import { User } from './user.entity';
import { Test } from 'src/test/entities/test.entity';

@Entity()
export class Patient extends User {
    @Column({ type: 'varchar', length: 255})
    status?: string;

    @Column({ type: 'int', default: 0})
    grade?: number;

    @Column({ type: 'varchar', length: 500})
    description?: string;

    @OneToMany(() => Test, test => test.patient)
    tests: Test[];
}

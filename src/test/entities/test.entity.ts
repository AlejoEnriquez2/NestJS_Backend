import { Patient } from "src/user/entities/patient.entity";
import { UserAnswers } from "./user-answers.entity";
import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Form } from "./form.entity";


export class Test{
    
    @PrimaryGeneratedColumn()
    testId: number;

    @Column({type: 'date'})
    testDate: Date;

    @Column({type: 'number'})
    testTotalTime: number;

    @Column({type: 'number'})
    testTotalGrade: number;

    @Column({type: 'varchar', length: 255})
    patientName: string;

    @Column({type: 'date'})
    patientBirthday: Date;

    @Column({type: 'varchar', length: 255})
    patientEducation: string;

    @Column({type: 'varchar', length: 50})
    patientGender: string;

    @Column({type: 'varchar', length: 50})
    patientRace: string; 

    @Column({type: 'varchar', length: 50})
    patientMemory: string;

    @Column({type: 'boolean'})
    patientRelatives: boolean;

    @Column({type: 'varchar', length: 50})
    patientBalance: string;

    @Column({type: 'boolean'})
    patientMajorStroke: boolean;

    @Column({type: 'boolean'})
    patientMinorStroke: boolean;

    @Column({type: 'varchar', length: 50})
    patientDepression: string;

    @Column({type: 'varchar', length: 50})
    patientPersonality: string;

    @Column({type: 'varchar', length: 50})
    patientDifficulties: string;

    // TABLE FUNCTIONS //

    @CreateDateColumn({
    type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    isDeleted: Date

    // RELATIONS //

    // @OneToOne(() => UserAnswers, userAnswers => userAnswers.test, {nullable: true})
    // @JoinColumn({name: 'answersId'})
    answer: UserAnswers;

    form: Form;

    patient: Patient;


}
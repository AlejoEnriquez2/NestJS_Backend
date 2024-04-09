import { Patient } from "src/user/entities/patient.entity";
import { UserAnswers } from "src/test/entities/user-answers.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Form } from "./form.entity";

@Entity()
export class Test{
    
    @PrimaryGeneratedColumn()
    testId: number;

    @Column({type: 'date'})
    testDate: Date;

    @Column({type: 'int'})
    testTotalTime: number;

    @Column({type: 'int'})
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


    @Column({ type: 'date', default: null})
    isDeleted: Date

    // RELATIONS //

    @OneToOne(() => UserAnswers, userAnswers => userAnswers.test, {nullable: true})
    @JoinColumn({name: 'answersId'})
    answers: UserAnswers;

    @ManyToOne(() => Form, {nullable: true})
    @JoinColumn({name: 'formId'})
    form: Form;

    @ManyToOne(() => Patient, {nullable: true})
    @JoinColumn({name: 'patientId'})
    patient: Patient;


}
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";

@Entity({schema: 'public'})
export class FormAnswers{

    @PrimaryGeneratedColumn()
    formAnswersId: number;

    @Column({type: 'varchar', length: 15})
    orientationMonth: string;

    @Column({type: 'varchar', length: 15})
    orientationDay: string;

    @Column({type: 'varchar', length: 15})
    orientationYear: string;

    @Column({type: 'varchar', length: 50})
    namingPicture1: string;

    @Column({type: 'varchar', length: 50})
    namingPicture2: string;

    @Column({type: 'varchar', length: 50})
    similarities: string;

    @Column({type: 'float'})
    calculation1: number;

    @Column({type: 'float'})
    calculation2: number;

    @Column({type: 'bytea'})
    constructionsRedraw: Buffer;

    @Column({type: 'bytea'})
    constructionsDraw: Buffer;

    @Column({type: 'varchar', length: 200})
    verbalWords: string[];

    @Column({type: 'varchar', length: 50})
    executiveTrail: string;

    @Column({type: 'varchar', length: 50})
    executiveLines: string;

    @Column({type: 'bytea'})
    executiveDraw: Buffer;

    @Column({type: 'varchar', length: 50})
    memoryPhrase: string;

    // RELATIONS //
    @OneToOne(() => Form, form => form.formAnswers)
    @JoinColumn({name: 'formId'})
    form: Form;
    
}
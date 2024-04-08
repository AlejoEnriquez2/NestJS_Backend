import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormAnswers } from "./form-answers.entity";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    formId: number;

    @Column({type: 'bytea'})
    namingImages: Buffer;

    @Column({type: 'varchar', length: 500})
    abstractQuestion: string;

    @Column({type: 'varchar', length: 1000})
    mathQuestions: string[];

    @Column({type: 'varchar', length: 500})
    finalPhrases: string;

    @Column({type: 'bytea'})
    redrawPicture: Buffer;

    @Column({type: 'bytea'})
    drawInstructions: Buffer;

    @Column({type: 'bytea'})
    drawAnswer: Buffer;

    @Column({type: 'varchar', length: 500})
    writingTopic: string;

    @Column({type: 'varchar', length: 500})
    exampleExecutive: string;

    @Column({type: 'varchar', length: 500})
    instructionsExecutive: string;

    @Column({type: 'bytea'})
    executiveImage: Buffer;

    // RELATIONS //    
    // @OneToOne(() => FormAnswers, formAnswers => formAnswers.form, {nullable: true})
    // @JoinColumn({name: 'formAnswersId'})
    // formAnswers: FormAnswers;
    
    // @OneToOne(() => FormAnswers, (formAnswers) => formAnswers.form, {nullable: true})
    formAnswers: FormAnswers;
}
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormAnswers } from "./form-answers.entity";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    formId: number | null;

    @Column({type: 'varchar'})
    namingImage1: string | null;

    @Column({type: 'varchar'})
    namingImage2: string | null;

    @Column({type: 'varchar', length: 500})
    abstractQuestion: string | null;

    @Column({type: 'varchar', length: 1000})
    mathQuestions: string[] | null;

    @Column({type: 'varchar', length: 500})
    finalPhrases: string | null;

    @Column({type: 'varchar'})
    redrawPicture: string | null;

    @Column({type: 'varchar'})
    drawInstructions: string | null;

    @Column({type: 'varchar'})
    drawAnswer: string | null;

    @Column({type: 'varchar', length: 500})
    writingTopic: string | null;

    @Column({type: 'varchar', length: 500})
    exampleExecutive: string | null;

    @Column({type: 'varchar', length: 500})
    instructionsExecutive: string | null;

    @Column({type: 'varchar'})
    executiveImage: string | null;

    // RELATIONS //    
    // @OneToOne(() => FormAnswers, formAnswers => formAnswers.form, {nullable: true})
    // @JoinColumn({name: 'formAnswersId'})
    // formAnswers: FormAnswers;    

}
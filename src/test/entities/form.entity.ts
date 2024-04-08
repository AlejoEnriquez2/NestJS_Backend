import { Buffer } from 'buffer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAnswers } from "./user-answers.entity";
import { FormAnswers } from './form-answers.entity';

export class Form {

    @PrimaryGeneratedColumn()
    formId: number;

    namingImages: Buffer;

    abstractQuestion: string;

    mathQuestions: string[];

    finalPhrases: string;

    redrawPicture: Buffer;

    drawInstructions: Buffer;

    drawAnswer: Buffer;

    writingTopic: string;

    exampleExecutive: string;

    instructionsExecutive: string;

    executiveImage: Buffer;


    // RELATIONS

    formAnswers: FormAnswers;

}
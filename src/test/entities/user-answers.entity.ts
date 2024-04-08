import { Buffer } from 'buffer';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Test } from './test.entity';


export class UserAnswers {
    
    @PrimaryGeneratedColumn()
    answersId: number;

    orientationMonth: string;

    orientationDate: string;

    orientationYear: string;

    namingPicture1: string;

    namingPicture2: string;

    similarities: string;

    calculation1: number;

    calculation2: number;

    constructionsRedraw: Buffer;

    constructionsDraw: Buffer;

    verbalWords: string[];
    
    executiveTrail: string;

    executiveLines: string;

    executiveDraw: Buffer;

    memoryPhrase: string;


    // RELATIONS //
    test = Test;
}
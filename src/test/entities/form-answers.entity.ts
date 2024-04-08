import { PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";


export class FormAnswers{

    @PrimaryGeneratedColumn()
    formAnswersId: number;

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

    form = Form;
}
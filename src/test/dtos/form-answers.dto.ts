import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateFormAnswersDto {

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the month'})
    orientationMonth: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the day'})
    orientationDay: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the year'})
    orientationYear: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the first picture`s name'})
    namingPicture1: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the second picture`s name'})
    namingPicture2: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the similarities'})
    similarities: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the first calculation'})
    calculation1: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the second calculation'})
    calculation2: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the redrawn picture'})
    constructionsRedraw: Buffer;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the drawn picture'})
    constructionsDraw: Buffer;

    @IsNotEmpty()
    @ApiProperty({ description: 'The list of words that can be a right anwser'})
    verbalWords: string[];

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the trail'})
    executiveTrail: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the lines'})
    executiveLines: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The right answer of the drawing'})
    executiveDraw: Buffer;

    @IsNotEmpty()
    @ApiProperty({ description: 'The final phrase answer'})
    memoryPhrase: string;


    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The id of the form that the answers are related to'})
    readonly formId: number;
}

export class UpdateFormAnswersDto extends PartialType(CreateFormAnswersDto) { }
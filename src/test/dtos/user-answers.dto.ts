import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserAnswersDto {

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the month'})
    orientationMonth: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the day'})
    orientationDay: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the year'})
    orientationYear: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the first picture`s name'})
    namingPicture1: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the second picture`s name'})
    namingPicture2: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the similarities'})
    similarities: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the first calculation'})
    calculation1: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the second calculation'})
    calculation2: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'The user`s answer of the redrawn picture'})
    constructionsRedraw: string[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'The user`s answer of the drawn picture'})
    constructionsDraw: string[];

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'The list of words that can be a user answered'})
    verbalWords: string[];

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the trail'})
    executiveTrail: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of checking the lines'})
    executiveLines: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'The lines the user selected'})
    executiveLinesDraw: string[];    

    @IsNotEmpty()
    @ApiProperty({ description: 'The form id of the test'})
    formId: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'The language of the test'})
    testLanguage: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: 'The user`s drawing of the executive part'})
    executiveDraw: string[];

    @IsNotEmpty()
    @ApiProperty({ description: 'The user`s answer of the memory final phrase'})
    memoryPhrase: string;

    @IsOptional()
    @ApiProperty({ description: 'The user`s grade of the test'})
    grade: number | null;

}

export class UpdateUserAnswersDto extends PartialType(CreateUserAnswersDto) {}
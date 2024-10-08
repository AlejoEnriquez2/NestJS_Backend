import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateFormDto {
    
    @IsNotEmpty()
    @ApiProperty({ description: 'The images that are supposed to be named' })
    namingImage1: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The images that are supposed to be named' })
    namingImage2: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The abstract question of the test' })
    abstractQuestion: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The math questions of the test' })
    mathQuestions: string[];

    @IsNotEmpty()
    @ApiProperty({ description: 'The final phrases of the test' })
    finalPhrases: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The picture that is supposed to be redrawn' })
    redrawPicture: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The picture that is supposed to be drawn' })
    drawInstructions: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The answer of the drawing' })
    drawAnswer: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The instructions for the writing part' })
    writingTopic: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The example of the executive part' })
    exampleExecutive: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The instructions for the executive part' })
    instructionsExecutive: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The image for the executive part' })
    executiveImage: string;
}

export class UpdateFormDto extends PartialType(CreateFormDto) {}
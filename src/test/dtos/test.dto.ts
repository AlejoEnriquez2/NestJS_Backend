import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsPositive } from "class-validator";

export class CreateTestDto {

    @IsNotEmpty()
    @ApiProperty({ description: 'The date the Test was taken' })
    testDate: Date;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The total time the Test took' })
    testTotalTime: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The total grade of the Test' })
    testTotalGrade: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'The answers name of the Patient that took the Test' })
    patientName: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({ description: 'The birthday of the Patient' })
    patientBirthday: Date;

    @IsNotEmpty()
    @ApiProperty({ description: 'The education level of the Patient' })
    patientEducation: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The gender of the patient' })
    patientGender: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The race of the patient' })
    patientRace: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The memory status of the patient' })
    patientMemory: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The family issues of the patient' })
    patientRelatives: boolean;

    @IsNotEmpty()
    @ApiProperty({ description: 'The balance issues of the patient' })
    patientBalance: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'If the patient had a major stroke' })
    patientMajorStroke: boolean;

    @IsNotEmpty()
    @ApiProperty({ description: 'If the patient had a minor stroke' })
    patientMinorStroke: boolean;

    @IsNotEmpty()
    @ApiProperty({ description: 'The depression status of the patient' })
    patientDepression: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The personality changes of the patient' })
    patientPersonality: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Everyday difficulties' })
    patientDifficulties: boolean;


    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The id of the Answers of the test' })
    readonly answersId: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The form the Test is using' })
    readonly formId: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: 'The id of the Patient that took the Test' })
    readonly patientId: number;
}

export class UpdateTestDto extends PartialType(CreateTestDto) { }
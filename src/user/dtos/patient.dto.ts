import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto extends CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty( {description: 'The cognitive status of the patient according to the SAGE test'})
    status?: string;

    @IsNumber()
    @IsOptional()
    grade: number;

    @IsString()
    @IsOptional()
    description: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, IsOptional, IsNotEmpty, MinLength } from "class-validator";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty( {description: 'The name of the User'})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty( {description: 'The email of the User'})
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty( {description: 'The password of the User'})
    password?: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreatePhoneDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The phone number' })
  readonly phn_number: string;

  @IsOptional()
  @ApiProperty({ description: 'The company which provides the phone service' })
  readonly phn_operator: string | null;

  @IsOptional()
  @ApiProperty({ description: 'An extension, if exists one' })
  readonly phn_extension: string | null;

  @IsOptional()
  @ApiProperty({ description: 'A description of the phone' })
  readonly phn_description: string | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The id of the person that owns the phone' })
  readonly person_id: number;
}

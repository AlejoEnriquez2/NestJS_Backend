import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the person' })
  readonly per_first_name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the person' })
  readonly per_last_name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'The email of the person' })
  readonly per_email: string | null;

  @IsOptional()
  @ApiProperty({ description: 'The unique regional id of the person' })
  readonly per_id_number: string | null;

  @IsOptional()
  @ApiProperty({
    description: 'The prefix of the person: Sr, Sra, Dr, Dra, etc',
  })
  readonly per_prefix: string | null;

  // OWNER

  @IsOptional()
  @ApiProperty({ description: 'The password when a person has an account' })
  readonly per_password: string | null;

  // ORGANIZATION

  @IsOptional()
  @ApiProperty({
    description: 'The name in case is a representative of an organization',
  })
  readonly per_commercial_name: string | null;
}

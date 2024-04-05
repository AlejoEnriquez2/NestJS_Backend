import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the type' })
  readonly typ_name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'A description of the type' })
  readonly typ_description: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the class that the class belongs' })
  readonly typ_belongs_to: string;
}

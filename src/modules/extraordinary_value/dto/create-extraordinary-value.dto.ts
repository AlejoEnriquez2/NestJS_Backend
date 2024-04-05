import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExtraordinaryValueDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the extraordinary value',
  })
  readonly exv_name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'A description of the purpose of this extraordinary value',
  })
  readonly exv_description: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The amount of money representing extraordinary value',
  })
  readonly exv_value: number;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'The organization or person that is going to receive this money',
  })
  readonly exv_supplier: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The minute of which the extraordinary value belongs',
  })
  readonly minute_id: number;
}

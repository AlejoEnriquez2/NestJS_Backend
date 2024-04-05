import { IsPositive, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateConfigurationDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The number of day when aliquots must be generated',
  })
  readonly cnf_alic_emission_date: number;

  @IsBoolean()
  @ApiProperty({
    description: 'If aliquot payments can be done in any order',
  })
  readonly cnf_order_pay: boolean;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description:
      'How many days after delivered the aliquot, the recordatory should be sent',
  })
  readonly cnf_alic_recordatory: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Aliquot arrears of regular payments',
  })
  readonly cnf_alic_arrears: number;

  @IsBoolean()
  @ApiProperty({
    description: 'If extraordinary aliquot payments can be done in any order',
  })
  readonly cnf_extraordinary_pay: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateMovementHeaderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date of the movement header generation',
  })
  readonly mvh_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The value-added tax',
  })
  readonly mvh_iva: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The city where the movement is done',
    default: 'Cuenca',
  })
  readonly mvh_city: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The total of the movement',
  })
  readonly mvh_total: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The total value without taxes' })
  readonly mvh_subtotal: number | null;

  @IsOptional()
  @ApiProperty({ description: 'Detail of the movement in general terms' })
  readonly mvh_detail: string | null;

  // OUTCOME

  @IsOptional()
  @ApiProperty({ description: 'The company name for the proof of outcome' })
  readonly mvh_company: string | null;

  // INVOUCE

  @IsOptional()
  @ApiProperty({ description: 'The invouce number' })
  readonly mvh_invouce_number: string | null;

  // ALIQUOT

  @IsOptional()
  @ApiProperty({ description: 'The emission month of the aliquot' })
  readonly mvh_month: string | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The state of the aliquot payment' })
  readonly mvh_state: number | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The aliquot number' })
  readonly mvh_aliquot_number: number | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The building id of movement' })
  readonly building_id: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the movement' })
  readonly type_id: number;
}

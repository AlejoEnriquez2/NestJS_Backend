import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateMovementDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The total amount of money of the detail',
  })
  readonly mvd_total: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Specific detail of the movement done',
  })
  readonly mvd_detail: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'The image of the movement detail',
  })
  readonly mvd_image: string | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The total amount of money with taxes',
  })
  readonly mvd_iva: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The amount of money without taxes',
  })
  readonly mvd_subtotal: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The initial value of some measured service',
  })
  readonly mvd_initial_value: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The final value of some measured service',
  })
  readonly mvd_final_value: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The total amount of some measured service',
  })
  readonly mvd_amount: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The unitary value for some measured service',
  })
  readonly mvd_unitary_value: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The movement header id of the detail' })
  readonly movement_header_id: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The service id of the detail' })
  readonly service_id: number | null;

  @IsOptional()
  @ApiProperty({ description: 'The property id of which the detail belongs' })
  readonly property_id: number | null;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the service',
  })
  readonly srv_name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The cost of the service',
  })
  readonly srv_cost: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is the service private or communal',
  })
  readonly srv_is_private: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: 'The supplier name' })
  readonly srv_supplier: string;

  @IsOptional()
  @ApiProperty({ description: 'A description of the service' })
  readonly srv_description: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The property id that uses the service' })
  readonly property_id: number;
}

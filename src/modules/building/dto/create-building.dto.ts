import { IsPositive, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the building',
  })
  readonly bld_name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Ruc of the building',
  })
  readonly bld_ruc: string;

  @IsNotEmpty({ message: 'The monthly budget is necesary' })
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The necesary budget per month for regular expenses',
  })
  readonly bld_monthly_budget: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The sector of the building',
  })
  readonly bld_sector: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The primary street of the building',
  })
  readonly bld_primary_street: string;

  @IsOptional()
  @ApiProperty({
    description: 'The secondary street of the building',
  })
  readonly bld_secondary_street: string;

  @IsOptional()
  @ApiProperty({
    description: 'Some extra indicator on how to find the building',
  })
  readonly bld_reference: string;

  @IsOptional()
  @ApiProperty({
    description: 'The cadastral key of the building',
  })
  readonly bld_cadastral_key: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The area of the terrain of the building',
  })
  readonly bld_area: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The area of construction of the building',
  })
  readonly bld_construction_area: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The extra area of the building',
  })
  readonly bld_extra_area: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The configuration id of the building' })
  readonly configuration_id: number;
}

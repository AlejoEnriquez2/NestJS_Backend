import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The area of the property' })
  readonly prp_area: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'The number of the property' })
  readonly prp_number: string;

  @IsOptional()
  @ApiProperty({ description: 'The floor in which you can find the property' })
  readonly prp_floor: string;

  @IsOptional()
  @ApiProperty({
    description: 'The cadastral key of the property',
  })
  readonly prp_cadastral_key: string | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The building id of property' })
  readonly building_id: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'The father property id' })
  readonly super_property_id: number | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the property' })
  readonly type_id: number;

  @IsOptional()
  @ApiProperty({ description: 'The tenant of the property' })
  readonly tenant_id: number | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The owner of the property' })
  readonly owner_id: number | null;
}

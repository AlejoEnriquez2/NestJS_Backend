import { IsPositive, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoodDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Defines the good name, property of a building',
  })
  readonly gds_name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Defines the good name, property of a building',
  })
  readonly gds_description: string;

  @IsOptional()
  @ApiProperty({
    description: 'Date of acquisition of a good',
  })
  readonly gds_acquisition_date: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The lifetime of a good, time will be useful',
  })
  readonly gds_lifetime: Date;

  @IsOptional()
  @ApiProperty({
    description: 'Where the good is located',
  })
  readonly gds_location: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The building of which the good belongs' })
  readonly building_id: number;
}

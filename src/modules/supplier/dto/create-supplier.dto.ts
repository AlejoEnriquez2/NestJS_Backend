import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name or title of the supplier' })
  readonly sup_title: string;

  @IsOptional()
  @ApiProperty({
    description: 'A description or extra information about the supplier',
  })
  readonly sup_description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the person',
  })
  readonly person_id: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the supplier' })
  readonly type_id: number;
}

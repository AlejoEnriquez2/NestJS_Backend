import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The date when the tenant lease the property' })
  readonly tnt_lease_date: Date;

  @IsOptional()
  @ApiProperty({ description: 'The date when the lease contract expires' })
  readonly tnt_expiration_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the person',
  })
  readonly person_id: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the tenant' })
  readonly type_id: number;
}

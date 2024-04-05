import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The date that the owner acquired the property' })
  readonly own_acquired_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the person',
  })
  readonly person_id: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the owner' })
  readonly type_id: number;
}

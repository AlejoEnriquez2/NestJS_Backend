import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMinuteDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the topic of the minute' })
  readonly min_title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the minute topic' })
  readonly min_description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The resolution or response about the minute topic',
  })
  readonly min_resolution: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The assembly of which the minute belongs' })
  readonly assembly_id: number;
}

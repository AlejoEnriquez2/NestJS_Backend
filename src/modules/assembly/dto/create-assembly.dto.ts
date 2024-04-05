import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAssemblyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date where the coowners are notified about the assembly',
  })
  readonly asm_notification_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The date scheduled for the assembly',
  })
  readonly asm_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The pdf route of all the resume of the assembly',
  })
  readonly asm_minutes_pdf: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of assembly',
  })
  readonly asm_type: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The building of which the assembly belongs' })
  readonly building_id: number;
}

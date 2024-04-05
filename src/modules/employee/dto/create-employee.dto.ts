import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the employee charge in the building',
  })
  readonly emp_job_title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Is the employee active in the building?' })
  readonly emp_active: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'The date when the employee was subscribed to the work',
  })
  readonly emp_enroled_date: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the person',
  })
  readonly person_id: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The type of the Employee' })
  readonly type_id: number;
}

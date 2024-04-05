import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the bank',
  })
  readonly bnk_name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The account id in the bank',
  })
  readonly bnk_account_id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The account name registered in the bank',
  })
  readonly bnk_account_name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The account number registered in the bank',
  })
  readonly bnk_account_number: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the bank account',
  })
  readonly bnk_account_email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of bank account',
  })
  readonly bnk_account_type: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Is the bank account active?',
  })
  readonly bnk_active: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'A description of the bank account',
  })
  readonly bnk_description: string | null;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'The building id of which the bank account belongs',
  })
  readonly building_id: number;
}

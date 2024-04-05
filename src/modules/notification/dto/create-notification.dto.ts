import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date when the notification is sended',
  })
  readonly ntf_date: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'The message of the notification' })
  readonly ntf_message: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'If the notification is already seen' })
  readonly ntf_view: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the person receiver of the notification',
  })
  readonly person_id: number;
}

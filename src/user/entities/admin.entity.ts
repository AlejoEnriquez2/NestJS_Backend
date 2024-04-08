import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin extends User {
@Column({type: 'enum', enum: ['admin', 'professional']})
  adminRole: string;  
}
import { Exclude } from 'class-transformer';
import { Person } from 'src/modules/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notification', { schema: 'public' })
export class Notification {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'ntf_id' })
  ntf_id: number;

  @Column('date', {
    name: 'ntf_date',
  })
  ntf_date: Date;

  @Column('character varying', {
    name: 'ntf_message',
    length: 200,
  })
  ntf_message: string;

  @Column('boolean', {
    name: 'nft_view',
  })
  ntf_view: boolean;

  @Column('boolean', {
    name: 'is_deleted',
    default: false,
  })
  is_deleted: boolean;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  // RELATIONS

  @ManyToOne(() => Person, (person) => person.notification)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

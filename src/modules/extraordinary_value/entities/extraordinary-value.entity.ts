import { Exclude } from 'class-transformer';
import { Minute } from 'src/modules/minute/entities/minute.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('extraordinary_value', { schema: 'public' })
export class ExtraordinaryValue {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'exv_id' })
  exv_id: number;

  @Column('character varying', {
    name: 'exv_name',
    length: 60,
  })
  exv_name: string;

  @Column('character varying', {
    name: 'exv_description',
    length: 250,
  })
  exv_description: string;

  @Column('numeric', { name: 'exv_value' })
  exv_value: number;

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

  @ManyToOne(() => Minute, (minute) => minute.extraordinary_value)
  @JoinColumn({ name: 'minute_id' })
  minute: Minute;
}

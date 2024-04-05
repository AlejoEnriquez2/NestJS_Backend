import { Exclude } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import { Minute } from 'src/modules/minute/entities/minute.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('assembly', { schema: 'public' })
export class Assembly {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'asm_id' })
  asm_id: number;

  @Column('date', { name: 'asm_notification_date' })
  asm_notification_date: Date;

  @Column('date', { name: 'asm_date' })
  asm_date: Date;

  @Column('character varying', { name: 'asm_minutes_pdf ' })
  asm_minutes_pdf: string;

  @Column('character varying', { name: 'asm_type' })
  asm_type: string;

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

  @ManyToOne(() => Building, (building) => building.bank)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(() => Minute, (minute) => minute.assembly)
  minute: Minute[];
}

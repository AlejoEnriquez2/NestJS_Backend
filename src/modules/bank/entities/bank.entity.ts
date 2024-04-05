import { Exclude } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bank', { schema: 'public' })
export class Bank {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'bnk_id' })
  bnk_id: number;

  @Column('character varying', {
    name: 'bnk_name',
    length: 100,
  })
  bnk_name: string;

  @Column('character varying', {
    name: 'bnk_account_id',
    length: 50,
  })
  bnk_account_id: string;

  @Column('character varying', {
    name: 'bnk_account_name',
    length: 100,
  })
  bnk_account_name: string;

  @Column('character varying', {
    name: 'bnk_account_number',
    length: 100,
  })
  bnk_account_number: string;

  @Column('character varying', {
    name: 'bnk_account_email',
    length: 100,
  })
  bnk_account_email: string;

  @Column('character varying', {
    name: 'bnk_account_type',
    length: 150,
  })
  bnk_account_type: string;

  @Column('boolean', {
    name: 'bnk_active',
    default: true,
  })
  bnk_active: boolean;

  @Column('character varying', {
    name: 'bnk_description',
    length: 250,
    nullable: true,
  })
  bnk_description: string | null;

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

  @ManyToOne(() => Building, (building) => building.bank)
  @JoinColumn({ name: 'building_id' })
  building: Building;
}

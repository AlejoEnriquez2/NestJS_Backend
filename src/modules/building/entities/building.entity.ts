import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Configuration } from 'src/modules/configuration/entities/configuration.entity';
import { Good } from 'src/modules/good/entities/good.entity';
import { Exclude } from 'class-transformer';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { Assembly } from 'src/modules/assembly/entities/assembly.entity';
import { MovementHeader } from 'src/modules/movement_header/entities/movement-header.entity';
import { Property } from 'src/modules/property/entities/property.entity';

@Entity('building', { schema: 'public' })
export class Building {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'bld_id' })
  bld_id: number;

  @Column('character varying', {
    name: 'bld_name',
    length: 100,
  })
  bld_name: string;

  @Column('character varying', {
    name: 'bld_ruc',
    length: 100,
    unique: true,
  })
  bld_ruc: string;

  @Column('numeric', {
    name: 'bld_monthly_budget',
  })
  bld_monthly_budget: number;

  @Column('character varying', {
    name: 'bld_sector',
    length: 100,
  })
  bld_sector: string;

  @Column('character varying', {
    name: 'bld_primary_street',
    length: 100,
  })
  bld_primary_street: string;

  @Column('character varying', {
    name: 'bld_secondary_street',
    length: 100,
    nullable: true,
  })
  bld_secondary_street: string | null;

  @Column('character varying', {
    name: 'bld_reference',
    length: 100,
    nullable: true,
  })
  bld_reference: string | null;

  @Column('character varying', {
    name: 'bld_cadastral_key',
    length: 100,
    unique: true,
    nullable: true,
  })
  bld_cadastral_key: string | null;

  @Column('numeric', {
    name: 'bld_area',
    default: 0,
    precision: 15,
    scale: 4,
    nullable: true,
  })
  bld_area: number | null;

  @Column('numeric', {
    name: 'bld_construction_area',
    default: 0,
    precision: 15,
    scale: 4,
    nullable: true,
  })
  bld_construction_area: number | null;

  @Column('numeric', {
    name: 'bld_extra_area',
    default: 0,
    precision: 15,
    scale: 4,
    nullable: true,
  })
  bld_extra_area: number | null;

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

  @OneToOne(() => Configuration, (configuration) => configuration.building, {
    nullable: false,
  })
  @JoinColumn({ name: 'configuration_id' })
  configuration: Configuration;

  @OneToMany(() => Good, (good) => good.building)
  good: Good[];

  @OneToMany(() => Bank, (bank) => bank.building)
  bank: Bank[];

  @OneToMany(() => Assembly, (assembly) => assembly.building)
  assembly: Assembly[];

  @OneToMany(
    () => MovementHeader,
    (movement_header) => movement_header.building,
  )
  movement_header: MovementHeader[];

  @OneToMany(() => Property, (property) => property.building)
  property: Property[];
}

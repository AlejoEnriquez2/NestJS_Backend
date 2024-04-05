import { Exclude } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import { MovementDetail } from 'src/modules/movement_detail/entities/movement-detail.entity';
import { Type } from 'src/modules/type/entities/type.entity';
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

@Entity('movement_header', { schema: 'public' })
export class MovementHeader {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'mvh_id' })
  mvh_id: number;

  @Column('date', { name: 'mvh_date' })
  mvh_date: Date;

  @Column('numeric', {
    name: 'mvh_iva',
    default: 1.12,
  })
  mvh_iva: number;

  @Column('character varying', { name: 'mvh_city' })
  mvh_city: string;

  @Column('numeric', { name: 'mvh_total' })
  mvh_total: number;

  @Column('numeric', {
    name: 'mvh_subtotal',
    default: 0.0,
    nullable: true,
  })
  mvh_subtotal: number | null;

  @Column('character varying', {
    name: 'mvh_detail',
    nullable: true,
  })
  mvh_detail: string | null;

  @Column('character varying', {
    name: 'mvh_company',
    nullable: true,
  })
  mvh_company: string | null;

  @Column('character varying', {
    name: 'mvh_invouce_number',
    nullable: true,
    unique: true,
  })
  mvh_invouce_number: string | null;

  @Column('character varying', {
    name: 'mvh_month',
    nullable: true,
  })
  mvh_month: string | null;

  @Column('numeric', {
    name: 'mvh_state',
    nullable: true,
  })
  mvh_state: number | null;

  @Column('numeric', {
    name: 'mvh_aliquot_number',
    nullable: true,
    unique: true,
  })
  mvh_aliquot_number: number | null;

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

  @ManyToOne(() => Building, (building) => building.movement_header)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @OneToMany(
    () => MovementDetail,
    (movement_detail) => movement_detail.movement_header,
  )
  movement_detail: MovementDetail[];

  @ManyToOne(() => Type, (type) => type.movement_header)
  @JoinColumn({ name: 'type_id' })
  type: Type;
}

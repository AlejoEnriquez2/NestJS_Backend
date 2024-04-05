import { Exclude } from 'class-transformer';
import { MovementHeader } from 'src/modules/movement_header/entities/movement-header.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movement_detail', { schema: 'public' })
export class MovementDetail {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'mvd_id' })
  mvd_id: number;

  @Column('numeric', { name: 'mvd_total' })
  mvd_total: number;

  @Column('character varying', { name: 'mvd_detail' })
  mvd_detail: string;

  @Column('character varying', {
    name: 'mvd_image',
    nullable: true,
  })
  mvd_image: string | null;

  @Column('numeric', {
    name: 'mvd_iva',
    nullable: true,
  })
  mvd_iva: number | null;

  @Column('numeric', {
    name: 'mvd_subtotal',
    nullable: true,
  })
  mvd_subtotal: number | null;

  @Column('numeric', {
    name: 'mvd_initial_value',
    nullable: true,
  })
  mvd_initial_value: number | null;

  @Column('numeric', {
    name: 'mvd_final_value',
    nullable: true,
  })
  mvd_final_value: number | null;

  @Column('numeric', {
    name: 'mvd_amount',
    nullable: true,
  })
  mvd_amount: number | null;

  @Column('numeric', {
    name: 'mvd_unitary_value',
    nullable: true,
  })
  mvd_unitary_value: number | null;

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

  @ManyToOne(
    () => MovementHeader,
    (movement_header) => movement_header.movement_detail,
  )
  @JoinColumn({ name: 'movement_header_id' })
  movement_header: MovementHeader;

  @ManyToOne(() => Service, (service) => service.movement_detail)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Property, (property) => property.movement_detail)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}

import { Exclude } from 'class-transformer';
import { Building } from 'src/modules/building/entities/building.entity';
import { MovementDetail } from 'src/modules/movement_detail/entities/movement-detail.entity';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
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

@Entity('property', { schema: 'public' })
export class Property {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'prp_id' })
  prp_id: number;

  @Column('numeric', {
    name: 'prp_area',
  })
  prp_area: number;

  @Column('character varying', {
    name: 'prp_number',
    length: 10,
  })
  prp_number: string;

  @Column('character varying', {
    name: 'prp_floor',
    length: 10,
    nullable: true,
  })
  prp_floor: string | null;

  @Column('character varying', {
    name: 'prp_cadastral_key',
    nullable: true,
    unique: true,
  })
  prp_cadastral_key: string | null;

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

  @OneToMany(() => Property, (property) => property.property)
  property: Property[];

  @ManyToOne(() => Property, (property) => property.super_property)
  @JoinColumn({ name: 'super_property_id' })
  super_property: Property;

  @OneToMany(() => Service, (service) => service.property)
  service: Service[];

  @OneToMany(
    () => MovementDetail,
    (movement_detail) => movement_detail.property,
  )
  movement_detail: MovementDetail[];

  @ManyToOne(() => Building, (building) => building.property)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @ManyToOne(() => Type, (type) => type.property)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Tenant, (tenant) => tenant.property)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => Owner, (owner) => owner.property)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;
}

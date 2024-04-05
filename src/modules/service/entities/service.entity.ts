import { Exclude } from 'class-transformer';
import { MovementDetail } from 'src/modules/movement_detail/entities/movement-detail.entity';
import { Property } from 'src/modules/property/entities/property.entity';
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

@Entity('service', { schema: 'public' })
export class Service {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'srv_id' })
  srv_id: number;

  @Column('character varying', { name: 'srv_name', length: 100 })
  srv_name: string;

  @Column('numeric', { name: 'srv_cost' })
  srv_cost: number;

  @Column('boolean', { name: 'srv_is_private', default: true })
  srv_is_private: boolean;

  @Column('character varying', {
    name: 'srv_description',
    length: 200,
    nullable: true,
  })
  srv_description: string | null;

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

  @OneToMany(() => MovementDetail, (movement_detail) => movement_detail.service)
  movement_detail: MovementDetail[];

  @ManyToOne(() => Property, (property) => property.service)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}

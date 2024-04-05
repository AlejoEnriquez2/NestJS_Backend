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

@Entity('good', { schema: 'public' })
export class Good {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'gds_id' })
  gds_id: number;

  @Column('character varying', {
    name: 'gds_name',
    length: 60,
  })
  gds_name: string;

  @Column('character varying', {
    name: 'gds_description',
    length: 250,
    nullable: true,
  })
  gds_description: string | null;

  @Column('date', {
    name: 'gds_acquisition_date',
    nullable: true,
  })
  gds_acquisition_date: Date | null;

  @Column('date', {
    name: 'gds_lifetime',
    nullable: true,
  })
  gds_lifetime: Date | null;

  @Column('character varying', {
    name: 'gds_location',
    length: 100,
    nullable: true,
  })
  gds_location: string | null;

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

  @ManyToOne(() => Building, (building) => building.good)
  @JoinColumn({ name: 'building_id' })
  building: Building;
}

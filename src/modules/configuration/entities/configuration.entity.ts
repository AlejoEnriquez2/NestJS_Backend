import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Building } from 'src/modules/building/entities/building.entity';
import { Exclude } from 'class-transformer';

@Entity('configuration', { schema: 'public' })
export class Configuration {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'cnf_id' })
  cnf_id: number;

  @Column('numeric', {
    name: 'cnf_alic_emission_date',
    // ToDo: poner un rango de números
  })
  cnf_alic_emission_date: number;

  @Column('boolean', { name: 'cnf_order_pay' })
  cnf_order_pay: boolean;

  @Column('numeric', {
    name: 'cnf_alic_recordatory',
  })
  cnf_alic_recordatory: number;

  @Column('numeric', {
    name: 'cnf_alic_arrears',
    default: 0.0,
  })
  cnf_alic_arrears: number;

  @Column('boolean', {
    name: 'cnf_extraordinary_pay',
  })
  cnf_extraordinary_pay: boolean;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  // RELATIONS

  @OneToOne(() => Building, (building) => building.configuration)
  building: Building;
}

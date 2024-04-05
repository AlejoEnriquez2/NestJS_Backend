import { Exclude } from 'class-transformer';
import { Person } from 'src/modules/person/entities/person.entity';
import { Property } from 'src/modules/property/entities/property.entity';
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

@Entity('tenant', { schema: 'public' })
export class Tenant {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'tnt_id' })
  tnt_id: number;

  @Column('date', {
    name: 'tnt_lease_date',
    nullable: true,
  })
  tnt_lease_date: Date | null;

  @Column('date', {
    name: 'tnt_expiration_date',
    nullable: true,
  })
  tnt_expiration_date: Date | null;

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

  @OneToMany(() => Property, (property) => property.tenant)
  property: Property[];

  @ManyToOne(() => Type, (type) => type.tenant)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Person, (person) => person.tenant)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

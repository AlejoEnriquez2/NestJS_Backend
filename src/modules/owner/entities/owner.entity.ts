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

@Entity('owner', { schema: 'public' })
export class Owner {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'own_id' })
  own_id: number;

  @Column('date', {
    name: 'own_acquired_date',
    nullable: true,
  })
  own_acquired_date: Date | null;

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

  @ManyToOne(() => Type, (type) => type.owner)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToMany(() => Property, (property) => property.owner)
  property: Property[];

  @ManyToOne(() => Person, (person) => person.owner)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

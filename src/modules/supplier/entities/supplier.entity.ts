import { Exclude } from 'class-transformer';
import { Person } from 'src/modules/person/entities/person.entity';
import { Type } from 'src/modules/type/entities/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('supplier', { schema: 'public' })
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'sup_id' })
  sup_id: number;

  @Column('character varying', {
    name: 'sup_title',
    length: 100,
  })
  sup_title: string;

  @Column('character varying', {
    name: 'sup_description',
    length: 250,
    nullable: true,
  })
  sup_description: string | null;

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

  @ManyToOne(() => Type, (type) => type.supplier)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Person, (person) => person.supplier)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

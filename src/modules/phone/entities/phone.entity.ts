import { Exclude } from 'class-transformer';
import { Person } from 'src/modules/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('phone', { schema: 'public' })
export class Phone {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'phn_id' })
  phn_id: number;

  @Column('character varying', {
    name: 'phn_number',
    length: 25,
  })
  phn_number: string;

  @Column('character varying', {
    name: 'phn_operator',
    length: 50,
    nullable: true,
  })
  phn_operator: string | null;

  @Column('character varying', {
    name: 'phn_extension',
    length: 15,
    nullable: true,
  })
  phn_extension: string | null;

  @Column('character varying', {
    name: 'phn_description',
    length: 200,
    nullable: true,
  })
  phn_description: string | null;

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
  @ManyToOne(() => Person, (person) => person.phone)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

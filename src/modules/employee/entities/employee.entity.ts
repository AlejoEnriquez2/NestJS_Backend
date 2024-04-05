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

@Entity('employee', { schema: 'public' })
export class Employee {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'emp_id' })
  emp_id: number;

  @Column('character varying', {
    name: 'emp_job_title',
    length: 100,
  })
  emp_job_title: string;

  @Column('boolean', {
    name: 'emp_active',
    default: true,
  })
  emp_active: boolean;

  @Column('date', {
    name: 'emp_enroled_date',
    nullable: true,
  })
  emp_enroled_date: Date | null;

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

  @ManyToOne(() => Type, (type) => type.employee)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Person, (person) => person.employee)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}

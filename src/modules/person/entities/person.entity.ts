import { Exclude } from 'class-transformer';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Phone } from 'src/modules/phone/entities/phone.entity';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('person', { schema: 'public' })
export class Person {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'per_id' })
  per_id: number;

  @Column('character varying', {
    name: 'per_first_name',
    length: 50,
  })
  per_first_name: string;

  @Column('character varying', {
    name: 'per_last_name',
    length: 50,
  })
  per_last_name: string;

  @Column('character varying', {
    name: 'per_email',
    nullable: true,
    length: 50,
  })
  per_email: string | null;

  @Column('character varying', {
    name: 'per_id_number',
    length: 100,
    unique: true,
    nullable: true,
  })
  per_id_number: string | null;

  @Column('character varying', {
    name: 'per_prefix',
    length: 10,
    default: 'Sr./Sra.',
    nullable: true,
  })
  per_prefix: string | null;

  @Column('character varying', {
    name: 'per_password',
    nullable: true,
    length: 50,
  })
  per_password: string | null;

  @Column('character varying', {
    name: 'per_commercial_name',
    length: 100,
    nullable: true,
  })
  per_commercial_name: string | null;

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

  @OneToMany(() => Tenant, (tenant) => tenant.person)
  tenant: Tenant[];

  @OneToMany(() => Owner, (owner) => owner.person)
  owner: Owner[];

  @OneToMany(() => Supplier, (supplier) => supplier.person)
  supplier: Supplier[];

  @OneToMany(() => Employee, (employee) => employee.person)
  employee: Employee[];

  @OneToMany(() => Phone, (phone) => phone.person)
  phone: Phone[];

  @OneToMany(() => Notification, (notification) => notification.person)
  notification: Notification[];
}

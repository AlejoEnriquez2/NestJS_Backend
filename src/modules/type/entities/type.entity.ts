import { Employee } from 'src/modules/employee/entities/employee.entity';
import { MovementHeader } from 'src/modules/movement_header/entities/movement-header.entity';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Property } from 'src/modules/property/entities/property.entity';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type', { schema: 'public' })
export class Type {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'typ_id' })
  typ_id: number;

  @Column('character varying', {
    name: 'typ_name',
    length: 50,
  })
  typ_name: string;

  @Column('character varying', {
    name: 'typ_description',
    length: 250,
  })
  typ_description: string;

  @Column('character varying', {
    name: 'typ_belongs_to',
  })
  typ_belongs_to: string;

  // RELATIONS

  @OneToMany(() => Property, (property) => property.type)
  property: Property[];

  @OneToMany(() => Tenant, (tenant) => tenant.type)
  tenant: Tenant[];

  @OneToMany(() => Owner, (owner) => owner.type)
  owner: Owner[];

  @OneToMany(() => Supplier, (supplier) => supplier.type)
  supplier: Supplier[];

  @OneToMany(() => Employee, (employee) => employee.type)
  employee: Employee[];

  @OneToMany(() => MovementHeader, (movement_header) => movement_header.type)
  movement_header: MovementHeader[];
}

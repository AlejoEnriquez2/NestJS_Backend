import { Exclude } from 'class-transformer';
import { Assembly } from 'src/modules/assembly/entities/assembly.entity';
import { ExtraordinaryValue } from 'src/modules/extraordinary_value/entities/extraordinary-value.entity';
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

@Entity('minute', { schema: 'public' })
export class Minute {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'min_id' })
  min_id: number;

  @Column('character varying', { name: 'min_title' })
  min_title: string;

  @Column('character varying', { name: 'min_description' })
  min_description: string;

  @Column('character varying', { name: 'min_resolution' })
  min_resolution: string;

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

  @ManyToOne(() => Assembly, (assembly) => assembly.minute)
  @JoinColumn({ name: 'assembly_id' })
  assembly: Assembly;

  @OneToMany(
    () => ExtraordinaryValue,
    (extraordinary_value) => extraordinary_value.minute,
  )
  extraordinary_value: ExtraordinaryValue[];
}

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  
  // import { Customer } from './customer.entity';
  
  export abstract class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true})
    email?: string;
  
    @Column({ type: 'varchar', length: 255 })
    password?: string; // should encript

    @Column({ type: 'date', default: null})
    isDeleted: Date;
  
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    
  
    // @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
    // @JoinColumn({ name: 'customer_id' })
    // customer: Customer;
  }
  
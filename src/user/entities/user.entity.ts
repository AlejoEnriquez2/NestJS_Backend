import * as bcrypt from 'bcrypt';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    BeforeInsert,
  } from 'typeorm';
  
  export abstract class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true})
    email?: string;
  
    @Column({ type: 'varchar', length: 255 })
    password?: string; // should encript

    @BeforeInsert()
    async hashPassword(){
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

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
  
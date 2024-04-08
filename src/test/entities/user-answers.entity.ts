import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class UserAnswers {
    
    @PrimaryGeneratedColumn()
    answersId: number;

    @Column({type: 'varchar', length: 15})
    orientationMonth: string;

    @Column({type: 'varchar', length: 15})
    orientationDate: string;

    @Column({type: 'varchar', length: 15})
    orientationYear: string;

    @Column({type: 'varchar', length: 50})
    namingPicture1: string;

    @Column({type: 'varchar', length: 50})
    namingPicture2: string;

    @Column({type: 'varchar', length: 255})
    similarities: string;

    @Column({type: 'float'})
    calculation1: number;

    @Column({type: 'float'})
    calculation2: number;

    @Column({type: 'bytea'})
    constructionsRedraw: Buffer;

    @Column({type: 'bytea'})
    constructionsDraw: Buffer;

    @Column({type: 'varchar', length: 500})
    verbalWords: string[];
    
    @Column({type: 'varchar', length: 50})
    executiveTrail: string;

    @Column({type: 'varchar', length: 50})
    executiveLines: string;

    @Column({type: 'bytea'})
    executiveDraw: Buffer;

    @Column({type: 'varchar', length: 50})
    memoryPhrase: string;

    // TABLE FUNCTIONS //

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


    @Column({ type: 'date', default: null})
    isDeleted: Date

    // RELATIONS //
    @OneToOne(() => Test, (test) => test.answers, {nullable: true})
    test: Test;
}
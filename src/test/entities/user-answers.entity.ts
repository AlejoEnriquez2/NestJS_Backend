import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class UserAnswers {
    
    @PrimaryGeneratedColumn()
    answersId: number;

    @Column({type: 'varchar', length: 15})
    orientationMonth: string;

    @Column({type: 'varchar', length: 15})
    orientationDay: string;

    @Column({type: 'varchar', length: 15})
    orientationYear: string;

    @Column({type: 'varchar', length: 100})
    namingPicture1: string;

    @Column({type: 'varchar', length: 100})
    namingPicture2: string;

    @Column({type: 'varchar', length: 255})
    similarities: string;

    @Column({type: 'varchar', length: 100})
    calculation1: string;

    @Column({type: 'varchar'})
    calculation2: string;

    @Column({type: 'varchar'})
    constructionsRedraw: string[];

    @Column({type: 'varchar'})
    constructionsDraw: string[];

    @Column({type: 'varchar', length: 500})
    verbalWords: string[];
    
    @Column({type: 'varchar', length: 50})
    executiveTrail: string;

    @Column({type: 'varchar', length: 50})
    executiveLines: string;

    @Column({type: 'varchar'})
    executiveLinesDraw: string[];

    @Column({type: 'varchar'})
    executiveDraw: string[];

    @Column({type: 'varchar', length: 50})
    memoryPhrase: string | null = null;

    @Column({type: 'integer', nullable: true})
    grade: number | null = null;
    
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
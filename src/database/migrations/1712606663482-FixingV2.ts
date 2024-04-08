import {MigrationInterface, QueryRunner} from "typeorm";

export class FixingV21712606663482 implements MigrationInterface {
    name = 'FixingV21712606663482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" ADD "dummy" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP COLUMN "dummy"`);
    }

}

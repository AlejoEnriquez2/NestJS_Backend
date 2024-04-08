import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPatientFunctionalities1712584343086 implements MigrationInterface {
    name = 'AddingPatientFunctionalities1712584343086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb"`);
    }

}

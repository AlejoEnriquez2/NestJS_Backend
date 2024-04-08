import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPatientFunctionalitiesV21712584601712 implements MigrationInterface {
    name = 'AddingPatientFunctionalitiesV21712584601712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "grade" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "grade" DROP DEFAULT`);
    }

}

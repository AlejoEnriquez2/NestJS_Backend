import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstUserWorkingUpdate1712583571122 implements MigrationInterface {
    name = 'FirstUserWorkingUpdate1712583571122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."patient_role_enum"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('admin', 'patient')`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" "public"."admin_role_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."patient_role_enum" AS ENUM('admin', 'patient')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" "public"."patient_role_enum" NOT NULL`);
    }

}

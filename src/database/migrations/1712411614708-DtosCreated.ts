import {MigrationInterface, QueryRunner} from "typeorm";

export class DtosCreated1712411614708 implements MigrationInterface {
    name = 'DtosCreated1712411614708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."admin_adminrole_enum" AS ENUM('admin', 'professional')`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "adminRole" "public"."admin_adminrole_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('admin', 'patient')`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" "public"."admin_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."patient_role_enum" AS ENUM('admin', 'patient')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" "public"."patient_role_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."patient_role_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "adminRole"`);
        await queryRunner.query(`DROP TYPE "public"."admin_adminrole_enum"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "name"`);
    }

}

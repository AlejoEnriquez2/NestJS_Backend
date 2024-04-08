import {MigrationInterface, QueryRunner} from "typeorm";

export class Fixing1712606395810 implements MigrationInterface {
    name = 'Fixing1712606395810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_answers" ADD "formId" integer`);
        await queryRunner.query(`ALTER TABLE "form_answers" ADD CONSTRAINT "UQ_fb604459f6142beb73eeb910269" UNIQUE ("formId")`);
        await queryRunner.query(`ALTER TABLE "form_answers" ADD CONSTRAINT "FK_fb604459f6142beb73eeb910269" FOREIGN KEY ("formId") REFERENCES "form"("formId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_answers" DROP CONSTRAINT "FK_fb604459f6142beb73eeb910269"`);
        await queryRunner.query(`ALTER TABLE "form_answers" DROP CONSTRAINT "UQ_fb604459f6142beb73eeb910269"`);
        await queryRunner.query(`ALTER TABLE "form_answers" DROP COLUMN "formId"`);
    }

}

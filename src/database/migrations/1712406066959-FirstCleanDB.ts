import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstCleanDB1712406066959 implements MigrationInterface {
    name = 'FirstCleanDB1712406066959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "isDeleted" date, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "isDeleted" date, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" character varying(255) NOT NULL, "grade" integer NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}

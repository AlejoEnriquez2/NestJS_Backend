import {MigrationInterface, QueryRunner} from "typeorm";

export class TestEntitiesRelationships1712606209612 implements MigrationInterface {
    name = 'TestEntitiesRelationships1712606209612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form" ("formId" SERIAL NOT NULL, "namingImages" bytea NOT NULL, "abstractQuestion" character varying(500) NOT NULL, "mathQuestions" character varying(1000) NOT NULL, "finalPhrases" character varying(500) NOT NULL, "redrawPicture" bytea NOT NULL, "drawInstructions" bytea NOT NULL, "drawAnswer" bytea NOT NULL, "writingTopic" character varying(500) NOT NULL, "exampleExecutive" character varying(500) NOT NULL, "instructionsExecutive" character varying(500) NOT NULL, "executiveImage" bytea NOT NULL, "formAnswersId" integer, CONSTRAINT "REL_eae9bb3e5638bc1f49622b3fa8" UNIQUE ("formAnswersId"), CONSTRAINT "PK_33c609c116b70de2102ccf364f4" PRIMARY KEY ("formId"))`);
        await queryRunner.query(`CREATE TABLE "form_answers" ("formAnswersId" SERIAL NOT NULL, "orientationMonth" character varying(15) NOT NULL, "orientationDay" character varying(15) NOT NULL, "orientationYear" character varying(15) NOT NULL, "namingPicture1" character varying(50) NOT NULL, "namingPicture2" character varying(50) NOT NULL, "similarities" character varying(50) NOT NULL, "calculation1" double precision NOT NULL, "calculation2" double precision NOT NULL, "constructionsRedraw" bytea NOT NULL, "constructionsDraw" bytea NOT NULL, "verbalWords" character varying(200) NOT NULL, "executiveTrail" character varying(50) NOT NULL, "executiveLines" character varying(50) NOT NULL, "executiveDraw" bytea NOT NULL, "memoryPhrase" character varying(50) NOT NULL, CONSTRAINT "PK_42741991c4f9b53f2fdeec72749" PRIMARY KEY ("formAnswersId"))`);
        await queryRunner.query(`CREATE TABLE "test" ("testId" SERIAL NOT NULL, "testDate" date NOT NULL, "testTotalTime" integer NOT NULL, "testTotalGrade" integer NOT NULL, "patientName" character varying(255) NOT NULL, "patientBirthday" date NOT NULL, "patientEducation" character varying(255) NOT NULL, "patientGender" character varying(50) NOT NULL, "patientRace" character varying(50) NOT NULL, "patientMemory" character varying(50) NOT NULL, "patientRelatives" boolean NOT NULL, "patientBalance" character varying(50) NOT NULL, "patientMajorStroke" boolean NOT NULL, "patientMinorStroke" boolean NOT NULL, "patientDepression" character varying(50) NOT NULL, "patientPersonality" character varying(50) NOT NULL, "patientDifficulties" character varying(50) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" date, "answersId" integer, "formId" integer, "patientId" integer, CONSTRAINT "REL_02e45dc63d096f71b8b6b51eec" UNIQUE ("answersId"), CONSTRAINT "REL_ec4d5fc8491837e03d9bdfe63e" UNIQUE ("formId"), CONSTRAINT "REL_df6994dcaf5167b104df32d2bc" UNIQUE ("patientId"), CONSTRAINT "PK_e2e0ec0a7eef4314a739d10d81b" PRIMARY KEY ("testId"))`);
        await queryRunner.query(`CREATE TABLE "user_answers" ("answersId" SERIAL NOT NULL, "orientationMonth" character varying(15) NOT NULL, "orientationDate" character varying(15) NOT NULL, "orientationYear" character varying(15) NOT NULL, "namingPicture1" character varying(50) NOT NULL, "namingPicture2" character varying(50) NOT NULL, "similarities" character varying(255) NOT NULL, "calculation1" double precision NOT NULL, "calculation2" double precision NOT NULL, "constructionsRedraw" bytea NOT NULL, "constructionsDraw" bytea NOT NULL, "verbalWords" character varying(500) NOT NULL, "executiveTrail" character varying(50) NOT NULL, "executiveLines" character varying(50) NOT NULL, "executiveDraw" bytea NOT NULL, "memoryPhrase" character varying(50) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" date, CONSTRAINT "PK_bd801de7c01a2aac14424b6f058" PRIMARY KEY ("answersId"))`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_eae9bb3e5638bc1f49622b3fa8d" FOREIGN KEY ("formAnswersId") REFERENCES "form_answers"("formAnswersId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_02e45dc63d096f71b8b6b51eec6" FOREIGN KEY ("answersId") REFERENCES "user_answers"("answersId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_ec4d5fc8491837e03d9bdfe63e2" FOREIGN KEY ("formId") REFERENCES "form"("formId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_df6994dcaf5167b104df32d2bcd" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_df6994dcaf5167b104df32d2bcd"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_ec4d5fc8491837e03d9bdfe63e2"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_02e45dc63d096f71b8b6b51eec6"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_eae9bb3e5638bc1f49622b3fa8d"`);
        await queryRunner.query(`DROP TABLE "user_answers"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "form_answers"`);
        await queryRunner.query(`DROP TABLE "form"`);
    }

}

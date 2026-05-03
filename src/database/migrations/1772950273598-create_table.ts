import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1772950273598 implements MigrationInterface {
    name = 'CreateTable1772950273598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying, "email" character varying, "address" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_branch_tenant_id" ON "branch" ("tenant_id") `);
        await queryRunner.query(`CREATE TYPE "public"."tenant_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "tenant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subdomain" character varying NOT NULL, "owner_id" uuid NOT NULL, "status" "public"."tenant_status_enum" NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_56211336b5ff35fd944f2259173" UNIQUE ("name"), CONSTRAINT "UQ_a1da63250e49e1cfb2cf9bacfaf" UNIQUE ("subdomain"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_tenant_subdomain" ON "tenant" ("subdomain") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_owner_id" ON "tenant" ("owner_id") `);
        await queryRunner.query(`CREATE TABLE "tenant_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "user_id" uuid NOT NULL, "email" character varying NOT NULL, "is_primary" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "uq_tenant_member_tenant_email" UNIQUE ("tenant_id", "email"), CONSTRAINT "PK_bec2f582d249f642cb12ab9e032" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_member_tenant_id" ON "tenant_member" ("tenant_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_member_user_id" ON "tenant_member" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "idx_tenant_member_email" ON "tenant_member" ("email") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(150) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(25), "password_hash" character varying NOT NULL, "role" smallint NOT NULL DEFAULT '3', "is_active" boolean NOT NULL DEFAULT true, "last_login_at" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "authentication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_684fcb9924c8502d64b129cc8b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_1f1e36ce4e79451c44ce98c0ea4" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "FK_787ef3853e7d3c6966d22914c0c" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_member" ADD CONSTRAINT "FK_ed59de0763e8a42c003d21a46e8" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_member" ADD CONSTRAINT "FK_b43463d759916d442bc54c831b4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_member" DROP CONSTRAINT "FK_b43463d759916d442bc54c831b4"`);
        await queryRunner.query(`ALTER TABLE "tenant_member" DROP CONSTRAINT "FK_ed59de0763e8a42c003d21a46e8"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "FK_787ef3853e7d3c6966d22914c0c"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_1f1e36ce4e79451c44ce98c0ea4"`);
        await queryRunner.query(`DROP TABLE "authentication"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_member_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_member_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_member_tenant_id"`);
        await queryRunner.query(`DROP TABLE "tenant_member"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_owner_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_subdomain"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
        await queryRunner.query(`DROP TYPE "public"."tenant_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_branch_tenant_id"`);
        await queryRunner.query(`DROP TABLE "branch"`);
    }

}

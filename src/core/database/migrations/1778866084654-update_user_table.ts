import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1778866084654 implements MigrationInterface {
    name = 'UpdateUserTable1778866084654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "active_tenant_id"`);
        await queryRunner.query(`ALTER TABLE "tenant_member" ADD "role" smallint NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active_tenant_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active_tenant_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active_tenant_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "active_tenant_id" smallint NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "tenant_member" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "active_tenant_id" TO "role"`);
    }

}

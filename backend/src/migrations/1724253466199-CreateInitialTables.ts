import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1724253466199 implements MigrationInterface {
    name = 'CreateInitialTables1724253466199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "shortDescription" character varying(255) NOT NULL,
                "fullDescription" text NOT NULL,
                "likes" integer NOT NULL DEFAULT '0',
                "image" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "categoryId" integer,
                CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"),
                CONSTRAINT "likes_max" CHECK (likes <= 2000000)
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "articles" 
            ADD CONSTRAINT "FK_c4e3348c86dfc3bacdd9bc36cad" FOREIGN KEY ("categoryId") 
            REFERENCES "categories"("id") 
            ON DELETE NO ACTION 
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_c4e3348c86dfc3bacdd9bc36cad"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1714000057617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "movies" 
            ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, 
            "director" character varying(255) NOT NULL, 
            "release_date" date NOT NULL, 
            "genre" character varying(255) NOT NULL, 
            "synopsis" text NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS movies;
            `
        )
    }

}

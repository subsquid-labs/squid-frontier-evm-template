module.exports = class Data1698074902501 {
    name = 'Data1698074902501'

    async up(db) {
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "timestamp" numeric NOT NULL, "block" integer NOT NULL, "extrinsic_hash" text NOT NULL, "token_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b27b1150b8a7af68424540613c" ON "transfer" ("token_id") `)
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "owner" text NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_b27b1150b8a7af68424540613c7" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_b27b1150b8a7af68424540613c"`)
        await db.query(`DROP TABLE "token"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_b27b1150b8a7af68424540613c7"`)
    }
}

/*
  Warnings:

  - You are about to drop the column `cookie_hash` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_cookie_hash_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "cookie_hash";

/*
  Warnings:

  - You are about to drop the column `cookieHash` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cookie_hash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_cookieHash_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "cookieHash",
ADD COLUMN     "cookie_hash" TEXT;

-- CreateTable
CREATE TABLE "OauthApplication" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,
    "client_secret_hash" TEXT NOT NULL,
    "owner_slack_id" TEXT NOT NULL,
    "redirect_uri" TEXT NOT NULL,

    CONSTRAINT "OauthApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OauthApplication_client_secret_hash_key" ON "OauthApplication"("client_secret_hash");

-- CreateIndex
CREATE UNIQUE INDEX "Session_cookie_hash_key" ON "Session"("cookie_hash");

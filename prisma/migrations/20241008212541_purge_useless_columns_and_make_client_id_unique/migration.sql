/*
  Warnings:

  - You are about to drop the column `slack_access_token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `slack_user_id` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[client_id]` on the table `OauthApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "slack_access_token",
DROP COLUMN "slack_user_id";

-- CreateIndex
CREATE UNIQUE INDEX "OauthApplication_client_id_key" ON "OauthApplication"("client_id");

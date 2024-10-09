/*
  Warnings:

  - A unique constraint covering the columns `[cookie]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_cookie_key" ON "Session"("cookie");

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "preferred_first_name" TEXT,
    "preffered_last_name" TEXT,
    "email" TEXT NOT NULL,
    "date_born" INTEGER NOT NULL,
    "month_born" INTEGER NOT NULL,
    "year_born" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "cookie" TEXT NOT NULL,
    "cookieHash" TEXT,
    "user_agent" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "authenticated" BOOLEAN NOT NULL DEFAULT false,
    "slack_access_token" TEXT NOT NULL,
    "slack_user_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_cookieHash_key" ON "Session"("cookieHash");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

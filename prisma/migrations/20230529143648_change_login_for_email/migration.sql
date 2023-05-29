/*
  Warnings:

  - You are about to drop the column `login` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orgs_login_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "login",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

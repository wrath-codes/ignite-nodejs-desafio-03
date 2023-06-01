/*
  Warnings:

  - You are about to drop the column `breed` on the `pets` table. All the data in the column will be lost.
  - The `age` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('BABY', 'YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetIndependence" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('INDOOR', 'OUTDOOR', 'BOTH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "breed",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "energy" "PetEnergy" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "environment" "PetEnvironment" NOT NULL DEFAULT 'OUTDOOR',
ADD COLUMN     "independence" "PetIndependence" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "size" "PetSize" NOT NULL DEFAULT 'SMALL',
DROP COLUMN "age",
ADD COLUMN     "age" "PetAge" NOT NULL DEFAULT 'BABY';

-- CreateTable
CREATE TABLE "pet_requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT,

    CONSTRAINT "pet_requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_requirements" ADD CONSTRAINT "pet_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

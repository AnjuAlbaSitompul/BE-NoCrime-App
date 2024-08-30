/*
  Warnings:

  - Added the required column `latitude` to the `subdistricts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `subdistricts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `subdistricts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subdistricts` ADD COLUMN `latitude` FLOAT NOT NULL,
    ADD COLUMN `longitude` FLOAT NOT NULL,
    ADD COLUMN `radius` INTEGER NOT NULL;

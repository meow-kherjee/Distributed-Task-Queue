/*
  Warnings:

  - Added the required column `maxRetry` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retryCount` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "maxRetry" INTEGER NOT NULL,
ADD COLUMN     "payload" JSON NOT NULL,
ADD COLUMN     "retryCount" INTEGER NOT NULL;

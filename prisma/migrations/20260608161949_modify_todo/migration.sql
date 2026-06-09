/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
DROP COLUMN "id",
ADD COLUMN     "taskId" UUID NOT NULL,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("taskId");

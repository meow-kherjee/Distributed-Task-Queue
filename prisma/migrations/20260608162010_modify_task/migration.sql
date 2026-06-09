/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "id",
ADD COLUMN     "taskId" UUID NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId");

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('SUCCESSFUL', 'FAILED');

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

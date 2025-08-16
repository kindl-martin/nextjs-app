-- CreateEnum
CREATE TYPE "task_state" AS ENUM ('OPEN', 'DONE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "start" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(6),
    "task_id" UUID,

    CONSTRAINT "timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" "task_state" NOT NULL DEFAULT 'OPEN',
    "position" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_rolesTousers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_rolesTousers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_rolesTousers_B_index" ON "_rolesTousers"("B");

-- AddForeignKey
ALTER TABLE "timer" ADD CONSTRAINT "timer_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_rolesTousers" ADD CONSTRAINT "_rolesTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_rolesTousers" ADD CONSTRAINT "_rolesTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

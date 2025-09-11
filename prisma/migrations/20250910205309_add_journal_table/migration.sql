-- CreateTable
CREATE TABLE "journal" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "journal_pkey" PRIMARY KEY ("id")
);

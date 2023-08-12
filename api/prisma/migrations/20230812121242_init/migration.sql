-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SALE_PRODUCER', 'SALE_AFFILIATE', 'COMMISSION_PAID', 'COMMISSION_RECEIVED');

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "salesman" TEXT NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

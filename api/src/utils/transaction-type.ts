import { TransactionType } from "@prisma/client";

export const TRANSACTION_TYPE = {
  1: TransactionType.SALE_PRODUCER,
  2: TransactionType.SALE_AFFILIATE,
  3: TransactionType.COMMISSION_PAID,
  4: TransactionType.COMMISSION_RECEIVED,
};
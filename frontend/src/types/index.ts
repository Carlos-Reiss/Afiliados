import { ButtonHTMLAttributes } from "react";

export type Transaction = {
  salesman: string;
  product: string;
  totalSales: string;
  totalCommissions: string;
  totalCommissionsPaid: string;
};

export type TransactionListProps = {
  transactions: Transaction[];
};

export type ButtonSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  file?: File;
  clearFile: () => void;
};

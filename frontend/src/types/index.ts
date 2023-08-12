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

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Transaction } from "../types";

type TransactionContextType = {
  transactions: Transaction[];
  fetchTransactions: () => void;
};

export const TransactionContext = React.createContext<
  TransactionContextType | undefined
>(undefined);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const toastId = toast.loading("Carregando transações...");
    const response = await fetch("http://localhost:3030");
    const data = await response.json();
    if (data) {
      setTransactions(data);
    }
    toast.dismiss(toastId);
  };

  return (
    <TransactionContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

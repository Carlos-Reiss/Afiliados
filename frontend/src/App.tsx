import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./App.css";
import { CustomDropzone } from "./components/CustomDropzone";
import { TransactionsList } from "./components/TransactionsList";
import { Transaction } from "./types";

function App() {
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <div className="half">
        <CustomDropzone />
      </div>
      <div className="half">
        <div>
          {!transactions.length ? (
            <h3>Nenhuma transação encontrada</h3>
          ) : (
            <TransactionsList transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

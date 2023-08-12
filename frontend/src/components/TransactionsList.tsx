import { TransactionListProps } from "../types";
import { formatCurrency } from "../utils";

export function TransactionsList({ transactions }: TransactionListProps) {
  return (
    <>
      <h1>Transactions</h1>
      <div className="transaction-list">
        {Object.values(transactions).map((item, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-detail">
              <div className="transaction-title">
                <h3>Nome:</h3>
                <p>{item.salesman}</p>
                <h3>Detalhes:</h3>

                <div className="transaction-content">
                  <p>{item.product}</p>
                  <div className="transaction-values">
                    <div>
                      <h4>Total de vendas: </h4>
                      <span>{formatCurrency(item.totalSales)}</span>
                    </div>
                    <div>
                      <h4>Total de comissões recebidas:</h4>
                      <span>{formatCurrency(item.totalCommissions)}</span>
                    </div>
                    <div>
                      <h4>Total de comissões pagas:</h4>
                      <span>{formatCurrency(item.totalCommissionsPaid)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

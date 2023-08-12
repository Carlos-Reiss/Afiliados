import { Request, Response } from "express";
import prisma from "../../common/prisma-client";
import { TransactionType, Transactions } from "@prisma/client";

type Summary = {
  [key: string]: {
    salesman: string;
    product: string;
    totalSales: number;
    totalCommissions: number;
    totalCommissionsPaid: number;
  };
};

export const findAllTransactionsService = async (
  request: Request,
  response: Response
) => {
  const transactions = await prisma.transactions.findMany({});

  const summary = {} as Summary;

  transactions.forEach((transaction) => {
    const key = transaction.salesman;

    if (!summary[key]) {
      summary[key] = {
        salesman: transaction.salesman,
        product: transaction.product,
        totalSales: 0,
        totalCommissions: 0,
        totalCommissionsPaid: 0,
      };
    }

    const value = String(Number(transaction.value));
    
    if (transaction.type.includes("SALE")) {
      summary[key].totalSales += parseFloat(value);
    } else if (transaction.type === TransactionType.COMMISSION_RECEIVED) {
      summary[key].totalCommissions += parseFloat(value);
    } else if (transaction.type === TransactionType.COMMISSION_PAID) {
      summary[key].totalCommissionsPaid += parseFloat(value);
    }
  });

  const output = Object.values(summary).map((item) => {
    return {
      salesman: item.salesman,
      product: item.product,
      totalSales: item.totalSales.toFixed(2),
      totalCommissions: item.totalCommissions.toFixed(2),
      totalCommissionsPaid: item.totalCommissionsPaid.toFixed(2),
    };
  });

  return response.json(output);
};

import { Request, Response } from "express";
import prisma from "../../common/prisma-client";

export const findAllTransactionsService = async (
  request: Request,
  response: Response
) => {
  const transactions = await prisma.transactions.findMany({});

  return response.status(200).json(transactions);
};

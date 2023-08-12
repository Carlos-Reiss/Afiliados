import { Decimal } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { readFileSync, unlinkSync } from "fs";
import prisma from "../../common/prisma-client";
import { TRANSACTION_TYPE } from "../../utils/transaction-type";

export const uploadTransactionsService = async (
  request: Request,
  response: Response
) => {
  const file = request.file;
  if (!file) return response.status(400).json({ message: "file not found" });

  if (file.mimetype !== "text/plain") {
    unlinkSync(`uploads/${file.filename}`);
    return response.status(400).json({ message: "invalid file type" });
  }

  try {
    const data = readFileSync(`uploads/${file.filename}`, "utf-8");
    const lines = data.split("\n");

    const transactions = lines
      .filter((line) => line.length !== 0)
      .map((line) => {
        const type = Number(line.substring(0, 1));
        const transaction = {
          type: TRANSACTION_TYPE[type],
          date: line.substring(1, 26).trim(),
          product: line.substring(26, 56).trim(),
          value: new Decimal(line.substring(55, 66).trim()),
          salesman: line.substring(66, 85).trim(),
        };

        return transaction;
      });

    await prisma.transactions.createMany({
      data: transactions,
      skipDuplicates: true,
    });

    return response.status(200).json({ message: "upload success." });
  } catch (error) {
    unlinkSync(`uploads/${file.filename}`);
    return response
      .status(400)
      .json({ message: `Erro ao ler o arquivo: ${error}` });
  }
};

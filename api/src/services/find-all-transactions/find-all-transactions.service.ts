import { Request, Response } from "express";

export const findAllTransactionsService = async (
  request: Request,
  response: Response
) => {
  return response.json({ message: "sleeping" });
};

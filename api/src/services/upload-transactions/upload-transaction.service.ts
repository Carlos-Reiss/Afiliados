import { Request, Response } from "express";

export const uploadTransactionsService = async (
  request: Request,
  response: Response
) => {
  return response.json({ message: "sleeping" });
};

import { Router } from "express";
import { findAllTransactionsService } from "../services/find-all-transactions/find-all-transactions.service";
import { uploadTransactionsService } from "../services/upload-transactions/upload-transaction.service";

export const routes = (router: Router) => {
  router.get("/", findAllTransactionsService);
  router.post("/upload", uploadTransactionsService);
};

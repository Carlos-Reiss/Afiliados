import { Router } from "express";
import { findAllTransactionsService } from "../services/find-all-transactions/find-all-transactions.service";
import { uploadTransactionsService } from "../services/upload-transactions/upload-transaction.service";
import { upload } from "../common/storage";

export const routes = (router: Router) => {
  router.get("/", findAllTransactionsService);
  router.post("/upload", upload.single("file"), uploadTransactionsService);
};

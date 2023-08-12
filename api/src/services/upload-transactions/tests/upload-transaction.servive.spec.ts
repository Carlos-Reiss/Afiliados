import express, { Express } from "express";
import request from "supertest";
import { prismaMock } from "../../../common/mock/singleton";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionType } from "@prisma/client";
import { uploadTransactionsService } from "../upload-transaction.service";
import { upload } from "../../../common/storage";
import { readFileSync } from "fs";
import { TRANSACTION_TYPE } from "../../../utils/transaction-type";

describe("uploadTransactionsService", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.post("/upload", upload.single("file"), uploadTransactionsService);
  });

  it("should return 400 if no file is provided", async () => {
    const response = await request(app).post("/upload");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "file not found",
    });
  });

  it("should return 400 if the file type is not plain text", async () => {
    const mockFile = "./src/utils/mock.csv";
    const response = await request(app)
      .post("/upload")
      .attach("file", mockFile);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "invalid file type",
    });
  });

  it("should return 200 and upload the file", async () => {
    const mockFile = "./src/utils/sales.txt";

    const data = readFileSync(mockFile, "utf-8");
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

    prismaMock.transactions.createMany.mockResolvedValue(transactions as any);

    const response = await request(app)
      .post("/upload")
      .attach("file", mockFile);

    expect(prismaMock.transactions.createMany).toBeCalledTimes(1);
    expect(prismaMock.transactions.createMany).toBeCalledWith({
      data: transactions,
      skipDuplicates: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "upload success.",
    });
  });

  it("should return 400 if the file is not in the necessary format", async () => {
    const mockFile = "./src/utils/sales.txt";

    const mockReadFileSync = jest.spyOn(require("fs"), "readFileSync");
    mockReadFileSync.mockImplementation(() => {
      throw new Error("File read error");
    });

    await request(app).post("/upload").attach("file", mockFile);

    expect(prismaMock.transactions.createMany).not.toBeCalled();
  });
});

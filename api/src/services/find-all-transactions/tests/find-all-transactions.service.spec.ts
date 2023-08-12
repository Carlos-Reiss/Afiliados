import express, { Express } from "express";
import request from "supertest";
import { prismaMock } from "../../../common/mock/singleton";
import { findAllTransactionsService } from "../find-all-transactions.service";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionType } from "@prisma/client";

describe("GET /transactions", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get("/", findAllTransactionsService);
  });

  it("should return 200 and all transactions", async () => {
    const transactions = [
      {
        id: "mockUUid",
        date: new Date(),
        product: "mockProduct",
        salesman: "mockSalesman",
        type: TransactionType.SALE_AFFILIATE,
        value: new Decimal(100),
      },
    ];

    prismaMock.transactions.findMany.mockResolvedValue(transactions);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(prismaMock.transactions.findMany).toBeCalledTimes(1);
    expect(prismaMock.transactions.findMany).toBeCalledWith({});
    expect(response.body[0].id).toEqual("mockUUid");
    expect(response.body[0].date).toEqual(transactions[0].date.toISOString());
  }, 20000);
});

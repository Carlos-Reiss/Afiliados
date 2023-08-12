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
      {
        id: "mockUUid",
        date: new Date(),
        product: "mockProduct",
        salesman: "mockSalesman",
        type: TransactionType.COMMISSION_RECEIVED,
        value: new Decimal(40),
      },
      {
        id: "mockUUid",
        date: new Date(),
        product: "mockProduct",
        salesman: "mockSalesman",
        type: TransactionType.COMMISSION_PAID,
        value: new Decimal(10),
      },
    ];

    prismaMock.transactions.findMany.mockResolvedValue(transactions);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(prismaMock.transactions.findMany).toBeCalledTimes(1);
    expect(prismaMock.transactions.findMany).toBeCalledWith({});
    expect(response.body[0].salesman).toEqual("mockSalesman");
    expect(response.body[0].product).toEqual("mockProduct");
    expect(response.body[0].totalSales).toEqual("100.00");
    expect(response.body[0].totalCommissions).toEqual("40.00");
    expect(response.body[0].totalCommissionsPaid).toEqual("10.00");
  }, 20000);
});

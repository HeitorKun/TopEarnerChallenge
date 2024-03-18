import {
  Employee,
  Transaction,
} from "../../../src/transactions/entities/Transaction";
import { TransactionProcessor } from "../../../src/transactions/services/TransactionProcessor";

describe("TransactionProcessor", () => {
  it("should filter transactions by year", () => {
    const transactions = transactionsMockData;
    const processor = new TransactionProcessor(transactions);

    const filteredByYearTransactions = processor
      .filterByYear(2023)
      .getTransactions();

    expect(filteredByYearTransactions).toStrictEqual([
      transactions[0],
      transactions[2],
      transactions[7],
    ]);
  });
  it("should filter transactions by top earner", () => {
    const transactions: Transaction[] = transactionsMockData;
    const processor = new TransactionProcessor(transactions);

    const topEarnerTransactions = processor
      .filterByTopEarner()
      .getTransactions();

    // Check if all transactions in the result are from topEarnerEmployee
    expect(
      topEarnerTransactions.every(
        (transaction) => transaction.employee.name == topEarnerEmployee.name
      )
    ).toBeTruthy();
  });

  it("should filter transactions by type", () => {
    const transactions: Transaction[] = transactionsMockData;
    const processor = new TransactionProcessor(transactions);

    const filteredTransactions = processor
      .filterByType("alpha")
      .getTransactions();


    expect(
      filteredTransactions.every((transaction) => transaction.type === "alpha")
    ).toBeTruthy();
  });
});

const topEarnerEmployee = { id: "qdrFNhEv", name: "Heitor" };
const transactionsMockData: Transaction[] = [
  {
    transactionID: "JOTJknYyvqAA",
    timeStamp: "2023-03-22T00:00:00",
    amount: 4275.76,
    type: "alpha",
    employee: topEarnerEmployee,
  },
  {
    transactionID: "xZACCjrObUfW",
    timeStamp: "2022-11-27T00:00:00",
    amount: 2616.48,
    type: "alpha",
    employee: topEarnerEmployee,
  },
  {
    transactionID: "HIgyIKwgobZw",
    timeStamp: "2023-08-27T00:00:00",
    amount: 4585.18,
    type: "alpha",
    employee: topEarnerEmployee,
  },
  {
    transactionID: "gJwUkBnBKqGb",
    timeStamp: "2022-03-21T00:00:00",
    amount: 1363.65,
    type: "alpha",
    employee: { id: "knyDMufb", name: "Luis" },
  },
  {
    transactionID: "EjovlKZdYNdw",
    timeStamp: "2022-01-01T00:00:00",
    amount: 1040.7,
    type: "beta",
    employee: { id: "JXffdzzJ", name: "Luis M." },
  },
  {
    transactionID: "eehOQMgBsYkc",
    timeStamp: "2022-05-30T00:00:00",
    amount: 1449.84,
    type: "gamma",
    employee: topEarnerEmployee,
  },
  {
    transactionID: "AVCLYcSyiewy",
    timeStamp: "2022-05-09T00:00:00",
    amount: 562.21,
    type: "beta",
    employee: { id: "UqgdQPbH", name: "Luisa" },
  },
  {
    transactionID: "sBnoPtAWYGyl",
    timeStamp: "2023-08-15T00:00:00",
    amount: 424.5,
    type: "gamma",
    employee: { id: "ooAkXalm", name: "Angela" },
  },
  {
    transactionID: "qwYTtIQjIzVg",
    timeStamp: "2022-12-08T00:00:00",
    amount: 1238.89,
    type: "alfa",
    employee: topEarnerEmployee,
  },
  {
    transactionID: "KlFpMHKWWUoD",
    timeStamp: "2022-10-29T00:00:00",
    amount: 1585.06,
    type: "alfa",
    employee: topEarnerEmployee,
  },
];

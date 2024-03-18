import { Transaction } from "../entities/Transaction";

export class TransactionProcessor {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  filterByYear(targetYear: number): TransactionProcessor {
    this.transactions = this.transactions.filter(
      (transaction) =>
        new Date(transaction.timeStamp).getFullYear() === targetYear
    );
    return this;
  }

  filterByTopEarner(): TransactionProcessor {
    const employeeEarnings = this.transactions.reduce((acc, transaction) => {
      const employeeId = transaction.employee.id;
      if (!acc[employeeId]) {
        acc[employeeId] = { amount: 0, transactions: [] };
      }
      acc[employeeId].amount += transaction.amount;
      acc[employeeId].transactions.push(transaction);
      return acc;
    }, {} as Record<string, { amount: number; transactions: Transaction[] }>);

    const topEarner = Object.entries(employeeEarnings).reduce(
      (top, [_, { amount, transactions }]) =>
        top.amount > amount ? top : { amount, transactions },
      { amount: 0, transactions: [] }
    );

    this.transactions = topEarner.transactions;
    return this;
  }

  filterByType(type: string): TransactionProcessor {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.type === type
    );
    return this;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }
}

import { Transaction } from "../entities/Transaction";

export interface ITransactionRepository {
  fetchTransactions(): Promise<TransactionFetchResult>;
}
export type TransactionFetchResult = {
  id?: string
  data: Transaction[];
  error?: string;
};

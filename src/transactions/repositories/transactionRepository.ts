import { Transaction } from "../entities/transaction";

export interface ITransactionRepository {
  fetchTransactions(): Promise<TransactionFetchResult>;
}
export type TransactionFetchResult = {
  data: Transaction[];
  error?: string;
};

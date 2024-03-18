import { Transaction } from "../../entities/transaction";

export interface ITransactionRepository {
  fetchTransactions(): Promise<TransactionFetchResult>;
}
export type TransactionFetchResult = {
  data?: { id: string; transactions: Transaction[] };
  error?: string;
};

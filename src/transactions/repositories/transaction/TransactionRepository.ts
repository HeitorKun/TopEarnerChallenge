import { Transaction } from "../../entities/transaction";

export interface ITransactionRepository {
  fetchTransactions(): Promise<TransactionFetchResult>;
}
export type TransactionFetchResult = {
  id?: string
  data: Transaction[];
  error?: string;
};

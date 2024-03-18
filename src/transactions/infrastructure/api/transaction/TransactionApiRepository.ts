import axios from "axios";
import { Transaction } from "../../../entities/Transaction";
import {
  ITransactionRepository,
  TransactionFetchResult,
} from "../../../repositories/transaction/TransactionRepository";
import { TransactionResponse } from "./TransactionApiRepositoryDTO";
import "dotenv/config";

export class TransactionApiRepository implements ITransactionRepository {
  async fetchTransactions(): Promise<TransactionFetchResult> {
    try {
      const response = await axios.get<TransactionResponse>(
        process.env.API_URL as string
      );

      const transactions: Transaction[] = response.data.transactions.map(
        (dto) => ({
          transactionID: dto.transactionID,
          timeStamp: dto.timeStamp,
          amount: dto.amount,
          type: dto.type,
          employee: {
            id: dto.employee.id,
            name: dto.employee.name,
          },
        })
      );

      return {
        id: response.data.id,
        data: transactions,
        error: undefined,
      };
    } catch (error) {
      return {
        id: null,
        data: [],
        error: error.message || "Unknown error",
      };
    }
  }
}

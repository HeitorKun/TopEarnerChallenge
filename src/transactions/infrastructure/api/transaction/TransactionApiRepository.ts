import axios from "axios";
import {
  ITransactionRepository,
  TransactionFetchResult,
} from "../../../repositories/transaction/TransactionRepository";
import { TransactionResponse } from "./TransactionApiRepositoryDTO";
import "dotenv/config";
import { Transaction } from "../../../entities/transaction";

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
        data: { id: response.data.id, transactions: transactions },
        error: undefined,
      };
    } catch (error) {
      return {
        data: null,
        error: error.message || "Unknown error",
      };
    }
  }
}

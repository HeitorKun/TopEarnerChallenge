import { Transaction } from "../../entities/Transaction";

export interface ITaskRepository {
  submitTask(payload: { id: string; result: Transaction[] }): Promise<void>;
}

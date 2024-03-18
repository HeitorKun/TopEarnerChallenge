import { TransactionApiRepository } from "./transactions/infrastructure/api/transaction/TransactionApiRepository";
import { TransactionProcessor } from "./transactions/services/TransactionProcessor";
import { getPreviousYear } from "./transactions/helpers/date";
import { TaskSubmissionAPIRepository } from "./transactions/infrastructure/api/task/TaskSubmissionAPIRepository";
import { TaskSubmissionStatus } from "./transactions/repositories/task/TaskRepository";
import { TransactionFetchResult } from "./transactions/repositories/transaction/TransactionRepository";


async function main(): Promise<void> {
  try {
    const transactionData = await fetchTransactions();
    const transactionIDs = processTransactions(transactionData);

    const taskResult: TaskSubmissionStatus = await submitTask(
      transactionData.data.id,
      transactionIDs
    );
    console.log("Task Result: ", taskResult);
  } catch (error: any) {
    console.error("An error occurred: ", error.message);
  }
}

async function fetchTransactions(): Promise<TransactionFetchResult> {
  const repository = new TransactionApiRepository();
  const result = await repository.fetchTransactions();

  if (result.error) {
    throw new Error(result.error);
  }
  return result;
}

function processTransactions(
  transactionData: TransactionFetchResult
): string[] {
  const transactionProcessor = new TransactionProcessor(
    transactionData.data.transactions
  );
  const topEarnersAlphaTransactions = transactionProcessor
    .filterByTopEarner()
    .filterByYear(getPreviousYear())
    .filterByType("alpha")
    .getTransactions();

  return topEarnersAlphaTransactions.map(
    (transaction) => transaction.transactionID
  );
}

async function submitTask(
  id: string,
  transactionIDs: string[]
): Promise<TaskSubmissionStatus> {
  const taskSubmissionRepository = new TaskSubmissionAPIRepository();
  return await taskSubmissionRepository.submitTask({ id, transactionIDs });
}

main();

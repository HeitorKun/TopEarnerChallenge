import { TransactionApiRepository } from "./transactions/infrastructure/api/transaction/TransactionApiRepository";
import { TransactionProcessor } from "./transactions/services/TransactionProcessor";
import { getPreviousYear } from "./transactions/helpers/date";
import { TaskSubmissionAPIRepository } from "./transactions/infrastructure/api/task/TaskSubmissionAPIRepository";

async function main() {
  const repository = new TransactionApiRepository();

  const transactionsFetchResult = await repository.fetchTransactions();
  if (transactionsFetchResult.error) {
    console.log("Error fetching: ", transactionsFetchResult.error);
    return;
  }
  const fetchId = transactionsFetchResult.data.id;
  const transactions = transactionsFetchResult.data.transactions;
  const transactionProcessor = new TransactionProcessor(transactions);
  const topEarnersAlphaTransactionsFromLastYear = transactionProcessor
    .filterByTopEarner()
    .filterByYear(getPreviousYear())
    .filterByType("alpha")
    .getTransactions();

  const transactionIDs = topEarnersAlphaTransactionsFromLastYear.map(
    (transaction) => transaction.transactionID
  );

  const taskSubmissionRepository = new TaskSubmissionAPIRepository();
  const taskResult = await taskSubmissionRepository.submitTask({
    id: fetchId,
    transactionIDs: transactionIDs,
  });
  console.log("Task Result: ", taskResult);
}

main();

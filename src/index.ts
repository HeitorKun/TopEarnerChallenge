import { TransactionApiRepository } from "./transactions/infrastructure/api/transaction/TransactionApiRepository";
import { TransactionProcessor } from "./transactions/services/TransactionProcessor";
import { getPreviousYear } from "./transactions/helpers/date";

async function main() {
  const repository = new TransactionApiRepository();

  const transactionsFetchResult = await repository.fetchTransactions();
  if (transactionsFetchResult.error) {
    console.log("Error fetching:");
    return;
  }
  const transactions = transactionsFetchResult.data;
  const transactionProcessor = new TransactionProcessor(transactions);
  const topEarnersAlphaTransactionsFromLastYear = transactionProcessor
    .filterByTopEarner()
    .filterByYear(getPreviousYear())
    .filterByType("alpha")
    .getTransactions();

  console.log(topEarnersAlphaTransactionsFromLastYear);
}

main();

import { TransactionApiRepository } from "./transactions/infrastructure/api/TransactionApiRepository";

async function main() {
  const repository = new TransactionApiRepository();

  try {
    const transactions = await repository.fetchTransactions();
    console.log(transactions);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

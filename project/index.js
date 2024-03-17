import { getPreviousYear } from "./transactions/helpers/date.js";
import { topEarnerTransactions } from "./transactions/services/analytics/index.js";
import { fetchTransactions } from "./transactions/services/webService/fetchTransactions.js";

const main = async () => {
  const data = await fetchTransactions();
  if (!data.transactions) {
    console.log("Got no Data from the API");
    return;
  }
};
main();

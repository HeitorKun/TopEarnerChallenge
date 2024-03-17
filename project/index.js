import { getPreviousYear } from "./transactions/helpers/date.js";
import {
  findAlphaTransactions,
  topEarnerTransactions,
} from "./transactions/services/analytics/index.js";
import { fetchTransactions } from "./transactions/services/webService/fetchTransactions.js";
import { submitAlphaTransactions } from "./transactions/services/webService/submitDataTransactions.js";

const main = async () => {
  const data = await fetchTransactions();
  if (!data.transactions) {
    console.log("Got no Data from the API");
    return;
  }
  const previousYear = getPreviousYear();
  const topEarnersTransactions = topEarnerTransactions(
    data.transactions,
    previousYear
  );
  if (!topEarnersTransactions) {
    console.log("No top earner found for last year.");
    return;
  }
  const alphaTransactions = findAlphaTransactions(topEarnersTransactions);
  const submitStatus = await submitAlphaTransactions(data.id, alphaTransactions);
  console.log(
    "Submission Status:",
    submitStatus === 200 ? "Success" : "Failed"
  );
};
main();

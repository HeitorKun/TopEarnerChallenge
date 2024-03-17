export const topEarnerTransactions = (transactions, targetYear) => {
  let employeesDic = {};
  for (let transaction of transactions) {
    const transactionYear = new Date(transaction.timeStamp).getFullYear();
    if (transactionYear === targetYear) {
      if (!employeesDic[transaction.employee.id]) {
        employeesDic[transaction.employee.id] = {};
        employeesDic[transaction.employee.id].amount = 0;
        employeesDic[transaction.employee.id].employeestransactions = [];
      }
      employeesDic[transaction.employee.id].amount += transaction.amount;
      employeesDic[transaction.employee.id].employeestransactions.push({
        id: transaction.transactionID,
        type: transaction.type,
      });
    }
  }

  let topEarnerId = null;
  let maxEarning = 0;

  for (const employeeId in employeesDic) {
    const employeeAmount = employeesDic[employeeId].amount;
    if (employeeAmount > maxEarning) {
      maxEarning = employeeAmount;
      topEarnerId = employeeId;
    }
  }
  const result = employeesDic[topEarnerId].employeestransactions;
  return result;
};

export type Transaction = {
  transactionID: string;
  timeStamp: string;
  amount: number;
  type: string;
  employee: Employee;
};
export type Employee = {
  id: string;
  name: string;
};

export type TransactionResponse = {
  id: string;
  transactions: TransactionDTO[];
};

type LocationDTO = {
  name: string;
  id: string;
};

type EmployeeDTO = {
  name: string;
  id: string;
  categoryCode: string;
};

type TransactionDTO = {
  transactionID: string;
  timeStamp: string;
  amount: number;
  type: string;
  location: LocationDTO;
  employee: EmployeeDTO;
};

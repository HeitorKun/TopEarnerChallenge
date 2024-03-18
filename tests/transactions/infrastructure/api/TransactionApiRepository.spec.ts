import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { TransactionApiRepository } from "../../../../src/transactions/infrastructure/api/transaction/TransactionApiRepository";
import { v4 as uuidv4 } from "uuid";
import { TransactionResponse } from "../../../../src/transactions/infrastructure/api/transaction/TransactionApiRepositoryDTO";

describe("TransactionApiRepository", () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const apiURL = process.env.API_URL as string;

  afterEach(() => {
    mockAxios.reset();
  });

  it("should fetch and correctly map 10 transactions", async () => {
    const mockDataQuantity = 10;
    const mockData = createMockTransactionData(mockDataQuantity);
    mockAxios.onGet(apiURL).reply(200, mockData);
  
    const repository = new TransactionApiRepository();
    const result = await repository.fetchTransactions();
  
    expect(result.data.transactions).toHaveLength(mockDataQuantity);
    expect(result.error).toBeUndefined();
  
    mockData.transactions.forEach((mockTransaction, index) => {
      const { amount, employee, timeStamp, transactionID, type } = mockTransaction;
      const resultTransaction = result.data.transactions[index];
  
      expect(resultTransaction.amount).toBe(amount);
      expect(resultTransaction.employee.id).toBe(employee.id);
      expect(resultTransaction.employee.name).toBe(employee.name);
      expect(resultTransaction.timeStamp).toBe(timeStamp);
      expect(resultTransaction.transactionID).toBe(transactionID);
      expect(resultTransaction.type).toBe(type);
    });
  });
  

  it("should handle fetch error", async () => {
    mockAxios.onGet(apiURL).networkError();

    const repository = new TransactionApiRepository();
    const result = await repository.fetchTransactions();

    expect(result.data).toBeNull;
    expect(result.error).toBeDefined();
  });
});

function createMockTransactionData(
  numberOfTransactions: number
): TransactionResponse {
  const randomAmount = () => Math.floor(Math.random() * 1000) + 100; // Random amount between 100 and 1100
  const randomEmployeeId = () => `SED${Math.floor(Math.random() * 1000)}`;
  const types = ["alpha", "beta", "gamma"];

  const mockTransactions = Array.from({ length: numberOfTransactions }, () => ({
    transactionID: uuidv4(),
    timeStamp: new Date(
      1950 + Math.floor(Math.random() * 100), // Random year between 1950 and 2050
      Math.floor(Math.random() * 12), // Random month
      Math.floor(Math.random() * 28) // Random day
    ).toISOString(),
    amount: randomAmount(),
    type: types[Math.floor(Math.random() * types.length)],
    location: {
      name: "New York, New York",
      id: `L${Math.floor(Math.random() * 10000)}`,
    },
    employee: {
      name: `Employee ${Math.floor(Math.random() * 100)}`,
      id: randomEmployeeId(),
      categoryCode: "red",
    },
  }));

  return {
    id: uuidv4(),
    transactions: mockTransactions,
  };
}

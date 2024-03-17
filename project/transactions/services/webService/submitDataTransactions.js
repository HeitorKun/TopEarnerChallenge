import axios from "axios";
import "dotenv/config";

export const submitAlphaTransactions = async (id, alphaTransactionIds) => {
  try {
    const info = {
      id: id,
      result: alphaTransactionIds,
    };
    const response = await axios.post(process.env.API_URL_POST, info);

    return response.status;
  } catch (error) {
    console.error("Error submitting results:", error);
    return error.response ? error.response.status : 500;
  }
};

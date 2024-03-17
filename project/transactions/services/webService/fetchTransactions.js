import axios from "axios";
import 'dotenv/config';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(process.env.API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
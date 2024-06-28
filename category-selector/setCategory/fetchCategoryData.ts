import axios from "axios";
import { raw_items_types } from "./setCategory";

export async function fetchCategoryData(category: string): Promise<raw_items_types> {
  try {
    const response = await axios.get(
      `https://reactnative.directory/api/libraries?search=${category}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for category ${category}:`, error);
    return { libraries: [], total: 0 };
  }
}

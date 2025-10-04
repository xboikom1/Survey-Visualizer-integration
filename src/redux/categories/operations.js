import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://opentdb.com";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api_category.php");
      return response.data.trivia_categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

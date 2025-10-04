import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://opentdb.com";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategoriesWithQuestionCounts",
  async (_, thunkAPI) => {
    try {
      const categoriesResponse = await axios.get("/api_category.php");
      const categories = categoriesResponse.data.trivia_categories;

      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const questionsResponse = await axios.get(
            `/api_count.php?category=${category.id}`
          );
          const questionCount =
            questionsResponse.data.category_question_count.total_question_count;
          return { ...category, questionCount };
        })
      );
      return categoriesWithCounts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

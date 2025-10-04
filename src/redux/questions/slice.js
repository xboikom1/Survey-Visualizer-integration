import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  categoryDistribution: [],
  difficultyDistribution: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    calculateDistributions: (state) => {
      if (state.items.length === 0) return;

      const difficultyCount = {};
      state.items.forEach((question) => {
        const difficulty = question.difficulty;
        difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
      });

      state.difficultyDistribution = Object.entries(difficultyCount).map(
        ([difficulty, count]) => ({
          name: difficulty[0].toUpperCase() + difficulty.slice(1),
          value: count,
        })
      );

      const categoryCount = {};
      state.items.forEach((question) => {
        const category = question.category;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      state.categoryDistribution = Object.entries(categoryCount).map(
        ([category, count]) => ({
          name: category.replace(/Entertainment: |Science: |Sports: /, ""),
          value: count,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.error = "Failed to load questions";
        state.loading = false;
      });
  },
});

export const { calculateDistributions } = questionsSlice.actions;
export default questionsSlice.reducer;

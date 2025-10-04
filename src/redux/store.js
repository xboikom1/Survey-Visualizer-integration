import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/slice";
import questionsReducer from "./questions/slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questions: questionsReducer,
  },
});

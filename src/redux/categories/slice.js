import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.error = "Failed to load categories";
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;

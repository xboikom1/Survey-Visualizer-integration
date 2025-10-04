export const selectQuestions = (state) => state.questions.items;
export const selectQuestionsLoading = (state) => state.questions.loading;
export const selectQuestionsError = (state) => state.questions.error;
export const selectCategoryDistribution = (state) =>
  state.questions.categoryDistribution;
export const selectDifficultyDistribution = (state) =>
  state.questions.difficultyDistribution;

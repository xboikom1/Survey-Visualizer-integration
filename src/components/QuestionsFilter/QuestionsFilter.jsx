import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { selectCategories } from "../../redux/categories/selectors";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import css from "./QuestionsFilter.module.css";
import { decodeHtml } from "../../utils/decodeHtml.js";

const QuestionViewer = () => {
  const categories = useSelector(selectCategories) || [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryOptions = [
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const filteredQuestions = selectedCategory?.value ? questions : [];

  const handleCategorySelect = async (selectedOption) => {
    if (!selectedOption) return;

    setSelectedCategory(selectedOption);
    setExpandedQuestions(new Set());
    setLoading(true);
    try {
      const response = await axios.get(
        `/api.php?amount=10&category=${selectedOption.value}`
      );
      setQuestions(response.data.results || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestionExpansion = (questionIndex) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionIndex)) newExpanded.delete(questionIndex);
    else newExpanded.add(questionIndex);

    setExpandedQuestions(newExpanded);
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: state.isFocused ? "#4f46e5" : "rgba(255, 255, 255, 0.3)",
      borderWidth: "2px",
      borderRadius: "10px",
      padding: "4px 8px",
      fontSize: "16px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(79, 70, 229, 0.3)" : "none",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
        ? "rgba(79, 70, 229, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#333",
      padding: "16px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      zIndex: 100,
    }),
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>Browse Questions by Category</h2>
          <p className={css.subtitle}>
            Choose a category to view its questions and answers
          </p>
        </div>

        <div className={css.categorySelector}>
          <label className={css.label}>Select Category:</label>
          <Select
            value={selectedCategory}
            onChange={handleCategorySelect}
            options={categoryOptions}
            styles={selectStyles}
            placeholder="Choose a category..."
            isClearable
            isSearchable
          />
        </div>

        {selectedCategory?.value && (
          <div className={css.questionsSection}>
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorComponent message={error} />
            ) : (
              filteredQuestions.length > 0 && (
                <>
                  <h3 className={css.questionsCategoryTitle}>
                    {decodeHtml(selectedCategory.label)} (
                    {filteredQuestions.length} questions)
                  </h3>
                  <ul className={css.questionsGrid}>
                    {filteredQuestions.map((question, index) => (
                      <li key={index} className={css.questionCard}>
                        <div className={css.questionHeader}>
                          <span className={css.difficulty}>
                            {decodeHtml(question.difficulty)}
                          </span>
                          <span className={css.type}>
                            {question.type === "multiple"
                              ? "Multiple Choice"
                              : "True/False"}
                          </span>
                        </div>

                        <div className={css.questionContent}>
                          <h4 className={css.questionText}>
                            {decodeHtml(question.question)}
                          </h4>

                          <button
                            className={css.toggleButton}
                            onClick={() => toggleQuestionExpansion(index)}
                          >
                            {expandedQuestions.has(index)
                              ? "Hide Answers"
                              : "Show Answers"}
                          </button>

                          {expandedQuestions.has(index) && (
                            <div className={css.answersSection}>
                              <div className={css.correctAnswerContainer}>
                                <strong className={css.correctTitle}>
                                  Correct Answer:
                                </strong>
                                <span className={css.correctAnswer}>
                                  {decodeHtml(question.correct_answer)}
                                </span>
                              </div>

                              {question.incorrect_answers.length > 0 && (
                                <div className={css.incorrectAnswers}>
                                  <strong className={css.incorrectTitle}>
                                    Incorrect Answers:
                                  </strong>
                                  <ul className={css.incorrectList}>
                                    {question.incorrect_answers.map(
                                      (answer, answerIndex) => (
                                        <li
                                          key={answerIndex}
                                          className={css.incorrectListItem}
                                        >
                                          {decodeHtml(answer)}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionViewer;

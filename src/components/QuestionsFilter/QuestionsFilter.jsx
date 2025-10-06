import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import css from "./QuestionsFilter.module.css";
import { decodeHtml } from "../../utils/decodeHtml.js";
import SelectComponent from "../SelectComponent/SelectComponent.jsx";
import { selectCategories } from "../../redux/categories/selectors.js";
import { useSelector } from "react-redux";

const QuestionViewer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const categories = useSelector(selectCategories);

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
    setSelectedCategory(selectedOption);
    setExpandedQuestions(new Set());
    setError(null);
    setLoading(true);
    setQuestions([]);

    if (!selectedOption) return;
    try {
      const response = await axios.get(
        `/api.php?amount=10&category=${selectedOption.value}`
      );
      setQuestions(response.data.results || []);
    } catch (err) {
      setError(err.message);
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

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>Browse Questions by Category</h2>
          <p className={css.subtitle}>
            Choose a category to view its questions and answers
          </p>
        </div>

        <SelectComponent
          value={selectedCategory}
          onChange={handleCategorySelect}
          options={categoryOptions}
        />

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

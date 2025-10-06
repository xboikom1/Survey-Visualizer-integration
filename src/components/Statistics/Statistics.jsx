import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchQuestions } from "../../redux/questions/operations";
import {
  selectQuestions,
  selectQuestionsLoading,
  selectQuestionsError,
  selectCategoryDistribution,
  selectDifficultyDistribution,
} from "../../redux/questions/selectors";
import CategoryChart from "../Charts/CategoryChart";
import DifficultyChart from "../Charts/DifficultyChart";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Loader from "../Loader/Loader";
import css from "./Statistics.module.css";

const Statistics = () => {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const isLoading = useSelector(selectQuestionsLoading);
  const error = useSelector(selectQuestionsError);
  const categoryDistribution = useSelector(selectCategoryDistribution);
  const difficultyDistribution = useSelector(selectDifficultyDistribution);

  useEffect(() => {
    if (questions?.length === 0 && !isLoading && !error) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions, isLoading, error]);

  if (error) return <ErrorComponent>{error}</ErrorComponent>;

  return (
    <section id="statistics" className={css.statisticsSection}>
      <div className={css.sectionHeader}>
        <h2 className={css.statisticsTitle}>Question Statistics</h2>
        <p className={css.statisticsDescription}>
          Analyze the distribution of questions across categories and difficulty
          levels
        </p>
        {questions?.length > 0 && (
          <p className={css.dataInfo}>
            Based on {questions.length} questions from the Open Trivia Database
          </p>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className={css.chartsContainer}>
          <li className={css.chart}>
            <DifficultyChart data={difficultyDistribution} />
          </li>
          <li className={css.chart}>
            <CategoryChart data={categoryDistribution} />
          </li>
        </ul>
      )}
    </section>
  );
};

export default Statistics;

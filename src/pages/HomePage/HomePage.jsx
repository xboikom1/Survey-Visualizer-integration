import Header from "../../components/Header/Header";
import css from "./HomePage.module.css";
import Overview from "../../components/Overview/Overview";
import Categories from "../../components/Categories/Categories";
import Statistics from "../../components/Statistics/Statistics";
import QuestionsFilter from "../../components/QuestionsFilter/QuestionsFilter";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={css.pageContainer}>
        <Overview />
        <Categories />
        <QuestionsFilter />
        <Statistics />
      </main>
    </>
  );
};

export default HomePage;

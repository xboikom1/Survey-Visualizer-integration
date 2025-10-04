import Header from "../../components/Header/Header";
import css from "./HomePage.module.css";
import Overview from "../../components/Overview/Overview";
import Categories from "../../components/Categories/Categories";
import Statistics from "../../components/Statistics/Statistics";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={css.pageContainer}>
        <Overview />
        <Categories />
        <Statistics />
      </main>
    </>
  );
};

export default HomePage;

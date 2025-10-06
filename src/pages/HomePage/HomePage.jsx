import React, { lazy, Suspense } from "react";
import Header from "../../components/Header/Header";
import css from "./HomePage.module.css";
import Overview from "../../components/Overview/Overview";
import Categories from "../../components/Categories/Categories";
import QuestionsFilter from "../../components/QuestionsFilter/QuestionsFilter";
import Loader from "../../components/Loader/Loader";
const Statistics = lazy(() => import("../../components/Statistics/Statistics"));

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={css.pageContainer}>
        <Overview />
        <Categories />
        <QuestionsFilter />
        <Suspense fallback={<Loader />}>
          <Statistics />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;

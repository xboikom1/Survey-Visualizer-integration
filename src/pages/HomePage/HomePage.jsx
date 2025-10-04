import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import css from "./HomePage.module.css";
import { fetchCategories } from "../../redux/categories/operations";
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../../redux/categories/selectors";
import Overview from "../../components/Overview/Overview";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    if (categories?.length === 0 && !loading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories?.length, loading]);

  return (
    <>
      <Header />
      <main className={css.pageContainer}>
        <Overview />

        <section id="categories" className={css.categoriesSection}>
          <h2 className={css.categoriesTitle}>Categories</h2>
          <p className={css.categoriesDescription}>
            Explore the distribution of questions across different knowledge
            categories
          </p>
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            categories?.length > 0 && (
              <ul className={css.categoriesGrid}>
                {categories.map((category) => (
                  <li key={category.id} className={css.categoryCard}>
                    <h3>{category.name}</h3>
                    <p>{category.questionCount} questions in this category</p>
                  </li>
                ))}
              </ul>
            )
          )}
        </section>
      </main>
    </>
  );
};

export default HomePage;

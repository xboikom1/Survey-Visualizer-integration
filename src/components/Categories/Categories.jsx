import { useDispatch, useSelector } from "react-redux";
import css from "./Categories.module.css";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "../../redux/categories/selectors";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/categories/operations";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Loader from "../Loader/Loader";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    if (categories?.length === 0 && !isLoading && !error) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories, isLoading, error]);

  if (error) return <ErrorComponent>{error}</ErrorComponent>;

  return (
    <section id="categories" className={css.categoriesSection}>
      <h2 className={css.categoriesTitle}>Categories</h2>
      <p className={css.categoriesDescription}>
        Explore the distribution of questions across different knowledge
        categories
      </p>

      {isLoading ? (
        <Loader />
      ) : (
        categories?.length > 0 && (
          <ul className={css.categoriesGrid}>
            {categories.map((category) => (
              <li key={category.id} className={css.categoryCard}>
                <h3 className={css.categoryName}>{category.name}</h3>
                <p className={css.categoryCount}>
                  {category.questionCount} questions in this category
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
};

export default Categories;

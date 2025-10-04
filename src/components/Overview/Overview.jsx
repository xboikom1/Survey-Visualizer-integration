import css from "./Overview.module.css";

const Overview = () => {
  return (
    <section id="overview" className={css.overviewSection}>
      <h2 className={css.title}>Discover the World of Trivia</h2>
      <ul className={css.overviewStats}>
        <li className={css.statCard}>
          <span className={css.statNumber}>4000+</span>
          <p className={css.statLabel}>Questions</p>
        </li>
        <li className={css.statCard}>
          <span className={css.statNumber}>20+</span>
          <p className={css.statLabel}>Categories</p>
        </li>
        <li className={css.statCard}>
          <span className={css.statNumber}>3</span>
          <p className={css.statLabel}>Difficulty Levels</p>
        </li>
      </ul>
    </section>
  );
};

export default Overview;

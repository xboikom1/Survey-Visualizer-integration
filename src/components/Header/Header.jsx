import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.titleContainer}>
        <h1 className={css.title}>Trivia Visualizer</h1>
        <h2 className={css.subtitle}>
          Interactive data visualization tool for exploring trivia questions
          from the Open Trivia Database
        </h2>
      </div>
    </header>
  );
};

export default Header;

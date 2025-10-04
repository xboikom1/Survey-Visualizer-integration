import css from "./ErrorComponent.module.css";

const ErrorComponent = ({ children }) => {
  return <span className={css.errorMessage}>{children}</span>;
};

export default ErrorComponent;

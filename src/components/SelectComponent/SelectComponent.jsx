import Select from "react-select";
import css from "./SelectComponent.module.css";

const SelectComponent = ({
  value,
  onChange,
  options,
  placeholder = "Choose a category...",
}) => {
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: state.isFocused ? "#4f46e5" : "rgba(255, 255, 255, 0.3)",
      borderWidth: "2px",
      borderRadius: "10px",
      padding: "4px 8px",
      fontSize: "16px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(79, 70, 229, 0.3)" : "none",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
        ? "rgba(79, 70, 229, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#333",
      padding: "16px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      zIndex: 100,
    }),
  };
  return (
    <div className={css.categorySelector}>
      <label className={css.label}>Select Category:</label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        styles={selectStyles}
        placeholder={placeholder}
        isClearable
        isSearchable
      />
    </div>
  );
};

export default SelectComponent;

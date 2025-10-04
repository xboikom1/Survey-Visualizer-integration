import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import css from "./DifficultyChart.module.css";

const DifficultyChart = ({ data }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#48BB78";
      case "Medium":
        return "#ED8936";
      case "Hard":
        return "#F56565";
      default:
        return "#4299E1";
    }
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map((item) => ({
    ...item,
    total,
    color: getDifficultyColor(item.name),
  }));

  const customTooltip = (props) => {
    const { active, payload } = props;

    if (active) {
      const data = payload[0].payload;
      return (
        <div className={css.tooltip}>
          <h4 className={css.tooltipLabel}>{data.name}</h4>
          <p className={css.tooltipValue}>
            Questions: <span>{data.value}</span>
          </p>
          <p className={css.tooltipPercentage}>
            {((data.value / data.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h3 className={css.chartTitle}>Questions by Difficulty</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
          >
            {dataWithTotal.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DifficultyChart;

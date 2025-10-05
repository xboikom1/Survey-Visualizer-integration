import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import css from "./CategoryChart.module.css";
import { decodeHtml } from "../../utils/decodeHtml";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
  "#8DD1E1",
  "#D084D0",
];

const CategoryChart = ({ data }) => {
  const customTooltip = (props) => {
    const { active, payload, label } = props;
    if (active) {
      const value = payload[0].value;
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((value / total) * 100).toFixed(1);

      return (
        <div className={css.tooltip}>
          <h4 className={css.tooltipLabel}>{decodeHtml(label)}</h4>
          <p className={css.tooltipValue}>
            Questions: <span>{value}</span>
          </p>
          <p className={css.tooltipPercentage}>{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h3 className={css.chartTitle}>Questions by Category</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 60,
          }}
          barSize={30}
        >
          <CartesianGrid stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
            tickFormatter={(tick) => decodeHtml(tick)}
          />
          <YAxis
            label={{
              value: "Number of Questions",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip content={customTooltip} />
          <Bar dataKey="value" name="Number of Questions" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryChart;

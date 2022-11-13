import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const renderCustomizedLabel = ({ percent, name }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

let Chart = ({
  data = [],
  innerRadius = "0",
  outerRadius = "80%",
  paddingAngle = 0,
  dataKey = "value",
  nameKey = "name",
  startAngle = 0,
  endAngle = 360,
  fill = "#8884d8",
  aspect = 1,
  renderLabel = true,
  colors = COLORS
}) => {
  return (
    <ResponsiveContainer width="100%" aspect={aspect}>
      <PieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={fill}
          paddingAngle={paddingAngle}
          dataKey={dataKey}
          label={renderLabel && renderCustomizedLabel}
          startAngle={startAngle}
          endAngle={endAngle}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;

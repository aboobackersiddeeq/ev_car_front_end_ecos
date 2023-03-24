import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  YAxis,
  XAxis,
  CartesianGrid,
} from "recharts";
const Chart = () => {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 400 },
    { name: "Group F", value: 300 },
    { name: "Group G", value: 300 },
    { name: "Group D", value: 200 },
  ];
  return (
    <div style={{ textAlign: "center" }}>
      <div className="chart charts">
        <PieChart   width={400} height={400}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="red"
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data01}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2DD4BF" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>

        
      </div>
    </div>
  );
};
export default Chart;
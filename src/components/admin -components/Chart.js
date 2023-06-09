import axios from '../../axios/axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
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
  Cell,
  Line,
  LineChart,
} from 'recharts';
const Chart = (props) => {
  const [data, setData] = useState({});
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    try {
      axios
        .get('/admin/get-chart', {
          headers: {
            'x-access-admintoken': localStorage.getItem('admintoken'),
          },
        })
        .then((response) => {
          if (response.data.status === 'success') {
            setData(response.data.result);
            setRevenue(response.data.revenue);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="chart  mt-4 row">
        <div className=" col-md-6">
          <h5 className="mb-5"> Revenue Generated</h5>
          <PieChart width={400} height={300}>
            {props.change ? (
              <Pie
                nameKey="_id"
                data={revenue}
                dataKey="total"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#2DD4BF"
              />
            ) : (
              <Pie
                data={revenue}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {revenue &&
                  revenue.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
            )}
            <Tooltip />
          </PieChart>
        </div>
        <div className="  col-md-6">
          {props.change ? (
            <>
              <h5 className="mb-5"> Booking & Test Drive Booking</h5>
              <BarChart
                width={450}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="booking" fill="#2DD4BF" />
                <Bar dataKey="testDrive" fill="#82ca9d" />
              </BarChart>
            </>
          ) : (
            <>
              <h5 className="mb-5"> Booking & Test Drive Booking</h5>
              <LineChart
                width={450}
                height={290}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="booking" stroke="#8884d8" />
                <Line type="monotone" dataKey="testDrive" stroke="#82ca9d" />
              </LineChart>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Chart;

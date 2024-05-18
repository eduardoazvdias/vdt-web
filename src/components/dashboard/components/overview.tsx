"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Text, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const data = [
  { name: "Petrobras", value: 30 },
  { name: "Vale", value: 25 },
  { name: "Itaú Unibanco", value: 15 },
  { name: "Ambev", value: 10 },
  { name: "Bradesco", value: 8 },
  { name: "Magazine Luiza", value: 7 },
  { name: "B3", value: 5 }
];

const capitalData = [
  { month: "Jan", capital: 200 },
  { month: "Feb", capital: 220 },
  { month: "Mar", capital: 230 },
  { month: "Apr", capital: 250 },
  { month: "May", capital: 270 },
  { month: "Jun", capital: 300 },
];

const maxData = [data.reduce((max, item) => item.value > max.value ? item : max, data[0])];
const minData = [data.reduce((min, item) => item.value < min.value ? item : min, data[0])];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <Text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="semiBold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </Text>
  );
};

export function Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '90%', height: 430, margin: 'auto', gap: 250 }}>
      <div style={{ width: '20%' }}>
        <span className="text-1xl font-bold tracking-tight">Capital Investido</span>
        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <span className="text-1xl font-bold tracking-tight">Maior Posição</span>
        <ResponsiveContainer width="100%" height="20%">
          <BarChart layout="vertical" data={maxData}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <span className="text-1xl font-bold tracking-tight">Menor Posição</span>
        <ResponsiveContainer width="100%" height="20%">
          <BarChart layout="vertical" data={minData}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '70%' }}>
        <span className="text-1xl font-bold tracking-tight">Evolução do Capital</span>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={capitalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="capital" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

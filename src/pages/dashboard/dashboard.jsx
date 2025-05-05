import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { IconButton, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ArrowUpward, DarkMode, LightMode } from "@mui/icons-material";
import { useState, useEffect } from "react";

const salesData = [
  { name: "Jan", sales: 20 },
  { name: "Feb", sales: 30 },
  { name: "Mar", sales: 45 },
  { name: "Apr", sales: 50 },
  { name: "May", sales: 80 },
  { name: "Jun", sales: 70 },
  { name: "Jul", sales: 90 },
  { name: "Aug", sales: 85 },
  { name: "Sep", sales: 60 },
  { name: "Oct", sales: 70 },
  { name: "Nov", sales: 75 },
  { name: "Dec", sales: 65 },
];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white max-[638px]:p-3">
      <div className="flex justify-between items-center mb-4 max-[638px]:flex-col max-[638px]:items-start">
        <h1 className="text-2xl font-semibold max-[638px]:text-lg">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 max-[638px]:grid-cols-1">
        <div className="p-4 rounded-lg shadow-md bg-red-400 dark:bg-gray-800">
          <p>Sales</p>
          <h2 className="text-xl font-bold">$152k</h2>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-yellow-400 dark:bg-gray-800">
          <p>Cost</p>
          <h2 className="text-xl font-bold">$99.7k</h2>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-green-400 dark:bg-gray-800">
          <p>Profit</p>
          <h2 className="text-xl font-bold">$32.1k</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 max-[638px]:grid-cols-1">
        <div className="col-span-2 p-4 rounded-lg shadow-md bg-white dark:bg-gray-900 max-[638px]:col-span-1">
          <h2 className="text-lg font-semibold mb-2 max-[638px]:text-base">Sales Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-2 max-[638px]:text-base">Top Selling Products</h2>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-gray-300 dark:border-gray-700 max-[638px]:text-sm">
              <p>Healthcare Erbiology</p>
              <span className="text-green-600 dark:text-green-400">12,153 sales</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

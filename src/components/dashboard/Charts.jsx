import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#AA66CC", "#FF4444"];

const Charts = ({ transactions }) => {
  // Total income and expenses
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Pie data for income vs expense
  const summaryData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  // Pie data for expenses by category
  const categoryMap = {};
  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
    }
  });
  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // Group by date for line chart trend
  const groupedByDate = transactions.reduce((acc, tx) => {
    const date = tx.date;
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }
    acc[date][tx.type] += tx.amount;
    return acc;
  }, {});
  const lineData = Object.values(groupedByDate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Income vs Expense Pie Chart */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Income vs Expense
        </h3>
        <PieChart width={300} height={300}>
          <Pie
            data={summaryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {summaryData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </div>

      {/* Expense by Category Pie Chart */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Expense by Category
        </h3>
        {categoryData.length > 0 ? (
          <PieChart width={300} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        ) : (
          <p className="text-center text-gray-500 mt-20">No expense data available.</p>
        )}
      </div>

      {/* Income & Expense Trend Line Chart */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          Income & Expense Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#FF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;

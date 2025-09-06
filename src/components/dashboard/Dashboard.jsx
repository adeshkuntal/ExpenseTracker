import { useState } from "react";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import Charts from "./Charts";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(1000); // Default budget ₹1000

  const addTransaction = (tx) => {
    setTransactions([...transactions, tx]);
  };

  // Calculate total expense
  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Dashboard</h2>

      {/* Budget Setter */}
      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
        <label className="block font-semibold mb-2 text-blue-700">
          Set Monthly Budget (₹)
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Budget Warning */}
      {totalExpense > budget && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded-md font-semibold shadow">
          ⚠️ Warning: You’ve exceeded your budget limit of ₹{budget}!
        </div>
      )}

      <AddTransaction addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
      <Charts transactions={transactions} />
    </div>
  );
};

export default Dashboard;

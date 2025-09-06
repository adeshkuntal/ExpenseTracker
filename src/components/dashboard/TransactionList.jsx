import { useState } from "react";

const TransactionList = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const query = searchTerm.toLowerCase();
    return (
      tx.category.toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query) ||
      tx.amount.toString().includes(query)
    );
  });

  return (
    <div className="mt-4 bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Transactions</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by category, type, or amount..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <ul>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx, index) => (
            <li
              key={index}
              className="mb-2 p-2 border rounded-md shadow-sm text-sm bg-gray-50"
            >
              <span className="font-semibold">{tx.date}</span> -{" "}
              <span className="uppercase text-blue-600">{tx.type}</span> - ₹
              {tx.amount} ({tx.category})
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No matching transactions.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

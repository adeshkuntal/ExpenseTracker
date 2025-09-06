import { useState } from "react";

const AddTransaction = ({ addTransaction }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return alert("Please fill all fields");

    addTransaction({
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    });

    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded-xl mb-6 flex flex-col sm:flex-row gap-4 items-center"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-3 py-2 rounded-md w-full sm:w-auto"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border px-3 py-2 rounded-md w-full sm:w-auto"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded-md w-full sm:w-auto"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
      >
        Add
      </button>
    </form>
  );
};

export default AddTransaction;

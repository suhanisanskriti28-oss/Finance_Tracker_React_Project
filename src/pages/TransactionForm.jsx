import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

export default function TransactionForm() {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const categories = [
    "Food",
    "Travel",
    "Rent",
    "Shopping",
    "Salary",
    "Utilities",
    "Entertainment",
    "Health",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) return;

    addTransaction({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
      notes: formData.notes,
    });

    navigate("/transactions");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          New Transaction
        </h2>
        <p className="text-zinc-400 mt-2">Add a new income or expense record.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
        
        {/* Type Toggle */}
        <div className="flex bg-zinc-950 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: "expense" }))}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              formData.type === "expense" ? "bg-zinc-800 text-orange-500 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: "income" }))}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              formData.type === "income" ? "bg-zinc-800 text-emerald-500 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Income
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 transition-colors"
              placeholder="e.g. Groceries"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 transition-colors"
              placeholder="0.00"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 outline-none focus:border-orange-500 transition-colors resize-none"
            placeholder="Add any extra details here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-3 rounded-lg shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}

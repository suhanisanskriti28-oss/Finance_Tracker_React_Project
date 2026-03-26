import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionCard from "../components/TransactionCard";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export default function TransactionList() {
  const { transactions } = useFinance();

  // Search, Filter, Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique categories dynamically from current transactions list
  const allCategories = ["All", ...new Set(transactions.map((t) => t.category))];

  // Process data for viewing
  let displayedTransactions = [...transactions];

  // 1. Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayedTransactions = displayedTransactions.filter(
      (t) => t.title.toLowerCase().includes(q) || (t.notes && t.notes.toLowerCase().includes(q))
    );
  }

  // 2. Filter Category
  if (categoryFilter !== "All") {
    displayedTransactions = displayedTransactions.filter((t) => t.category === categoryFilter);
  }

  // 3. Filter Type
  if (typeFilter !== "All") {
    displayedTransactions = displayedTransactions.filter((t) => t.type === typeFilter);
  }

  // 4. Sort
  displayedTransactions.sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Transactions
        </h2>
        <p className="text-zinc-400 mt-2">Manage your financial history.</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search by title or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type Filter */}
          <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800">
            <Filter size={16} className="text-zinc-500" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800">
            <Filter size={16} className="text-zinc-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer"
            >
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800">
            <ArrowUpDown size={16} className="text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayedTransactions.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-md border border-white/10 border-dashed rounded-xl">
            <p className="text-zinc-500">No transactions found.</p>
          </div>
        ) : (
          displayedTransactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))
        )}
      </div>

    </div>
  );
}

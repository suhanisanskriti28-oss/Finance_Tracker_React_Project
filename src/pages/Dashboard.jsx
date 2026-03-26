import { useFinance } from "../context/FinanceContext";
import BudgetCard from "../components/BudgetCard";
import { Wallet2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function Dashboard() {
  const { transactions } = useFinance();

  // Basic Analytics
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-zinc-400 mt-2">Welcome back. Here is your financial overview.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Net Balance */}
        <div className="bg-black/30 backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold text-zinc-100">
                ₹{netBalance.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-zinc-800 rounded-lg text-orange-500">
              <Wallet2 size={24} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        </div>

        {/* Total Income */}
        <div className="bg-black/30 backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Total Income</p>
              <h3 className="text-3xl font-bold text-zinc-100">
                ₹{totalIncome.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-zinc-800 rounded-lg text-emerald-500">
              <ArrowUpCircle size={24} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        </div>

        {/* Total Expense */}
        <div className="bg-black/30 backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Total Expense</p>
              <h3 className="text-3xl font-bold text-zinc-100">
                ₹{totalExpense.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-zinc-800 rounded-lg text-red-500">
              <ArrowDownCircle size={24} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Budget Tracker */}
        <div>
          <BudgetCard />
        </div>

        {/* Quick Recent Transactions (Optional Extra for Dashboard) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <p className="text-zinc-400 mb-2">Want to see all activities?</p>
          <a href="/transactions" className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
            View Transactions →
          </a>
        </div>
      </div>
      
    </div>
  );
}

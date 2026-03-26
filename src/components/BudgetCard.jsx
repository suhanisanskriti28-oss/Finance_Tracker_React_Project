import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Edit2, Check } from "lucide-react";

export default function BudgetCard() {
  const { transactions, budget, setBudget } = useFinance();
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget);

  // Calculate this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      return (
        t.type === "expense" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const remainingBudget = budget - monthlyExpenses;
  const percentageUsed = budget > 0 ? (monthlyExpenses / budget) * 100 : 0;
  
  // Make sure progress bar doesn't exceed 100 for visual reasons, but keep logic accurate
  const progressWidth = Math.min(percentageUsed, 100);

  // Determine color based on usage
  let progressColor = "bg-emerald-500";
  if (percentageUsed > 80) progressColor = "bg-red-500";
  else if (percentageUsed > 50) progressColor = "bg-orange-500";

  const handleSaveBudget = () => {
    setBudget(Number(tempBudget));
    setIsEditing(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-zinc-100">Monthly Budget</h3>
        
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 outline-none focus:border-orange-500 w-24 text-sm"
              autoFocus
            />
            <button onClick={handleSaveBudget} className="text-emerald-500 hover:text-emerald-400 p-1">
              <Check size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
            <span className="text-zinc-400 text-sm">₹{budget.toLocaleString()}</span>
            <button className="text-zinc-600 group-hover:text-orange-400 p-1 transition-colors">
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-950 rounded-full h-3 mb-4 overflow-hidden border border-zinc-800">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <p className="text-zinc-500 mb-1">Spent</p>
          <p className="font-medium text-zinc-200">₹{monthlyExpenses.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 mb-1">Remaining</p>
          <p className={`font-medium ${remainingBudget < 0 ? "text-red-500" : "text-emerald-500"}`}>
            ₹{remainingBudget.toLocaleString()}
          </p>
        </div>
      </div>
      
      <p className="text-xs text-zinc-500 text-center mt-6">
        {percentageUsed.toFixed(1)}% of monthly budget used
      </p>

    </div>
  );
}

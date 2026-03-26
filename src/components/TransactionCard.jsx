import { useFinance } from "../context/FinanceContext";
import { Trash2 } from "lucide-react";

export default function TransactionCard({ transaction }) {
  const { deleteTransaction } = useFinance();

  const isIncome = transaction.type === "income";

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/20 transition-colors group">
      <div className="flex flex-col">
        <h3 className="font-semibold text-zinc-100 text-lg">
          {transaction.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-zinc-400 mt-1">
          <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs font-medium">
            {transaction.category}
          </span>
          <span>{new Date(transaction.date).toLocaleDateString()}</span>
        </div>
        {transaction.notes && (
          <p className="text-sm text-zinc-500 mt-2 italic">{transaction.notes}</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <span
          className={`font-bold text-lg ${
            isIncome ? "text-emerald-500" : "text-orange-500"
          }`}
        >
          {isIncome ? "+" : "-"}₹{transaction.amount.toLocaleString()}
        </span>
        
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="text-zinc-600 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Transaction"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

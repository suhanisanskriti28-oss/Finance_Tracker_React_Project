import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // Try to load from localStorage first or start with empty defaults
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fintrack_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const savedCode = localStorage.getItem("fintrack_budget");
    return savedCode ? Number(savedCode) : 50000; // Default example budget: ₹50,000
  });

  // Whenever transactions change, save them immediately
  useEffect(() => {
    localStorage.setItem("fintrack_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Whenever budget changes, save it
  useEffect(() => {
    localStorage.setItem("fintrack_budget", budget.toString());
  }, [budget]);

  // Add functionality
  const addTransaction = (newTransaction) => {
    // We add an id, and save it to the beginning of the list
    const transactionToSave = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [transactionToSave, ...prev]);
  };

  // Delete functionality (Placeholder for step 7)
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };
  
  // Store values inside context so any component can read them
  const values = {
    transactions,
    budget,
    setBudget,
    addTransaction,
    deleteTransaction,
  };

  return (
    <FinanceContext.Provider value={values}>
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook to easily use this context
export function useFinance() {
  return useContext(FinanceContext);
}

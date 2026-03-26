import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TransactionList from "./pages/TransactionList";
import TransactionForm from "./pages/TransactionForm";
import Landing from "./pages/Landing";
import { FinanceProvider } from "./context/FinanceContext";

function AppLayout() {
  return (
    <div className="relative flex bg-[#050505] min-h-screen text-zinc-100 font-sans overflow-hidden">
      
      {/* Ambient Orange Background Glows */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-orange-600/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-orange-700/20 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0"></div>

      {/* Foreground App Wrapper */}
      <div className="relative z-10 flex w-full h-screen">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/transactions/new" element={<TransactionForm />} />
          </Route>
        </Routes>
      </Router>
    </FinanceProvider>
  );
}

export default App;

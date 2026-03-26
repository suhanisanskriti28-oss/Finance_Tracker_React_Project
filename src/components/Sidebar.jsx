import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, FilePlus } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/transactions", icon: Receipt, label: "All Transactions", end: true },
    { to: "/transactions/new", icon: FilePlus, label: "Add Transaction" },
  ];

  return (
    <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 h-screen flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Track Your Money
        </h1>
        <p className="text-sm text-zinc-400 mt-1">Expense Analytics</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-500/10 text-orange-500 shadow-[inset_2px_0_0_0_#f97316]"
                  : "text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/50"
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 text-center">Premium Finance App</p>
      </div>
    </aside>
  );
}

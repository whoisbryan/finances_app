import { useState, useEffect } from "react";
import {
  FaWallet,
  FaCreditCard,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaHandHoldingUsd,
  FaPiggyBank,
  FaCog,
  FaSignOutAlt,
  FaMoon,
  FaSun
} from "react-icons/fa";

import Card from "../components/Card";

function Home() {
  const userName = "Bryan";

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const transactions = [
    { id: 1, date: "2025-04-26", description: "Salary", amount: 5000, source: "Main Bank Account" },
    { id: 2, date: "2025-04-25", description: "Grocery Shopping", amount: -200, source: "BBVA Credit Card" },
    { id: 3, date: "2025-04-24", description: "Credit Card Payment", amount: -800, source: "BBVA Credit Card" },
    { id: 4, date: "2025-04-23", description: "Stock Dividend", amount: 150, source: "Investment Portfolio" },
    { id: 5, date: "2025-04-22", description: "Restaurant", amount: -100, source: "Main Bank Account" },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`min-h-screen w-full p-8 transition-colors duration-500 ${theme === "dark" ? "bg-neutral-900 text-neutral-100" : "bg-gray-50 text-gray-800"}`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>

        <div className="flex items-center space-x-6">
          {/* Settings */}
          <div className="relative group">
            <button
              onClick={handleSettings}
              className="text-current focus:outline-none transition-all transform group-hover:scale-125 group-hover:text-blue-400"
            >
              <FaCog size={24} />
            </button>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-700 text-xs text-neutral-200 py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Settings
            </span>
          </div>

          {/* Toggle Theme */}
          <div className="relative group">
            <button
              onClick={toggleTheme}
              className="text-current focus:outline-none transition-all transform group-hover:scale-125 group-hover:text-yellow-400"
            >
              {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-700 text-xs text-neutral-200 py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </div>

          {/* Logout */}
          <div className="relative group">
            <button
              onClick={handleLogout}
              className="text-current focus:outline-none transition-all transform group-hover:scale-125 group-hover:text-red-400"
            >
              <FaSignOutAlt size={24} />
            </button>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-neutral-700 text-xs text-neutral-200 py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Log Out
            </span>
          </div>
        </div>
      </div>

      {/* Grid de tarjetas financieras */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <Card theme={theme} icon={<FaWallet size={40} />} title="Accounts" amount="$25,000" />
        <Card theme={theme} icon={<FaCreditCard size={40} />} title="Credit Cards" amount="$3,200" />
        <Card theme={theme} icon={<FaMoneyBillWave size={40} />} title="Debt" amount="$1,500" />
        <Card theme={theme} icon={<FaMoneyCheckAlt size={40} />} title="Income" amount="$8,000" />
        <Card theme={theme} icon={<FaHandHoldingUsd size={40} />} title="Expenses" amount="$5,000" />
        <Card theme={theme} icon={<FaPiggyBank size={40} />} title="Savings" amount="$3,000" />
      </div>

      {/* Sección de transacciones recientes */}
      <div className={`mt-10 p-6 rounded-2xl shadow-lg transition-colors duration-500 ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Transactions</h2>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`flex justify-between items-center border-b pb-2 transition-colors duration-500 ${theme === "dark" ? "border-neutral-700" : "border-gray-200"}`}
            >
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-neutral-400" : "text-gray-500"}`}>{tx.date}</p>
                <p className="text-lg font-semibold">{tx.description}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${theme === "dark" ? "bg-neutral-700 text-neutral-300" : "bg-gray-200 text-gray-700"}`}>
                  {tx.source}
                </span>
              </div>
              <div className={`text-lg font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                {tx.amount > 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;

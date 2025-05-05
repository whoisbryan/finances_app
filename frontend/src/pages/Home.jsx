import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaWallet,
  FaCreditCard,
  FaMoneyCheckAlt,
  FaCog,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaPlus,
  FaBars,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import Card from "../components/Card";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Home() {
  const { user } = useAuth();

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [showModal, setShowModal] = useState(false);
  const [movementType, setMovementType] = useState("income");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const transactions = [
    { id: 1, date: "2025-04-26", description: "Salary", amount: 5000, source: "Main Bank Account" },
    { id: 2, date: "2025-04-25", description: "Grocery Shopping", amount: -200, source: "BBVA Credit Card" },
    { id: 3, date: "2025-04-24", description: "Credit Card Payment", amount: -800, source: "BBVA Credit Card" },
    { id: 4, date: "2025-04-23", description: "Stock Dividend", amount: 150, source: "Investment Portfolio" },
    { id: 5, date: "2025-04-22", description: "Restaurant", amount: -100, source: "Main Bank Account" }
  ];

  const income = transactions.filter(tx => tx.amount > 0 && new Date(tx.date).getMonth() === selectedMonth).reduce((acc, tx) => acc + tx.amount, 0);
  const expenses = transactions.filter(tx => tx.amount < 0 && new Date(tx.date).getMonth() === selectedMonth).reduce((acc, tx) => acc + tx.amount, 0);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const handleSettings = () => console.log("Opening settings...");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleRegisterMovement = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const changeMonth = (dir) => setSelectedMonth(prev => (prev + dir + 12) % 12);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${theme === "dark" ? "bg-neutral-900 text-neutral-100" : "bg-gray-50 text-gray-800"}`}>

      {/* Modern Navbar */}
      <header className="sticky top-0 z-40 w-full bg-inherit shadow-md px-4 py-3 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-indigo-400" size={24} />
          <span className="text-lg font-bold">Welcome back, {user?.username || "Guest"}!</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowMenu(!showMenu)} className="block md:hidden">
            <FaBars size={20} />
          </button>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={handleSettings} title="Settings" className="hover:text-blue-400"><FaCog /></button>
            <button onClick={toggleTheme} title="Toggle Theme" className="hover:text-yellow-400">{theme === "dark" ? <FaSun /> : <FaMoon />}</button>
            <button onClick={handleLogout} title="Logout" className="hover:text-red-400"><FaSignOutAlt /></button>
          </div>
        </div>
      </header>

      {showMenu && (
        <div className="md:hidden px-4 py-2 space-y-2 animate-fade-in-up">
          <button onClick={handleSettings} className="w-full py-2 text-left rounded-md bg-neutral-800 text-neutral-100 hover:bg-neutral-700">Settings</button>
          <button onClick={toggleTheme} className="w-full py-2 text-left rounded-md bg-neutral-800 text-neutral-100 hover:bg-neutral-700">Toggle {theme === "dark" ? "Light" : "Dark"} Mode</button>
          <button onClick={handleLogout} className="w-full py-2 text-left rounded-md bg-red-600 text-white hover:bg-red-500">Log Out</button>
        </div>
      )}

      {/* Month and Overview */}
      <div className="text-center mt-6 mb-10">
        <div className="flex justify-center items-center gap-4 mb-3">
          <button onClick={() => changeMonth(-1)}><FaChevronLeft /></button>
          <h2 className="text-2xl md:text-3xl font-bold">{months[selectedMonth]}</h2>
          <button onClick={() => changeMonth(1)}><FaChevronRight /></button>
        </div>
        <div className="flex justify-center gap-10 text-lg md:text-xl font-medium">
          <span className="text-green-400">💰 Income: ${income}</span>
          <span className="text-red-400">💸 Expenses: ${Math.abs(expenses)}</span>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full overflow-x-auto md:overflow-visible mb-10 px-4">
        <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 w-max md:w-full snap-x snap-mandatory">
          <div className="shrink-0 w-64 md:w-full snap-center">
            <Card theme={theme} icon={<FaWallet size={36} className="text-blue-400" />} title="Accounts" amount="$25,000" />
          </div>
          <div className="shrink-0 w-64 md:w-full snap-center">
            <Card theme={theme} icon={<FaCreditCard size={36} className="text-purple-400" />} title="Credit Cards" amount="$3,200" />
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className={`mx-4 md:mx-8 p-4 md:p-6 rounded-2xl shadow-lg transition-colors duration-500 ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className={`flex justify-between items-center border-b pb-2 ${theme === "dark" ? "border-neutral-700" : "border-gray-200"}`}>
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-neutral-400" : "text-gray-500"}`}>{tx.date}</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  {tx.source.includes("Credit Card") ? <FaCreditCard size={14} /> : <FaWallet size={14} />}
                  {tx.description}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${theme === "dark" ? "bg-neutral-700 text-neutral-300" : "bg-gray-200 text-gray-700"}`}>{tx.source}</span>
              </div>
              <div className={`text-lg font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>{tx.amount > 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleRegisterMovement}
        className="fixed bottom-4 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 bg-indigo-600 hover:bg-indigo-700 text-white p-4 md:p-5 rounded-full shadow-xl transition-transform transform hover:scale-110 z-50 flex items-center justify-center"
        title="Add Movement"
      >
        <FaPlus size={20} className="md:size-6" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md animate-fade-in shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-semibold">Register Movement</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-red-400">✕</button>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
              {["income", "expense", "credit"].map((type) => (
                <button
                  key={type}
                  onClick={() => setMovementType(type)}
                  className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${movementType === type ? "bg-indigo-500 text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200"}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <form className="space-y-4">
              <input className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-700 text-sm text-black dark:text-white" placeholder="Description" />
              <input className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-700 text-sm text-black dark:text-white" placeholder="Amount" type="number" />
              <input className="w-full px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-700 text-sm text-black dark:text-white" placeholder="Source" />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold">Save Movement</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

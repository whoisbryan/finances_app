function Card({ icon, title, amount, theme }) {
    return (
      <div className={`p-6 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-transform duration-300 
        ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}>
        <div className="text-indigo-400 mb-4">{icon}</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-2xl font-bold">{amount}</p>
      </div>
    );
  }
  
  export default Card;
  
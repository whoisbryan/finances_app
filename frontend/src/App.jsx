import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />

        {/* Página de registro */}
        <Route path="/register" element={<Register theme={theme} />} />

        {/* Página principal (dashboard) */}
        <Route path="/home" element={<Home theme={theme} />} />

        {/* Redirección automática */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

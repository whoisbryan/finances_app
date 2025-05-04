import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página de login */}
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />

          {/* Página de registro */}
          <Route path="/register" element={<Register theme={theme} />} />

          {/* Página principal protegida */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home theme={theme} />
              </PrivateRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

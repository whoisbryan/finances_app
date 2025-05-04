import { useState } from "react";
import { FaPiggyBank } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/login";
import { useAuth } from "../context/AuthContext";



function Login({ theme, setTheme }) {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await loginUser({
                username,
                password,
              });
              
              login(data); // guardamos en contexto + localStorage
              navigate("/home");
              
        } catch (err) {
            setError(err.message || "Error en login");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-gradient-animated">
            {/* Sección izquierda: Branding */}
            <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex w-1/2 bg-neutral-800 flex-col justify-center items-center text-neutral-100 p-10"
            >
                <FaPiggyBank size={80} className="mb-6 text-indigo-400" />
                <h1 className="text-4xl font-bold mb-4 text-center">Welcome!</h1>
                <p className="text-center text-lg">Manage your finances smartly and simply.</p>
            </motion.div>

            {/* Sección derecha: Formulario */}
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex w-full md:w-1/2 justify-center items-center bg-neutral-900"
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-neutral-800 p-10 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center text-neutral-100 mb-8">
                        Sign In
                    </h2>

                    <div className="mb-5">
                        <label className="block text-neutral-200 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100 transition duration-200"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="jonhdoe"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-neutral-200 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100 transition duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}


                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-400">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-indigo-400 hover:text-indigo-500 font-semibold transition-colors"
                            >
                                Create one
                            </a>
                        </p>
                    </div>


                </form>
            </motion.div>
        </div>
    );
}

export default Login;

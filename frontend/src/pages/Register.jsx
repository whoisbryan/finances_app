import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/register";



function Register({ theme }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser({
        username: name,
        email,
        password,
      });

      setSuccess(`User created!`);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration error");
      setLoading(false);
    }
  };



  return (
    <div className={`flex min-h-screen w-full overflow-hidden ${theme === "dark" ? "bg-neutral-900 text-neutral-100" : "bg-gray-50 text-gray-800"}`}>

      {/* Sección izquierda: Branding */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 bg-neutral-800">
        <FaUserPlus size={80} className="mb-6 text-indigo-400" />
        <h1 className="text-4xl font-bold mb-4 text-center">Join Us</h1>
        <p className="text-center text-lg">Create your account and start managing your finances smartly.</p>
      </div>

      {/* Sección derecha: Formulario */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-neutral-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

          {/* Nombre */}
          <div className="mb-5">
            <label className="block text-neutral-200 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-neutral-200 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-neutral-200 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-neutral-200 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 mt-2 border border-neutral-600 focus:border-indigo-500 focus:bg-neutral-600 focus:outline-none text-neutral-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>

          {error && (
            <div className="mt-4 w-full bg-red-500/10 text-red-400 border border-red-400 rounded-lg px-4 py-3 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 w-full bg-green-500/10 text-green-400 border border-green-400 rounded-lg px-4 py-3 text-sm font-medium animate-fade-in">
              {success}
            </div>
          )}



          {/* Link para volver a login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-400 hover:text-indigo-500 font-semibold transition-colors"
              >
                Log in
              </a>
            </p>
          </div>

        </form>
      </div>

    </div>
  );
}

export default Register;

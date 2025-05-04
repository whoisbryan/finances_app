const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function loginUser({ username, password }) {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login fallido");
  }

  return response.json();
}

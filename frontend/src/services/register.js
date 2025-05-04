const API_BASE_URL = "http://localhost:8000";

export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registro fallido");
  }

  return response.json();
}

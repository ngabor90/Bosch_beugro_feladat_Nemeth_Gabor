import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ha már van érvényes token a localStorage-ban, akkor átirányítjuk a dashboard-ra
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Először kérjük le a CSRF cookie-t
      await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });

      // Bejelentkezési kérelem
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true } // Küldd el a hitelesítő cookie-kat
      );

      const { message: loginMessage, token } = response.data;
      setMessage(loginMessage);

      if (loginMessage === "Login successful" && token) {
        // 💾 Token mentése
        localStorage.setItem("auth_token", token);

        // 🔐 Authorization header beállítása
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error", error);
        setMessage(error.response?.data.message || "Hiba történt a bejelentkezés során.");
      } else {
        console.error("Non-Axios error", error);
        setMessage("Ismeretlen hiba történt.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="login-container p-4 border rounded shadow-sm bg-white w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Bejelentkezés</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label"><FontAwesomeIcon className="mx-2" icon={faEnvelope} /> Email: </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"><FontAwesomeIcon className="mx-2" icon={faLock} />Jelszó:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Bejelentkezés
          </button>
        </form>
        {message && (
          <div className="mt-3">
            <p
              className={`alert ${message === "Login successful"
                ? "alert-success"
                : "alert-danger"
                }`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;

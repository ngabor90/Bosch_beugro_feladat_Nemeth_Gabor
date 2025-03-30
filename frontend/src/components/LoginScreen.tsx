import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login", 
        { email, password }
      );

      setMessage(response.data.message);

      // Ha sikeres a bejelentkezés
      if (response.data.message === 'Login successful') {
        navigate("/dashboard"); // Átirányítás a dashboard-ra
      }
    } catch (error: unknown) { // Hiba típusának explicit megadása
      if (axios.isAxiosError(error)) { // Ellenőrizzük, hogy axios hiba-e
        setMessage(error.response?.data.message || "Hiba történt a bejelentkezés során.");
      } else {
        setMessage("Ismeretlen hiba történt.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-container p-4 border rounded shadow-sm bg-white w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Bejelentkezés</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Jelszó:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Bejelentkezés</button>
        </form>
        {message && (
          <div className="mt-3">
            <p className={`alert ${message === 'Login successful' ? 'alert-success' : 'alert-danger'}`}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;

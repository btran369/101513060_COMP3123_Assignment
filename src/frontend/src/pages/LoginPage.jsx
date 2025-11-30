import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = identifier.includes("@")
        ? { email: identifier, password }
        : { username: identifier, password };

      const res = await api.post("/user/login", payload);
      const token = res.data.jwt_token;
      if (token) {
        login(token);
      }
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email or Username</label>
          <input
            className="form-control"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

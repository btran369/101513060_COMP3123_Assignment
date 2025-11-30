import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
  <div>
    <Link to="/employees">Employee Portal</Link>
  </div>

  <div>
    {!isAuthenticated && (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    )}

    {isAuthenticated && (
      <>
        <Link to="/employees">Employees</Link>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </>
    )}
  </div>
</nav>

  );
}

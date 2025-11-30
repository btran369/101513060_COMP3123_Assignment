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
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/employees">
          Employee Portal
        </Link>
        <div className="navbar-nav ms-auto">
          {!isAuthenticated && (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link className="nav-link" to="/employees">
                Employees
              </Link>
              <button
                className="btn btn-sm btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

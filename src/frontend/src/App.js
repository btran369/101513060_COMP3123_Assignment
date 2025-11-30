import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/new"
          element={
            <PrivateRoute>
              <EmployeeFormPage mode="create" />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id/edit"
          element={
            <PrivateRoute>
              <EmployeeFormPage mode="edit" />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}



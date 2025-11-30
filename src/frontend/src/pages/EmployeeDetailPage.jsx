import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosClient";

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/emp/employees/${id}`)
      .then((res) => setEmp(res.data))
      .catch(() => setError("Failed to load employee"));
  }, [id]);

  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!emp) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <Link to="/employees" className="btn btn-link mb-3">
        &larr; Back to list
      </Link>

      <div className="card">
        <div className="card-body">
          {emp.profile_picture_url && (
            <div className="mb-3 text-center">
              <img
                src={emp.profile_picture_url}
                alt="profile"
                style={{ width: 80, height: 80, borderRadius: "50%" }}
              />
            </div>
          )}
          <h4 className="card-title">
            {emp.first_name} {emp.last_name}
          </h4>
          <p className="card-text mb-1">
            <strong>Email:</strong> {emp.email}
          </p>
          <p className="card-text mb-1">
            <strong>Department:</strong> {emp.department}
          </p>
          <p className="card-text mb-1">
            <strong>Position:</strong> {emp.position}
          </p>
          <p className="card-text mb-1">
            <strong>Salary:</strong> {emp.salary}
          </p>
          <p className="card-text mb-1">
            <strong>Date of joining:</strong>{" "}
            {emp.date_of_joining?.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
}

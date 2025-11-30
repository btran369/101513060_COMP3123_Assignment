import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

// fetch all or filtered
const fetchEmployees = async (params = {}) => {
  try {
    setError("");
    const res = await api.get("/emp/employees", { params });
    setEmployees(res.data);
  } catch (err) {
    setError("Failed to load employees");
  }
};

useEffect(() => {
  fetchEmployees();        // no params -> full list
}, []);

const handleSearch = (e) => {
  e.preventDefault();

  const params = {};
  if (name.trim()) params.name = name.trim();
  if (department.trim()) params.department = department.trim();
  if (position.trim()) params.position = position.trim();

  fetchEmployees(params);
};



  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await api.delete("/emp/employees", { params: { eid: id } });
      setEmployees((prev) => prev.filter((e) => e.employee_id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="container">
        <h2 className="page-title">Employees</h2>
        <Link to="/employees/new" className="btn btn-primary">
          Add Employee
        </Link>
      </div>

<form className="row g-2 mb-3" onSubmit={handleSearch}>
  <div className="col-md-3">
    <input
      type="text"
      className="form-control"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <input
      type="text"
      className="form-control"
      placeholder="Department"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <input
      type="text"
      className="form-control"
      placeholder="Position"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
    />
  </div>
  <div className="col-md-3 d-flex gap-2">
    <button type="submit" className="btn btn-primary flex-grow-1">
      Search
    </button>
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        setName("");
        setDepartment("");
        setPosition("");
        fetchEmployees();
      }}
    >
      Clear
    </button>
  </div>
</form>


      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle employee-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employee_id}>
                <td>
                  {emp.profile_picture_url && (
                    <img
                      src={emp.profile_picture_url}
                      alt="profile"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/employees/${emp.employee_id}`}>
                    {emp.first_name} {emp.last_name}
                  </Link>
                </td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>
                  <Link
                    to={`/employees/${emp.employee_id}/edit`}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(emp.employee_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

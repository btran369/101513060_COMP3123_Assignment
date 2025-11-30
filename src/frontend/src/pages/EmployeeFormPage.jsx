import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  position: "",
  salary: "",
  date_of_joining: "",
  department: "",
};

export default function EmployeeFormPage({ mode }) {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  useEffect(() => {
    if (isEdit && id) {
      api
        .get(`/emp/employees/${id}`)
        .then((res) => {
          const emp = res.data;
          setForm({
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining?.slice(0, 10),
            department: emp.department,
          });
        })
        .catch(() => setError("Failed to load employee"));
    }
  }, [isEdit, id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (file) formData.append("profile_picture", file);

      if (isEdit) {
        await api.put(`/emp/employees/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/emp/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="page-title">
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* basic fields */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              name="first_name"
              className="form-control"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="last_name"
              className="form-control"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Position</label>
            <input
              name="position"
              className="form-control"
              value={form.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              className="form-control"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Salary</label>
            <input
              name="salary"
              type="number"
              className="form-control"
              value={form.salary}
              onChange={handleChange}
              required
              min={0}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Joining</label>
            <input
              name="date_of_joining"
              type="date"
              className="form-control"
              value={form.date_of_joining}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary" type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

import Employee from "../models/Employee.js";
import { formatEmployee } from "../utils/format.js";

// GET /api/v1/emp/employees?department=&position=
export async function listEmployees(req, res) {
  try {
    const { department, position } = req.query;

    const filter = {};

    if (department && department.trim() !== "") {
      filter.department = new RegExp(department.trim(), "i");
    }

    if (position && position.trim() !== "") {
      filter.position = new RegExp(position.trim(), "i");
    }

    const emps = await Employee.find(filter).sort({ created_at: -1 });
    const payload = emps.map(formatEmployee);
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// POST /api/v1/emp/employees  (multipart/form-data)
export async function createEmployee(req, res) {
  try {
    const data = { ...req.body };

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      data.profile_picture_url = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const emp = await Employee.create(data);

    return res.status(201).json({
      message: "Employee created successfully.",
      employee: formatEmployee(emp),
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ status: false, message: "Employee email already exists" });
    }
    return res.status(500).json({ status: false, message: err.message });
  }
}

// GET /api/v1/emp/employees/:eid
export async function getEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const emp = await Employee.findById(eid);
    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }
    return res.status(200).json(formatEmployee(emp));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// PUT /api/v1/emp/employees/:eid  (multipart/form-data)
export async function updateEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const data = { ...req.body };

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      data.profile_picture_url = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const emp = await Employee.findByIdAndUpdate(eid, data, {
      new: true,
      runValidators: true,
    });

    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee details updated successfully.",
      employee: formatEmployee(emp),
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// DELETE /api/v1/emp/employees?eid=...
export async function deleteEmployeeByQuery(req, res) {
  try {
    const { eid } = req.query;
    await Employee.findByIdAndDelete(eid);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

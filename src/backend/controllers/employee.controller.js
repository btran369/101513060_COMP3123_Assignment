import Employee from "../models/Employee.js";
import { formatEmployee } from "../utils/format.js";

export async function listEmployees(req, res) {
  try {
    const emps = await Employee.find().sort({ created_at: -1 });
    const payload = emps.map(formatEmployee);
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// GET /employees/search?department=...&position=...

export async function searchEmployees(req, res) {
  try {
    const { department, position } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (position) filter.position = position;

    const emps = await Employee.find(filter).sort({ created_at: -1 });
    const payload = emps.map(formatEmployee);
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// POST /employees
// body: JSON + optional file (handled by multer)

export async function createEmployee(req, res) {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.profile_picture_url = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.create(data);
    return res.status(201).json(formatEmployee(emp));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

//GET /employees/:eid
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

// PUT /employees/:eid

export async function updateEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const data = { ...req.body };

    if (req.file) {
      data.profile_picture_url = `/uploads/${req.file.filename}`;
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

    return res.status(200).json(formatEmployee(emp));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

// Delete: /employees?eid=...
export async function deleteEmployeeByQuery(req, res) {
  try {
    const { eid } = req.query;
    await Employee.findByIdAndDelete(eid);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

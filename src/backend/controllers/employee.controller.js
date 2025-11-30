import Employee from "../models/Employee.js";
import { formatEmployee } from "../utils/format.js";

/**
 * GET /api/v1/emp/employees
 * Optional query params:
 *  - department
 *  - position
 *  - name  (matches first_name OR last_name, case-insensitive)
 */
export async function listEmployees(req, res) {
  try {
    const { department, position, name } = req.query;

    const filter = {};

    if (department && department.trim() !== "") {
      filter.department = new RegExp(department.trim(), "i");
    }

    if (position && position.trim() !== "") {
      filter.position = new RegExp(position.trim(), "i");
    }

    if (name && name.trim() !== "") {
      const regex = new RegExp(name.trim(), "i");
      // match first_name OR last_name
      filter.$or = [{ first_name: regex }, { last_name: regex }];
    }

    const emps = await Employee.find(filter).sort({ created_at: -1 });
    const payload = emps.map(formatEmployee);

    return res.status(200).json(payload);
  } catch (err) {
    console.error("listEmployees error:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
}

/**
 * POST /api/v1/emp/employees
 * Expects multipart/form-data from EmployeeFormPage:
 *  - body fields: first_name, last_name, email, position, salary, date_of_joining, department
 *  - optional file field: profile_picture
 */
export async function createEmployee(req, res) {
  try {
    const data = { ...req.body };

    // FormData sends everything as strings; coerce where needed
    if (data.salary !== undefined && data.salary !== "") {
      data.salary = Number(data.salary);
    }
    if (data.date_of_joining) {
      data.date_of_joining = new Date(data.date_of_joining);
    }

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      data.profile_picture_url = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const emp = await Employee.create(data);

    return res.status(201).json({
      status: true,
      message: "Employee created successfully.",
      employee: formatEmployee(emp),
    });
  } catch (err) {
    console.error("createEmployee error:", err);

    // duplicate key (e.g. email)
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ status: false, message: "Employee email already exists" });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ status: false, message: err.message });
    }

    return res.status(500).json({ status: false, message: err.message });
  }
}

/**
 * GET /api/v1/emp/employees/:eid
 */
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
    console.error("getEmployeeById error:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
}

/**
 * PUT /api/v1/emp/employees/:eid
 * Same fields as create; also supports profile picture update.
 */
export async function updateEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const data = { ...req.body };

    if (data.salary !== undefined && data.salary !== "") {
      data.salary = Number(data.salary);
    }
    if (data.date_of_joining) {
      data.date_of_joining = new Date(data.date_of_joining);
    }

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
      status: true,
      message: "Employee details updated successfully.",
      employee: formatEmployee(emp),
    });
  } catch (err) {
    console.error("updateEmployeeById error:", err);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ status: false, message: err.message });
    }

    return res.status(500).json({ status: false, message: err.message });
  }
}

/**
 * DELETE /api/v1/emp/employees?eid=...
 */
export async function deleteEmployeeByQuery(req, res) {
  try {
    const { eid } = req.query;
    await Employee.findByIdAndDelete(eid);
    // Even if not found, 204 is OK (no body)
    return res.status(204).send();
  } catch (err) {
    console.error("deleteEmployeeByQuery error:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
}

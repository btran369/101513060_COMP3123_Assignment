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

export async function createEmployee(req, res) {
  try {
    const emp = await Employee.create(req.body);
    return res.status(201).json({
      message: "Employee created successfully.",
      employee_id: emp._id.toString(),
    });
  } catch (err) {
    // dupe email
    if (err?.code === 11000) {
      return res.status(409).json({ status: false, message: "Employee email already exists" });
    }
    return res.status(500).json({ status: false, message: err.message });
  }
}

export async function getEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const emp = await Employee.findById(eid);
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });
    return res.status(200).json(formatEmployee(emp));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

export async function updateEmployeeById(req, res) {
  try {
    const { eid } = req.params;
    const emp = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
    if (!emp) return res.status(404).json({ status: false, message: "Employee not found" });
    return res.status(200).json({ message: "Employee details updated successfully." });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

export async function deleteEmployeeByQuery(req, res) {
  try {
    const { eid } = req.query;
    const emp = await Employee.findByIdAndDelete(eid);
    // Even if not found, respond 204 (no body) per spec
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

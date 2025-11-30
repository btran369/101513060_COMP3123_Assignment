import { Router } from "express";
import {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeByQuery,
} from "../controllers/employee.controller.js";
import {
  validateEmployeeCreate,
  validateEmployeeUpdate,
  validateGetEmployeeById,
  validateDeleteEmployee,
} from "../middleware/validators.js";
import { optionalAuth } from "../middleware/auth.js";
import { uploadProfilePic } from "../middleware/upload.js";

const router = Router();

// GET /api/v1/emp/employees
router.get("/employees", optionalAuth, listEmployees);

// POST /api/v1/emp/employees
router.post(
  "/employees",
  optionalAuth,
  uploadProfilePic,       // parse multipart + file
  validateEmployeeCreate,
  createEmployee
);

// GET /api/v1/emp/employees/:eid
router.get(
  "/employees/:eid",
  optionalAuth,
  validateGetEmployeeById,
  getEmployeeById
);

// PUT /api/v1/emp/employees/:eid
router.put(
  "/employees/:eid",
  optionalAuth,
  uploadProfilePic,       // parse multipart + file
  validateEmployeeUpdate,
  updateEmployeeById
);

// DELETE /api/v1/emp/employees?eid=...
router.delete(
  "/employees",
  optionalAuth,
  validateDeleteEmployee,
  deleteEmployeeByQuery
);

export default router;

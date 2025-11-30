import { Router } from "express";
import {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeByQuery,
  searchEmployees,
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

// list all
router.get("/employees", optionalAuth, listEmployees);

// NEW: search by department/position
router.get("/employees/search", optionalAuth, searchEmployees);

// create with optional profile picture
router.post(
  "/employees",
  optionalAuth,
  uploadProfilePic,
  validateEmployeeCreate,
  createEmployee
);

// get by id
router.get(
  "/employees/:eid",
  optionalAuth,
  validateGetEmployeeById,
  getEmployeeById
);

// update with optional profile picture
router.put(
  "/employees/:eid",
  optionalAuth,
  uploadProfilePic,
  validateEmployeeUpdate,
  updateEmployeeById
);

// delete by eid query
router.delete(
  "/employees",
  optionalAuth,
  validateDeleteEmployee,
  deleteEmployeeByQuery
);

export default router;

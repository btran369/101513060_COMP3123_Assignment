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

router.get("/employees", optionalAuth, listEmployees);

  router.post(
  "/employees",
  optionalAuth,
  uploadProfilePic,
  validateEmployeeCreate,
  createEmployee
);

router.get(
  "/employees/:eid",
  optionalAuth,
  validateGetEmployeeById,
  getEmployeeById
);

router.put(
  "/employees/:eid",
  optionalAuth,
  uploadProfilePic,
  validateEmployeeUpdate,
  updateEmployeeById
);

router.delete(
  "/employees",
  optionalAuth,
  validateDeleteEmployee,
  deleteEmployeeByQuery
);

export default router;

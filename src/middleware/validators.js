import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

export const validateSignup = [
  body("username").isString().trim().notEmpty(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 6 }),
  handleValidation,
];

export const validateLogin = [
  body("password").isString().notEmpty(),
  body().custom(value => {
    if (!value.email && !value.username) {
      throw new Error("Provide email or username");
    }
    return true;
  }),
  handleValidation,
];

export const validateEmployeeCreate = [
  body("first_name").isString().trim().notEmpty(),
  body("last_name").isString().trim().notEmpty(),
  body("email").isEmail(),
  body("position").isString().trim().notEmpty(),
  body("salary").isNumeric(),
  body("date_of_joining").isISO8601().toDate(),
  body("department").isString().trim().notEmpty(),
  handleValidation,
];

export const validateEmployeeUpdate = [
  param("eid").custom(isObjectId).withMessage("Invalid employee id"),
  body("email").optional().isEmail(),
  body("salary").optional().isNumeric(),
  body("date_of_joining").optional().isISO8601().toDate(),
  handleValidation,
];

export const validateGetEmployeeById = [
  param("eid").custom(isObjectId).withMessage("Invalid employee id"),
  handleValidation,
];

export const validateDeleteEmployee = [
  query("eid").custom(isObjectId).withMessage("Invalid employee id"),
  handleValidation,
];

function isObjectId(v) {
  return mongoose.Types.ObjectId.isValid(v);
}

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map(e => e.msg).join(", "),
      errors: errors.array(),
    });
  }
  next();
}

import { Router } from "express";
import { signup, login } from "../controllers/user.controller.js";
import { validateSignup, validateLogin } from "../middleware/validators.js";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

export default router;

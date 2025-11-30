import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { formatLoginResponse, formatUserResponse } from "../utils/format.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({ status: false, message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });

    // exact response shape & code
    return res.status(201).json(formatUserResponse(user));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid Username and password" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ status: false, message: "Invalid Username and password" });
    }

    let token;
    if (process.env.JWT_SECRET) {
      token = jwt.sign(
        { sub: user._id.toString(), username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );
    }
    return res.status(200).json(formatLoginResponse(token));
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}

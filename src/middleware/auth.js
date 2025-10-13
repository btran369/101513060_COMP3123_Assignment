import jwt from "jsonwebtoken";

export function optionalAuth(req, res, next) {
  const protect = (process.env.PROTECT_EMP_ROUTES || "false").toLowerCase() === "true";
  if (!protect) return next();

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ status: false, message: "Missing Bearer token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
}

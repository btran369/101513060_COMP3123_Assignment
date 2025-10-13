import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import empRoutes from "./routes/employee.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ status: "ok", service: "COMP3123 Assignment 1 API" }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Not found" });
});

export default app;

// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";

// import userRoutes from "./routes/user.routes.js";
// import empRoutes from "./routes/employee.routes.js";

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   helmet({
//     // allow cross-origin usage of static resources (e.g., images)
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   })
// );
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // serve uploaded profile pictures
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.get("/", (_req, res) =>
//   res.json({ status: "ok", service: "COMP3123 Assignment 1 API" })
// );

// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/emp", empRoutes);

// // --- Serve React frontend in production ---
// if (process.env.NODE_ENV === "production") {
//   const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");

//   app.use(express.static(frontendBuildPath));

//   // Any non-API route should serve the frontend
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendBuildPath, "index.html"));
//   });
// }

// // 404 for unknown API routes (in dev or prod)
// app.use((req, res) => {
//   res.status(404).json({ status: false, message: "Not found" });
// });

// export default app;
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.routes.js";
import empRoutes from "./routes/employee.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// serve uploaded profile pictures
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== API ROUTES =====
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

// simple API health check (works in dev & prod)
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "COMP3123 Assignment 1 API" });
});

// ===== FRONTEND (REACT) IN PRODUCTION =====
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");

  // Serve static files from React app
  app.use(express.static(frontendBuildPath));

  // Any non-API route -> React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

// ===== 404 for unknown API routes (mainly in dev) =====
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Not found" });
});

export default app;

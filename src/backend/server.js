import "dotenv/config.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/comp3123_assigment1";

await connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import { DatabaseConnection } from "./db/mongoose.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/admin/admin.routes.js";
import { ClientRouter } from "./routes/client/client.routes.js";
import fs from "fs";
import path from "path";
import cors from "cors"

dotenv.config();
const app = express();

// ✅ Ensure temporary folder exists
const tempDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
  console.log("✅ Temp folder created at:", tempDir);
}
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    abortOnLimit: true,
  })
);

// ✅ Serve static files from public folder
app.use(express.static(path.join(process.cwd(), "public")));

// ✅ Routes
app.get("/", (req, res) => res.send("Hello World ✅"));
app.use("/client", ClientRouter);
app.use("/admin", AdminRouter);

// ✅ Connect to MongoDB and start server
DatabaseConnection();
app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
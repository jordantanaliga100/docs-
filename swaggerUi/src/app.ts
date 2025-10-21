// IMPORTS
import cors from "cors";
import dotenv from "dotenv";

import express, { Express, Request, Response } from "express";
// import morgan from "morgan";
import path from "path";
import UserRoutes from "./app/users/user.route";

// ENV CONFIG
const nodeEnv = process.env.NODE_ENV || "development";
const envFile = nodeEnv === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });
console.log(`✅ Loaded envFile`);
console.log("... on " + nodeEnv + " environment 🚀");

const app = express() as Express;

// TOP MIDDLEWARES
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.join(__filename);
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// ROUTES
app.get("/", (req: Request, res: Response) => {
  // throw new Error("Testing gin index");
  res.send(`
    <small>
    <h3>
    Node_Express Server Alive 🛩️
    </h3>
    <a href="/docs">API </a>
    </small>
    `);
});

// ✅ SWAGGER DOCS
app.get("/docs", (req: Request, res: Response) => {
  const swaggerUiPath = path.resolve(__dirname, "../public/swagger.html");
  res.sendFile(swaggerUiPath);
});

app.use("/api/v1/users", UserRoutes);

export default app;

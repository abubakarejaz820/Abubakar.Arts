import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderHandler from "./api/order.js";

const app = express();

// ✅ Use wide CORS or your frontend domain
app.use(
  cors({
    origin: ["https://abubakar-arts.netlify.app"], // your frontend
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(bodyParser.json());

// Routes
app.all("/api/order", orderHandler); // GET & POST

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Export Express app as default for Vercel
export default app;

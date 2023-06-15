import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello SightseeingLive</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}!`);
});

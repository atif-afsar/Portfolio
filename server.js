import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import handler from "./api/chat.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.post("/api/chat", (req, res) => {
  console.log("POST /api/chat received");
  handler(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

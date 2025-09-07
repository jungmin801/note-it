import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/note", (req, res) => {
  res.json({ ok: true, message: "Hello World!" });
});

export default app;

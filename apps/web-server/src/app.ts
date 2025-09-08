import express from "express";
import cors from "cors";
import { supabase } from "./supapbase";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/notes", async (_req, res) => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) return res.status(400).json({ message: error.message });
  res.status(200).json(data);
});

export default app;

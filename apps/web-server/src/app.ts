import express from "express";
import cors from "cors";
import { supabase } from "./supapbase";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/notes", async (_req, res) => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) return res.status(500).json({ message: error.message });
  return res.status(200).json(data);
});

app.post("/note", async (req, res) => {
  const note = req.body;
  const { error } = await supabase.from("notes").insert(note).select().single();
  if (error) return res.status(500).json({ message: error.message });
  return res.sendStatus(200);
});

app.put("/note/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id))
    return res.status(400).json({ message: "invalid id" });
  const payload = req.body;

  const { data, error } = await supabase
    .from("notes")
    .update(payload)
    .eq("id", id)
    .select() // 변경된 행 돌려받기
    .maybeSingle(); // 없으면 data=null, error는 없음

  if (error) return res.status(500).json({ message: error.message });

  // 2) 매칭된 행이 없으면 404
  if (!data) return res.status(404).json({ message: "note not found" });

  // 3) 성공
  return res.status(200).json(data);
});

app.delete("/note", async (req, res) => {
  const { id } = req.query;
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) return res.status(500).json({ message: error.message });
  return res.sendStatus(200);
});

export default app;

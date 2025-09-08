// src/supabase.ts
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// 인증 없이 그냥 읽어오기만 할거면 anon 키도 가능

export const supabase = createClient(supabaseUrl, supabaseKey);

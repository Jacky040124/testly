"use server";

import { neon } from "@neondatabase/serverless";
import { Question } from "@/types/Question";

export async function getData() {
  const url = process.env.DATABASE_URL as string;
  const sql = neon(url);

  const data = await sql`SELECT name, value FROM playing_with_neon WHERE id = 2`;
  return JSON.stringify(data);
}

export async function fetchQuestion(index: number): Promise<Question> {
    // TODO: Implement actual database fetch
    return {
        text: "what's the meaning of life",
        options: ["money", "win a hackathon", "undefined", "it depends"]
    };
}
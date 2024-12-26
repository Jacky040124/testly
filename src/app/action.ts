"use server";

import { neon } from "@neondatabase/serverless";

export async function getData() {
  const url = process.env.DATABASE_URL as string;
  const sql = neon(url);

  const data = await sql`SELECT name, value FROM playing_with_neon WHERE id = 2`;
  return JSON.stringify(data);
}

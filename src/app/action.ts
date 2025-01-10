"use server";

import { neon } from "@neondatabase/serverless";
import { Question } from "@/types/Question";

const url = process.env.DATABASE_URL as string;
const sql = neon(url);

export async function fetchQuestion(index: number): Promise<Question> {
  const data = await sql`SELECT text, options FROM question_bank WHERE question_id = ${index}`;

  const question = data[0];
  let parsedOptions;
  try {
    // Handle both string and object cases
    parsedOptions = typeof question.options === "string" ? JSON.parse(question.options) : question.options;
  } catch (error) {
    console.error("Error parsing options:", error);
    return {
      text: question.text,
      options: [
        { text: "30 km/h", isCorrect: false },
        { text: "50 km/h", isCorrect: true },
        { text: "70 km/h", isCorrect: false },
        { text: "90 km/h", isCorrect: false },
      ],
    };
  }

  return {
    text: question.text,
    options: parsedOptions.map((opt: { text: string; correct: boolean }) => ({
      text: opt.text,
      isCorrect: opt.correct,
    })),
  };
}


type signInData = {
    email: string;
    password: string;
}

export async function signIn(data : signInData) {
    const data = await sql`SELECT text, options FROM question_bank WHERE question_id = ${index}`;
    
    // validate user exist
    // validate user password correct
    // context switched to sign in
    // load user context
    
}
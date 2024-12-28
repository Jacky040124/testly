"use server";

import { neon } from "@neondatabase/serverless";

export async function fetchQuestion(index: number): Promise<Question> {
  const url = process.env.DATABASE_URL as string;
  const sql = neon(url);

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

// export async function fetchQuestion(index: number): Promise<Question> {
//     const url = process.env.DATABASE_URL as string;
//     const sql = neon(url);

//     const data = await sql`SELECT text, options FROM question_bank WHERE question_id = ${index}`;

//     const question = data[0];
//     const parsedOptions = JSON.parse(question.options).map((opt: { text: string, correct: boolean }) => ({
//         text: opt.text,
//         isCorrect: opt.correct
//     }));

//     return {
//         text: question.text,
//         options: parsedOptions
//     };
// }

"use server";

import { neon } from "@neondatabase/serverless";
import { Option } from "@/types/Question";
import { ClientUser } from "@/types/User";
import bcrypt from "bcrypt";
const url = process.env.DATABASE_URL as string;
const sql = neon(url);

export async function fetchQuestions(userId: string | null, question_set_id: number) {
  try {
    const rawData = await sql`SELECT * FROM questions WHERE question_set_id = ${question_set_id}`;

    if (!rawData || !Array.isArray(rawData)) {
      throw new Error("Invalid data received from database");
    }

    // parse json object into question array
    const questions = await Promise.all(
      rawData.map(async function (currentValue) {
        try {
          const options = await fetchOptions(currentValue.question_id);

          if (!options || !Array.isArray(options)) {
            throw new Error(`Failed to fetch options for question ${currentValue.question_id}`);
          }

          const newValue = {
            id: currentValue.question_id,
            text: currentValue.text,
            answer: currentValue.answer,
            topic: currentValue.topic,
            difficulty: currentValue.difficulty,
            options: options,
          };

          return newValue;
        } catch (optionError) {
          console.error(`Error processing question ${currentValue.question_id}:`, optionError);
          throw optionError;
        }
      })
    );

    if (!questions || !Array.isArray(questions)) {
      throw new Error("Failed to process questions data");
    }

    return questions;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching questions:", {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    } else {
      console.error("Unknown error:", error);
    }
  }
}

export async function fetchOptions(questionId: string): Promise<Option[] | null> {
  try {
    if (!questionId) {
      throw new Error("Question ID is required");
    }

    const rawData = await sql`SELECT * FROM options WHERE question_id = ${questionId}`;

    if (!rawData || !Array.isArray(rawData)) {
      throw new Error(`Invalid options data for question ${questionId}`);
    }

    const options: Option[] = rawData.map(function (currentValue) {
      const newValue: Option = {
        id: currentValue.option_id,
        text: currentValue.text,
        isCorrect: currentValue.iscorrect === true,
      };
      return newValue;
    });
    return options;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching options for question ${questionId}:`, {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    } else {
      console.error("Unknown Error:", error);
    }
    return null;
  }
}

// auth service

export type authState = {
  error: string | null;
  user: ClientUser | null;
};

async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

async function checkUserExists(email: string): Promise<boolean> {
  const result = await sql`SELECT EXISTS(SELECT 1 FROM users WHERE email = ${email})`;
  return result[0].exists;
}

export async function signIn(previousState: authState | null, formData: FormData): Promise<authState> {
  const email = formData.get('email') as string;
  const password = formData.get("password") as string;
  const rawData = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = rawData[0];

  if (!user) {
    return { error: "User not found", user: null };
  }

  if (!(await verifyPassword(password, user.passwordhash))) {
    return { error: "wrong password", user: null };
  }

  console.log(user);
  const newUser: ClientUser = {
    id: user.id,
    email: user.email,
    membership: user.membership,
    attemptedQuestionSets: user.attemptedQuestionSets,
    preferences: user.preferences,
  };

  return { error: null, user: newUser };
}

export async function signUp(previousState: authState | null, formData: FormData): Promise<authState> {
  const email = formData.get('email') as string;
  const password = formData.get("password") as string;

  if (await checkUserExists(email)) {
    return { error: "User already exists", user: null };
  }

  await sql`INSERT INTO users(id, email, passwordhash, membership) 
              VALUES (${crypto.randomUUID()},${email},${await hashPassword(password)},false)`;

  // verificaiton
  const rawData = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = rawData[0];

  if (user == null) {
    console.log("fail to create");
    return { error: "fail to create", user: null };
  }

  const newUser: ClientUser = {
    id: user.id,
    email: user.email,
    membership: user.membership,
    attemptedQuestionSets: user.attemptedQuestionSets,
    preferences: user.preferences,
  };

  return { error: null, user: newUser };
}

// open ai service
import OpenAI from "openai";

// Check if API key exists
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function chat(content: string) {
  console.log("Chat request content:", content);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: content }],
  });

  return completion.choices[0].message;
}

// mail service

import { Resend } from "resend";
import { EmailTemplate } from "@/lib/EmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function send(feedback: string) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["zhongzhenyu190@gmail.com"],
      subject: "feedback",
      react: EmailTemplate({ feedback: feedback }) as React.ReactNode,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

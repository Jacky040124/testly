"use server";

import { neon } from "@neondatabase/serverless";
import { Option } from "@/types/Question";
import { ClientUser } from "@/types/User";
import bcrypt from "bcrypt";
const url = process.env.DATABASE_URL as string;
const sql = neon(url);

export async function fetchQuestions(userId: string | null, question_set_id: number) {
    try {
        // Check if database URL is configured
        if (!process.env.DATABASE_URL) {
            throw new Error("Database URL is not configured");
        }

        // Fetch questions with error handling
        const rawData = await sql`SELECT * FROM questions WHERE question_set_id = ${question_set_id}`;
        
        if (!rawData || !Array.isArray(rawData)) {
            throw new Error("Invalid data received from database");
        }

        // parse json object into question array
        const questions = await Promise.all(rawData.map(async function (currentValue) {
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
                    options: options
                };

                return newValue;
            } catch (optionError) {
                console.error(`Error processing question ${currentValue.question_id}:`, optionError);
                throw optionError;
            }
        }));

        if (!questions || !Array.isArray(questions)) {
            throw new Error("Failed to process questions data");
        }

        return questions;
    } catch (error: any) {
        // Log the error safely
        console.error("Error fetching questions:", {
            message: error.message,
            code: error.code,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });

        // In production, return a safe error message
        if (process.env.NODE_ENV === 'production') {
            throw new Error("Failed to fetch questions. Please try again later.");
        } else {
            throw error;
        }
    }
}

export async function fetchOptions(questionId: string): Promise<Option[]> {
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
                isCorrect: currentValue.iscorrect === true
            };
            return newValue;
        });

        return options;
    } catch (error: any) {
        console.error(`Error fetching options for question ${questionId}:`, {
            message: error.message,
            code: error.code,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });

        if (process.env.NODE_ENV === 'production') {
            throw new Error(`Failed to fetch options. Please try again later.`);
        } else {
            throw error;
        }
    }
}


type authData = {
    email: string;
    password: string;
}


async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export async function signIn(data: authData): Promise<null | ClientUser> {
    const rawData = await sql`SELECT * FROM users WHERE email = ${data.email}`;
    const user = rawData[0];

    if (user == null) {
        console.log("user doesn't exist");
        return null;
    }

    if (! await verifyPassword(data.password, user.passwordhash)) {
        console.log("wrong password");
        return null;
    }

    console.log(user);
    const newUser: ClientUser = {
        id: user.id,
        email: user.email,
        membership: user.membership,
        attemptedQuestionSets: user.attemptedQuestionSets,
        preferences: user.preferences,
    }

    return newUser;
}

export async function signUp(data: authData): Promise<boolean> {
    // insertion
    await sql`INSERT INTO users(id, email, passwordhash, membership) 
              VALUES (${crypto.randomUUID()},${data.email},${await hashPassword(data.password)},false)`;

    // verificaiton
    const rawData = await sql`SELECT * FROM users WHERE email = ${data.email}`;
    const user = rawData[0];

    if (user == null) {
        console.log("fail to create");
        return false;
    }

    return true;
}
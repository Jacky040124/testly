"use server";

import { neon } from "@neondatabase/serverless";
import { Option } from "@/types/Question";
import { Question } from "@/types/Question";
import { ClientUser } from "@/types/User";
import bcrypt from "bcrypt";
const url = process.env.DATABASE_URL as string;
const sql = neon(url);

export async function fetchQuestions(userId: string | null, question_set_id: number) {
    // update to fetch from attempted qset, if not attempted add to attemped
    try {
        const rawData = await sql`SELECT * FROM questions WHERE question_set_id = ${question_set_id}`;

        // parse json object into question array
        const questions = await Promise.all(rawData.map(async function (currentValue) {
            const newValue: Question = {
                id: currentValue.question_id,
                text: currentValue.text,
                answer: currentValue.answer,
                topic: currentValue.topic,
                difficulty: currentValue.difficulty,
                options: await fetchOptions(currentValue.question_id)
            }
            return newValue
        }))


        console.log("fetch question set success, data:", questions);
        return questions;
    } catch (e: any) {
        console.log(e, "error fetch question set error", e)
    }
}

export async function fetchOptions(questionId: string): Promise<Option[]> {
    try {
        const rawData = await sql`SELECT *  FROM options WHERE question_id = ${questionId}`

        const options: Option[] = rawData.map(function (currentValue, index, array) {
            const newValue: Option = {
                id: currentValue.option_id,
                text: currentValue.text,
                isCorrect: currentValue.isCorrect
            }
            return newValue;
        },)

        console.log("fetch options success, data:", options);
        return options;

    } catch (e: any) {
        console.log(e, "error fetch options")
        return [];
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
    console.log("received Sign in data:", data);
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

export async function signUp(data: authData): Promise<Boolean> {
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
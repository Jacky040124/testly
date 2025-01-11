"use server";

import { neon } from "@neondatabase/serverless";
import { User, ClientUser } from "@/types/User";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
const url = process.env.DATABASE_URL as string;
const sql = neon(url);

export async function fetchQuestionSet(userId: string | null, question_set_id: number){
  // update to fetch from attempted qset, if not attempted add to attemped
  const questionSet = await sql`SELECT id,questions FROM question_sets WHERE id = ${question_set_id}`;
  console.log(questionSet);
  return questionSet;
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

async function verifyPassword(password: string, hashedPassword:string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export async function signIn(data : authData) : Promise<null | ClientUser>{
    console.log("received Sign in data:",data);
    const rawData = await sql`SELECT * FROM users WHERE email = ${data.email}`;
    const user = rawData[0];
    
    if (user == null) {
        console.log("user doesn't exist");
        return null;
    }

    if (! await verifyPassword(data.password,user.passwordhash)) {
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

export async function signUp(data : authData) : Promise<Boolean>{
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
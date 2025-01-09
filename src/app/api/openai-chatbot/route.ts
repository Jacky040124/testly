"use server"

import OpenAI from "openai";
import { NextResponse } from "next/server"

// Check if API key exists
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey
});


async function chat(content:string) {
    console.log("Chat request content:", content);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: content }],
    });

    return completion.choices[0].message;
}

export async function POST(request:Request) {
    const { content } = await request.json();

    try {
        const result = await chat(content);
        console.log("Chat response:", result);
        return NextResponse.json({ message: "Success", result: result.content }, { status: 200 });
    } catch (error) {
        console.error("OPENAI API error:", error);
        return NextResponse.json({ error: "Failed to chat" }, { status: 500 });
    }
}




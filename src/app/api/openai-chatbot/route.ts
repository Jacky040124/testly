import OpenAI from "openai";
import { NextResponse } from "next/server"

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

async function chat(content:string) {
    const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: content }],
    });

    return (await completion).choices[0].message
}


export async function POST(request:Request) {
    const { content } = await request.json();

    try {
        const result = await chat(content);
        return NextResponse.json({ message: "Success", result: result.content }, { status: 200 });
    } catch (error) {
        console.error("OPENAI API error:", error);
        return NextResponse.json({ error: "Failed to chat" }, { status: 400 });
    }


}




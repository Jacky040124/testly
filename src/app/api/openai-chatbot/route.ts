"use server"

import OpenAI from "openai";
import { NextResponse } from "next/server"
<<<<<<< HEAD
=======
import { Resend } from "resend";
>>>>>>> origin/errorHandling

// Check if API key exists
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey
});

<<<<<<< HEAD
async function chat(content:string) {
=======
const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
  private from: string;
  private to: string;
  private subject: string;
  private html: string;

  constructor(from: string, to: string, subject: string, html: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }

  public async send() {
    try {
      console.log("Sending email:", { from: this.from, to: this.to, subject: this.subject });
      await resend.emails.send({
        from: this.from,
        to: this.to,
        subject: this.subject,
        html: this.html,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

async function chat(content:string) {
    console.log("Chat request content:", content);
>>>>>>> origin/errorHandling
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
<<<<<<< HEAD
=======
        console.log("Chat response:", result);
>>>>>>> origin/errorHandling
        return NextResponse.json({ message: "Success", result: result.content }, { status: 200 });
    } catch (error) {
        console.error("OPENAI API error:", error);
        return NextResponse.json({ error: "Failed to chat" }, { status: 500 });
    }
}

<<<<<<< HEAD
=======
export async function sendMail(text: string, from: string, to: string) {
  try {
    console.log("Sending mail from:", from, "to:", to);
    const response = await fetch("/api/resend-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from, to }),
    });

    const data = await response.json();
    console.log("Mail response data:", data);
  } catch (error) {
    console.error("sendMail error:", error);
  }
}

>>>>>>> origin/errorHandling



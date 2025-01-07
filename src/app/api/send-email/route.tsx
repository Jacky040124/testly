import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
} 
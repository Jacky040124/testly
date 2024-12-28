import { Resend } from "resend";
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY);

class Mail {
    private from:string
    private to:string
    private subject:string
    private html:string


    constructor(from:string,to:string,subject:string,html:string) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    public async send() {
        try {
            await resend.emails.send({
                from: this.from,
                to: this.to,
                subject: this.subject,
                html: this.html,
            });
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    }
}

export async function POST(request:Request) {
  try {
    const {from, to, subject, content} = await request.json();
    const formattedContent = `
      <h2>User Feedback Received</h2>
      <div style="margin: 20px 0;">
        <p>${content}</p>
      </div>
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated message from your feedback system.</p>
    `;
    const mail = new Mail(from, to, subject, formattedContent);

    await mail.send();
    return NextResponse.json({ message: "Success", data: mail }, { status: 200 });

  } catch (error) {
    console.error("Resend API error:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to send email" }, { status: 400 });
  }
}



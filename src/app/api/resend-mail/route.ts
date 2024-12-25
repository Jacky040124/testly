import { Resend } from "resend";
import { NextResponse } from "next/server"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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
        resend.emails.send({
        from: this.from,
        to: this.to,
        subject: this.subject,
        html: this.html,
        });
    }
}

export async function POST(request:Request) {
  try {
    const {from, to} = await request.json();
    const mail = new Mail(from, to, "Hello World", "<p>Congrats on sending your <strong>first email</strong>!</p>");

    await mail.send();
    return NextResponse.json({ message: "Success", data: mail }, { status: 200 });

  } catch (error) {

    // TODO: implement centralise logging and error handling
    console.error("Resend API error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 400 });

  }
}



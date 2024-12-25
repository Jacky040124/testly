"use client"

import Image from "next/image";
import { sendMail } from "@/service/mail.service";

export default function Home() {
  return (
    <div>
      <p> Hello World </p>
      <button onClick={() => sendMail("onboarding@resend.dev", "zhongzhenyu190@gmail.com")}> SendMail </button>
    </div>
  );
}

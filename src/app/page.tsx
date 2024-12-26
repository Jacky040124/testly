"use client";

import { chat } from "@/service/chat.service";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    const result = await chat(message);
    setResponse(result);
  };

  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      <ChatInterface message={message} response={response} onMessageChange={setMessage} onSubmit={handleSubmit} />
    </div>
  );
}

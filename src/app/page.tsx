"use client";

import { chat } from "@/service/chat.service";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getData } from "./action";
import { UserData } from "@/components/UserData";

export default function Home() {
  // api key added to vercel
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [data, setData] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
    const result = await chat(message);
    setResponse(result);
  };

  const handleGetData = async () => {
    setData(await getData());
  };

  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      <ChatInterface message={message} response={response} onMessageChange={setMessage} onSubmit={handleSubmit} />
      <button onClick={handleGetData}>Get User Data</button>
      {data && <UserData data={data} />}
    </div>
  );
}

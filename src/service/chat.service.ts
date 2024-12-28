import OpenAI from 'openai';

export async function chat(content: string) {
  try {
    console.log("Chat service sending:", content);
    const response = await fetch("/api/openai-chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    });

    const data = await response.json();
    console.log("Chat service received:", data);
    return data.result;
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}
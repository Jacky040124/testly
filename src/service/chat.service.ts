export async function chat(content: string) {
  try {
    const response = await fetch("/api/openai-chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.log("chat error:", error);
  }
}
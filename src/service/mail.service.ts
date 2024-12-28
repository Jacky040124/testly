export async function sendMail(text: string, from: string, to: string) {
  try {
    const response = await fetch("/api/resend-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from, to }),
    });

    const data = await response.json();
    console.log("mail data:", data);

  } catch (error) {
    console.log("sendMail error:", error);
  }
}
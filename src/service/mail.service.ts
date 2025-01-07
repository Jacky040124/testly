export async function sendMail(to: string, subject: string, html: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
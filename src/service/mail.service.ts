export async function sendMail(from:string,to:string) {

  try {
    // method : specify HTML method
    // headers : HTML header tells the server what type of data the package contains (json)
    // body: JSON.stringify : Converts JavaScript object to Json string
    const response = await fetch("/api/resend-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from:from, to:to }),
    });

    const data = await response.json();
    console.log("mail data:", data);

  } catch (error) {
    console.log("sendMail error:", error);
  }
}
// app/api/auth/[auth0]/route.js
import { handleAuth } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    console.log("Authentication request received");
    return handleAuth()(request);
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
};

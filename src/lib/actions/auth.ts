"use server";

import { signIn, signOut } from "@/lib/auth";

export async function handleSignIn() {
  await signIn("google", { redirectTo: "/" });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
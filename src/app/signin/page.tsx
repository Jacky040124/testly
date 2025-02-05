"use client";

import { useGlobal } from "@/contexts/GlobalContext";
import { signIn } from "@/app/action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authState } from "@/app/action";

export default function SignIn() {
  const { setUser } = useGlobal();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<authState, FormData>(signIn, { error: null, user: null });

  // if user is logged in, push to home page
  useEffect(() => {
    if (state.user) {
      setUser(state.user);
      router.push("/");
    }
  }, [state.user, setUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      </div>
      <form action={formAction} className="flex flex-col space-y-4">
        <input type="email" name="email" placeholder="Email" required className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" required className="border p-2 rounded" />
        <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

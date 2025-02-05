"use client"
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp, authState } from "@/app/action";
import { useGlobal } from "@/contexts/GlobalContext";

export default function SignUp() {
    const router = useRouter();
    const { setUser } = useGlobal();
    const [state, formAction, isPending] = useActionState<authState, FormData>(signUp, { error: null, user: null });

    useEffect(() => {
      if (state.user) {
        setUser(state.user);
        router.push("/signin");
      }
    }, [state.user, router, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            </div>
            {state.error && <p className="text-red-500 text-center mb-4">{state.error}</p>}
            <form action={formAction}>
                <input type="email" name="email" required className="border p-2 rounded" />
                <input type="password" name="password" required className="border p-2 rounded" />
                <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">
                    {isPending ? "Signing up..." : "Sign Up"}
                </button>   
            </form>
        </div>
    );
}
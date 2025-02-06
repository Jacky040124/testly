"use client";

import { handleSignIn, handleSignOut } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button 
          onClick={() => handleSignOut()} 
          className="duo-button-white hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => handleSignIn()}
        className="duo-button hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M24 12.2748C24 11.4599 23.9234 10.6823 23.7824 9.93921H12.2461V14.3576H18.8516C18.585 15.7951 17.7275 17.013 16.4236 17.8278V20.7143H20.3508C22.6699 18.6335 24 15.7326 24 12.2748Z"
          />
          <path
            fill="#34A853"
            d="M12.2461 24C15.5502 24 18.3545 22.9375 20.3508 20.7143L16.4236 17.8278C15.3295 18.5669 13.9189 19.0078 12.2461 19.0078C9.05283 19.0078 6.34961 16.9144 5.37158 14.1025H1.30859V17.0766C3.31934 21.1875 7.48242 24 12.2461 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.37158 14.1025C5.12939 13.3634 4.99219 12.5737 4.99219 11.7593C4.99219 10.9449 5.12939 10.1553 5.37158 9.41614V6.44204H1.30859C0.47168 8.03786 0 9.84961 0 11.7593C0 13.669 0.47168 15.4808 1.30859 17.0766L5.37158 14.1025Z"
          />
          <path
            fill="#EA4335"
            d="M12.2461 4.51074C14.0449 4.51074 15.6533 5.12308 16.9189 6.31982L20.4023 2.91845C18.3545 1.11157 15.5502 0 12.2461 0C7.48242 0 3.31934 2.81249 1.30859 6.44204L5.37158 9.41614C6.34961 6.60426 9.05283 4.51074 12.2461 4.51074Z"
          />
        </svg>
        Sign in with Google
      </button>
    </>
  );
}

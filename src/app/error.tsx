"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--duo-gray-100)] px-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-[22px] font-bold text-[var(--duo-green)] flex items-center justify-center gap-2">
          😵 Oops! Something went wrong.
        </h2>
        <p className="text-[var(--duo-gray-400)] mt-3 text-lg">Even the best learners make mistakes. Try again?</p>

        {error.digest && (
          <div className="bg-[var(--duo-incorrect)] text-white font-bold py-2 px-4 rounded-lg mt-4">
            Error Code: {error.digest}
          </div>
        )}

        <button onClick={reset} className="duo-button w-full mt-6">
          🔄 Try Again
        </button>

        <p className="text-[var(--duo-gray-300)] text-sm mt-4">
          Need help?{" "}
          <a
            href="https://support.duolingo.com"
            className="text-[var(--duo-blue)] font-bold hover:text-[var(--duo-blue-hover)]"
          >
            Visit our support page
          </a>
          .
        </p>
      </div>
    </div>
  );
}

"use client"

import { useGlobal } from "@/contexts/GlobalContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export function TopBar() {
    const { completionPercentage, lives } = useGlobal();
    const [isWarning, setIsWarning] = useState(false);

    // Add warning animation when lives are low
    useEffect(() => {
        if (lives <= 3 && lives > 0) {
            setIsWarning(true);
            const timer = setTimeout(() => setIsWarning(false), 500);
            return () => clearTimeout(timer);
        }
    }, [lives]);

    return (
        <div className="flex items-center gap-6 mb-8">
            {/* Cross Button */}
            <button className="text-[var(--duo-gray-400)] hover:text-[var(--duo-gray-600)] transition-colors">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                </svg>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-4 bg-[#E5E5E5] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[var(--duo-green)] transition-all duration-300 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                />
            </div>
        </div>
    );
} 
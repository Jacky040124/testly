"use server";

import { TopBar } from "@/components/TopBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressSection } from "@/components/ProgressSection";
import { AIChatBot } from "@/components/AIChatBot";
import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();
    console.log(session);


  return (
    <div className="min-h-screen bg-[var(--duo-background)] p-6 font-['DIN Round Pro']">
      <div className="max-w-[1200px] mx-auto">
        <TopBar />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8">
          {/* Left Column */}
          <ProgressSection />

          {/* Right Column */}
          <div className="space-y-8">
              <QuestionCard />

            <AIChatBot />
          </div>
        </div>
      </div>
    </div>
  );
}

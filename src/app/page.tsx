import { TopBar } from "@/components/TopBar";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressSection } from "@/components/ProgressSection";
import { AIChatBot } from "@/components/AIChatBot";

export default function Home() {
  

  const options = [
    "Lane changing is allowed.",
    "You must stop for pedestrians.",
    "Don't stop or slow down.",
    "Pedestrians are not allowed at the cross lines.",
  ];
  
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

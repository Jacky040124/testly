"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ProgressGrid } from "@/components/ProgressGrid";
import { RatingDisplay } from "@/components/RatingDisplay";
import { ArrowLeft, RotateCcw, BookmarkIcon, BookOpen } from "lucide-react";

export default function Home() {
  const answeredQuestions = {
    1: "incorrect",
    2: "incorrect",
    3: "correct",
    4: "correct",
    5: "incorrect",
    6: "incorrect",
    7: "correct",
    8: "incorrect",
    9: "incorrect",
    10: "incorrect",
    11: "correct",
    12: "current",
  } as const;

  return (
    <div className="min-h-screen bg-[var(--duo-background)] p-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Button className="duo-button-white flex items-center gap-2 text-base">
              <ArrowLeft className="w-5 h-5" /> All Tests
            </Button>
            <Button className="duo-button-white flex items-center gap-2 text-base">
              <RotateCcw className="w-5 h-5" /> Restart
            </Button>
          </div>

          <Card className="p-6 space-y-6 bg-white rounded-2xl border-2 border-[var(--duo-gray-200)] shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--duo-gray-400)]">Your Progress</h2>
            <ProgressGrid currentQuestion={12} answeredQuestions={answeredQuestions} />
            <div className="flex justify-between gap-3">
              <button className="duo-button flex-1">Prev</button>
              <button className="duo-button flex-1">Next</button>
            </div>
            <div className="space-y-2">
              <div className="flex gap-4 text-base font-bold">
                <span className="text-[var(--duo-correct)] flex items-center gap-1">✓ 4 Correct</span>
                <span className="text-[var(--duo-incorrect)] flex items-center gap-1">✗ 7 Incorrect</span>
              </div>
              <p className="text-[var(--duo-gray-400)] text-sm flex items-center gap-1">
                <span>✓</span> 10 mistakes allowed to pass
              </p>
            </div>
          </Card>

          <Button className="duo-button-white w-full justify-start text-base">
            <BookOpen className="w-5 h-5 mr-2" />
            Challenge Bank™
          </Button>

          <Button className="duo-button-white w-full justify-start text-base">
            <BookmarkIcon className="w-5 h-5" />
            View Handbook
          </Button>
        </div>

        {/* Right Column */}
        <div className="space-y-8 pt-4">
          <div className="space-y-6 border-2 border-[var(--duo-gray-200)] rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-[var(--duo-gray-400)]">
              What does this illuminated road marking indicate?
            </h1>

            <RadioGroup className="space-y-4">
              {[
                "Lane changing is allowed.",
                "You must stop for pedestrians.",
                "Don't stop or slow down.",
                "Pedestrians are not allowed at the cross lines.",
              ].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-3 bg-white p-4 rounded-2xl border-2 border-[var(--duo-gray-200)] hover:border-[var(--duo-green)] hover:bg-[#F7FFF4] transition-all duration-200 cursor-pointer"
                >
                  <RadioGroupItem value={option} id={option} className="text-[var(--duo-green)]" />
                  <Label htmlFor={option} className="text-lg font-bold text-[var(--duo-gray-400)] cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

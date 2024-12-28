"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressGrid } from "@/components/ProgressGrid";
import { BookOpen, BookmarkIcon } from "lucide-react";
import { RatingFeedback } from "@/components/RatingFeedback";
import { useEnvironment } from "@/contexts/EnvironmentContext";
import { useState } from "react";

export function ProgressSection() {
  const { index, setIndex, answeredQuestions, completionPercentage } = useEnvironment();
  const [showPopup, setShowPopup] = useState(false);



  const handleFeatureClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleNext = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex > 40 ? 1 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = index - 1;
    setIndex(prevIndex < 1 ? 40 : prevIndex);
  };


  return (
    <div className="space-y-5 relative">
      {/* Progress Card */}
      <Card className="p-8 space-y-6 bg-white rounded-3xl border-2 border-[var(--duo-gray-200)] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--duo-gray-400)]">Question Progress</h2>
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--duo-gray-400)]">
            <span className="w-2 h-2 rounded-full bg-[var(--duo-green)]"></span>
            {completionPercentage}% Complete
          </div>
        </div>
        <ProgressGrid />

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          <button
            className="duo-button flex-1 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 rounded-xl"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="duo-button flex-1 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 rounded-xl"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </Card>

      {/* Resource Buttons */}
      <div className="flex gap-4">
        <Button
          className="duo-button-white flex-1 justify-center text-base hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 rounded-xl"
          onClick={handleFeatureClick}
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Challenge Bank™
        </Button>
        <Button
          className="duo-button-white flex-1 justify-center text-base hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 rounded-xl"
          onClick={handleFeatureClick}
        >
          <BookmarkIcon className="w-5 h-5 mr-2" />
          Handbook
        </Button>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium">
          Feature coming soon! Stay tuned! 🚀
        </div>
      )}

      {/* Rating and Feedback */}
      <RatingFeedback />
    </div>
  );
} 
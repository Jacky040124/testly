"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus } from "lucide-react";
import { sendMail } from "@/service/mail.service";

export function RatingFeedback() {
  // TODO: implement sending user feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [hasSentFeedback, setHasSentFeedback] = useState(false);

  const handleRating = (value: number) => {
    setRating(value);
    setHasRated(true);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
    }, 2000);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      setHasSentFeedback(true);
      setShowFeedback(false);
      sendMail(feedbackText, "zhongzhenyu190@gmail.com", "zhongzhenyu190@gmail.com");
      console.log("Feedback submitted:", feedbackText);
      setFeedbackText(""); // Clear the input after submission
    }
  };

  return (
    <Card className="p-8 bg-white rounded-2xl border-2 border-[var(--duo-gray-200)] space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
      {/* Rating Display */}
      {!hasRated && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[var(--duo-gray-400)]">
              How helpful was this session?
            </h3>
          </div>
          
          {/* Star Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                      : "text-gray-300"
                  } transition-all duration-200`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="text-center text-[var(--duo-gray-400)] font-medium py-2 animate-fade-in">
          Thank you for your rating! 🌟
        </div>
      )}

      {/* Feedback Section */}
      <div className="space-y-4">
        {!hasSentFeedback && (
          <Button
            variant="outline"
            className="w-full justify-center gap-2 text-base hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 bg-gradient-to-r from-blue-50 to-white"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <MessageSquarePlus className="w-5 h-5" />
            Give Feedback
          </Button>
        )}

        {showFeedback && (
          <div className="space-y-3 animate-in slide-in-from-top duration-300">
            <Textarea
              placeholder="Share your thoughts about the test..."
              className="min-h-[100px] resize-none border-2 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              onClick={handleFeedbackSubmit}
              disabled={!feedbackText.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        )}

        {hasSentFeedback && (
          <div className="text-center text-[var(--duo-gray-400)] font-medium py-2 animate-fade-in">
            Thank you for your feedback! We appreciate your input! 🙏
          </div>
        )}
      </div>
    </Card>
  );
} 
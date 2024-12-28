import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquarePlus } from "lucide-react";

export function RatingFeedback() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <Card className="p-8 bg-white rounded-2xl border-2 border-[var(--duo-gray-200)] space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
      {/* Rating Display */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">4.29</span>
            <span className="text-lg text-gray-500 font-medium">/5</span>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">2356 votes</div>
        </div>
        
        {/* Star Rating */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
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

      {/* Feedback Section */}
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-base hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 bg-gradient-to-r from-blue-50 to-white"
          onClick={() => setShowFeedback(!showFeedback)}
        >
          <MessageSquarePlus className="w-5 h-5" />
          Give Feedback
        </Button>

        {showFeedback && (
          <div className="space-y-3 animate-in slide-in-from-top duration-300">
            <Textarea
              placeholder="Share your thoughts about the test..."
              className="min-h-[100px] resize-none border-2 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
} 
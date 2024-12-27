"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function RatingDisplay() {
  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-1">
          <span className="text-[32px] font-bold leading-none">4.29</span>
          <span className="text-sm text-gray-500 leading-none">/5</span>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= 4 ? "text-[#FFC107] fill-[#FFC107]" : "text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">2356 votes • Click a star to add your vote</p>
    </Card>
  );
}
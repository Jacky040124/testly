import { useMemo } from "react";
import { QuestionSet } from "@/types/QuestionSet";

// Calculate completion percentage based on answered questions
export function useCompletionPercentage(questionSet : QuestionSet): number {

  return useMemo(() => {
    if (!questionSet || questionSet.id == "-1") {
      return 0;
    }
    const answeredCount = questionSet.questions.filter((q) => q.answer !== null).length;
    return Math.round((answeredCount / 40) * 100);
  }, [questionSet]);

};

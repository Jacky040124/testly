import { useMemo } from "react";
import { useGlobal } from "@/contexts/GlobalContext";

// Calculate completion percentage based on answered questions
export const useCompletionPercentage = (): number => {
  const { questionSet } = useGlobal();

  return useMemo(() => {
    if (!questionSet) {
      return 0;
    }
    const answeredCount = questionSet.questions.filter((q) => q.answer !== null).length;
    return Math.round((answeredCount / 40) * 100);
  }, [questionSet]);
};

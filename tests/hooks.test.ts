import { expect, test, describe, beforeEach } from 'vitest'
import { useCompletionPercentage } from '@/hooks/useCalculatePercentage'
import { QuestionSet } from '@/types/QuestionSet'
import { Option, Question } from '@/types/Question'
import { renderHook } from '@testing-library/react';



describe('useCalculatePercentage', () => {
    let mockOption: Option;
    let testAnsweredQuestion: Question;
    let testUnansweredQuestion: Question;
    let emptyQuestionSet: QuestionSet;

    beforeEach(() => {
        mockOption = {
            id: "",
            text: "",
            isCorrect: false,
        }

        testAnsweredQuestion = {
            id: "0",
            text: "-",
            answer: 0,
            options: [mockOption, mockOption, mockOption, mockOption]
        }

        testUnansweredQuestion = {
            id: "0",
            text: "-",
            answer: null,
            options: [mockOption, mockOption, mockOption, mockOption]
        }

        emptyQuestionSet = {
            id: "-1",
            questions: []
        }
    });

    test('useCompletionPercentage : questionSet empty', () => {
        const { result } = renderHook(() => useCompletionPercentage(emptyQuestionSet));
        expect(result.current).toBe(0)
    })

    test('useCompletionPercentage : questionSet not empty, all questions answered', () => {
        const fullQuestionSet: QuestionSet = {
            id: "1",
            questions: Array(40).fill(testAnsweredQuestion)
        };
        const { result } = renderHook(() => useCompletionPercentage(fullQuestionSet));
        expect(result.current).toBe(100)

    });

})
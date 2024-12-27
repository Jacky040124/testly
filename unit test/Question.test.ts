import { describe, it, expect } from 'vitest';
import { Question } from '../Classes/models/Question';

describe('Question Class', () => {
    it('should create a Question instance', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        expect(question.getQuestionId()).toEqual('1');
        expect(question.getOptions()).toEqual(['OptionA', 'OptionB']);
    });

    // it('should create a Question instance', () => {
    //     const question = new Question('2', ['OptionC', 'OptionD']);
    //     expect(question.getQuestionId()).toEqual('2');
    //     expect(question.getOptions()).toEqual(['OptionC', 'OptionD']);
    // });

    it('should set QuestionId', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        question.setQuestionId('2');
        expect(question.getQuestionId()).toEqual('2');
        expect(question.getOptions()).toEqual(['OptionA', 'OptionB']);
    });

    it('should set Options', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        question.setOptions(['OptionC', 'OptionD']);
        expect(question.getQuestionId()).toEqual('1');
        expect(question.getOptions()).toEqual(['OptionC', 'OptionD']);
    });
});
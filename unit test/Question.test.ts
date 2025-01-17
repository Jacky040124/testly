import { describe, it, expect } from 'vitest';
import { Question } from '../classes/models/Question';

describe('Question Class', () => {
    it('should create a Question instance', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        expect(question.getQuestionString()).toEqual('1');
        expect(question.getOptions()).toEqual(['OptionA', 'OptionB']);
    });

    // it('should create a Question instance', () => {
    //     const question = new Question('2', ['OptionC', 'OptionD']);
    //     expect(question.getQuestionId()).toEqual('2');
    //     expect(question.getOptions()).toEqual(['OptionC', 'OptionD']);
    // });

    it('should set QuestionId', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        question.getQuestionString();
        expect(question.getQuestionString()).toEqual("2");
        expect(question.getOptions()).toEqual(['OptionA', 'OptionB']);
    });

    it('should set Options', () => {
        const question = new Question('1', ['OptionA', 'OptionB']);
        question.setOptions(['OptionC', 'OptionD']);
        expect(question.getQuestionString()).toEqual("1");
        expect(question.getOptions()).toEqual(['OptionC', 'OptionD']);
    });
});
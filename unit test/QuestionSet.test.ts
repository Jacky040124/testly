import { describe, it, expect } from 'vitest';
import { Question } from '../classes/models/Question';
import { QuestionSet } from '../classes/models/QuestionSet';

describe('QuestionSet Class', () => {
    it('should create a QuestionSet instance', () => {
        const questions = [new Question('1', ['Option A']), new Question('2', ['Option B'])];
        const questionSet = new QuestionSet(questions, 'set1');
        expect(questionSet.getQuestionSetId()).toEqual('set1');
        expect(questionSet.getQuestions()).toEqual(questions);
    });

    it('should set Questions', () => {
        const questions = [new Question('1', ['Option A'])];
        const questionSet = new QuestionSet(questions, 'set1');
        const newQuestions = [new Question('2', ['Option B'])];
        questionSet.setQuestions(newQuestions);
        expect(questionSet.getQuestions()).toEqual(newQuestions);
    });

    
    it('should set QuestionId', () => {
        const questions = [new Question('1', ['Option A'])];
        const questionSet = new QuestionSet(questions, 'set1');
        questionSet.setQuestionId('set2');
        expect(questionSet.getQuestionSetId()).toEqual('set2');
    });


});
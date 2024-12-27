import { describe, it, expect } from 'vitest';
import { Test } from '../Classes/models/Test';

describe('Test Class', () => {
    it('should create a Test instance', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        expect(test.getTestId()).toBe('1');
        expect(test.getQuestionSetId()).toBe('set1');
        expect(test.getAnswer()).toEqual(['A', 'B']);
        expect(test.isComplete()).toBe(false);
        expect(test.getScore()).toBe(0);
    });

    it('should set Complete', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        test.setComplete(true);
        expect(test.isComplete()).toBe(true);
    });

    it('should set testId', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        test.setTestId('2');
        expect(test.getTestId()).toBe('2');
    });

    it('should set answer', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        test.setAnswer(['C', 'D']);
        expect(test.getAnswer()).toEqual(['C', 'D']);
    });

    it('should set score', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        test.setScore(10);
        expect(test.getScore()).toBe(10);
    });

    it('should set testId', () => {
        const test = new Test('1', 'set1', ['A', 'B'], false, 0);
        test.setQuestionSetId('set2');
        expect(test.getQuestionSetId()).toBe('set2');
    });
});
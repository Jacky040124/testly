import { describe, it, expect } from 'vitest';
import { User } from '../classes/models/User';

describe('User Class', () => {
    it('should create a User instance', () => {
        const user = new User('1', 'John Doe', 'john@example.com', true, []);
        expect(user.getUserId()).toBe('1');
        expect(user.getName()).toBe('John Doe');
        expect(user.getEmail()).toBe('john@example.com');
        expect(user.getMembership()).toBe(true);
    });

    it('should set user properties', () => {
        const user = new User('1', 'John Doe', 'john@example.com', true, []);
        user.setName('Jane Doe');
        user.setEmail('jane@example.com');
        expect(user.getName()).toBe('Jane Doe');
        expect(user.getEmail()).toBe('jane@example.com');
    });

    it('should set userId', () => {
        const user = new User('1', 'John Doe', 'john@example.com', true, []);
        user.setUserId('2');
        expect(user.getUserId()).toBe('2');
    });

    it('should set membership', () => {
        const user = new User('1', 'John Doe', 'john@example.com', true, []);
        user.setMembership(false);
        expect(user.getMembership()).toBe(false);
    });

    it('should set test history', () => {
        const user = new User('1', 'John Doe', 'john@example.com', true, []);
        user.setTestHistory([]);
        expect(user.getTestHistory()).toEqual([]);
    });
});
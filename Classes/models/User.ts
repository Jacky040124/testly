import { Test } from './Test';

export class User {

    // constructor
    userId: string; 
    name: string;
    email: string;
    membership: boolean;
    testHistory: Test[];

    constructor(userId: string, name: string, email: string, membership: boolean, testHistory: Test[]) {
        this.userId = userId; // string
        this.name = name; // string
        this.email = email; // string
        this.membership = membership; // boolean
        this.testHistory = testHistory; // test[]
    }

    // method
    // Getter and Setter methods
    getUserId() {
        return this.userId;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    getName() {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getMembership() {
        return this.membership;
    }

    setMembership(membership: boolean): void {
        this.membership = membership;
    }

    getTestHistory() {
        return this.testHistory;
    }

    setTestHistory(testHistory: Test[]): void {
        this.testHistory = testHistory;
    }
}
// interface Question {
//     question: string;
//     options: string[];
//     answer: string;
// }

import { IQuestion } from './question.interface';

// Define the Quiz class
class Quiz {
    private questions: IQuestion[];
    private questionIndex: number;
    private correctAnswers: number;
    private selectedOption: string | null;

    constructor(questions: IQuestion[]) {
        this.questions = questions;
        this.questionIndex = 0;
        this.correctAnswers = 0;
        this.selectedOption = null;
    }

    // Display the current question
    public displayQuestion(): void {
        this.selectedOption = null;
        const currentQuestion = this.questions[this.questionIndex];
        const questionElement = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        
        if (questionElement && optionsContainer) {
            questionElement.innerText = currentQuestion.question;
            optionsContainer.innerHTML = '';
            currentQuestion.options.forEach((option: string) => {
                const button = document.createElement('button');
                button.innerText = option;
                button.addEventListener('click', () => this.selectOption(option));
                optionsContainer.appendChild(button);
            });
        }
    }

    // Select an option
    private selectOption(option: string): void {
        this.selectedOption = option;
        const options = document.querySelectorAll('#options button');
        options.forEach((opt: Element) => {
            if ((opt as HTMLElement).innerText === option) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    // Submit the selected answer
    public submitAnswer(): void {
        if (this.selectedOption !== null) {
            if (this.selectedOption === this.questions[this.questionIndex].answer) {
                this.correctAnswers++;
            }
            this.questionIndex++;
            if (this.questionIndex < this.questions.length) {
                this.displayQuestion();
            } else {
                const resultElement = document.getElementById('result');
                const submitButton = document.getElementById('submit');
                if (resultElement) {
                    resultElement.innerText = `You got ${this.correctAnswers} out of ${this.questions.length} correct!`;
                }
                if (submitButton) {
                    submitButton.style.display = 'none';
                }
            }
        } else {
            alert('Please select an option before submitting.');
        }
    }
    
}

// Define your questions
const questions: IQuestion[] = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "John von Neumann"], answer: "Charles Babbage" },
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "London"], answer: "Paris" },
    // ... Add more questions here
];

// Create a new Quiz instance and set up event listeners
const quiz = new Quiz(questions);
document.addEventListener('DOMContentLoaded', () => {
    quiz.displayQuestion();
    const submitButton = document.getElementById('submit');
    if (submitButton) {
        submitButton.addEventListener('click', () => quiz.submitAnswer());
    }
});
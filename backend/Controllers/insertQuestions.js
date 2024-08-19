const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://lovedeep:Lovedeep12345@cluster0.9frqvr5.mongodb.net/mcq-platform?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const Question = require('../models/questionsSchema');

// const Question = mongoose.model('Question', questionSchema);

const questions = [
    {
        "questionText": "Which of the following is a JavaScript data type?",
        "options": ["String", "Integer", "Float", "Double"],
        "correctOption": 0
    },
    {
        "questionText": "What is the correct syntax to create a function in JavaScript?",
        "options": ["function myFunction() {}", "function:myFunction() {}", "function = myFunction() {}", "create function myFunction() {}"],
        "correctOption": 0
    },
    {
        "questionText": "Which operator is used to assign a value to a variable?",
        "options": ["=", "==", "===", "=>"],
        "correctOption": 0
    },
    {
        "questionText": "How do you declare a variable in JavaScript?",
        "options": ["var myVariable;", "declare myVariable;", "variable myVariable;", "let myVariable;"],
        "correctOption": 3
    },
    {
        "questionText": "What does the 'typeof' operator do in JavaScript?",
        "options": ["Determines the data type of a variable", "Checks if a variable is undefined", "Converts a variable to a string", "Creates a new variable"],
        "correctOption": 0
    },
    {
        "questionText": "Which method is used to remove the last element from an array in JavaScript?",
        "options": ["pop()", "shift()", "slice()", "splice()"],
        "correctOption": 0
    },
    {
        "questionText": "How do you write a comment in JavaScript?",
        "options": ["// This is a comment", "# This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
        "correctOption": 0
    },
    {
        "questionText": "What will be the output of the following code: console.log(2 + '2');?",
        "options": ["22", "4", "Error", "undefined"],
        "correctOption": 0
    },
    {
        "questionText": "Which keyword is used to create a new object in JavaScript?",
        "options": ["new", "create", "make", "object"],
        "correctOption": 0
    },
    {
        "questionText": "How do you define a class in JavaScript?",
        "options": ["class MyClass {}", "class MyClass() {}", "define MyClass {}", "MyClass class {}"],
        "correctOption": 0
    }, 
    {
        "questionText": "What is the correct syntax to create a function in JavaScript?",
        "options": ["function myFunction() {}", "function:myFunction() {}", "function = myFunction() {}", "create function myFunction() {}"],
        "correctOption": 0
    }
];

const insertQuestions = async () => {
    try {
        // Check for existing questions
        const existingQuestions = await Question.find({ questionText: { $in: questions.map(q => q.questionText) } });
        const existingQuestionsText = existingQuestions.map(q => q.questionText);

        // Filter out questions that already exist
        const newQuestions = questions.filter(q => !existingQuestionsText.includes(q.questionText));

        if (newQuestions.length > 0) {
            await Question.insertMany(newQuestions);
            console.log("New questions inserted successfully");
        } else {
            console.log("All questions already exist in the database, skipping insertion");
        }
    } catch (error) {
        console.error("Error inserting questions:", error);
    }
    // } finally {
    //     mongoose.connection.close(); // Close the connection
    // }
};

module.exports = insertQuestions;

// script.js

// Elements
const earth = document.getElementById('earth');
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');
const checkButton = document.getElementById('check-answer');
const resultText = document.getElementById('result');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

// Questions and Answers
const questions = [
    {
        question: "What causes a solar eclipse?",
        options: ["Earth blocking the Sun", "Moon blocking the Sun", "Sun blocking the Moon"],
        answer: "option2"
    },
    {
        question: "What causes a lunar eclipse?",
        options: ["Earth blocking the Moon's view of the Sun", "Moon blocking the Sun", "Earth blocking the Sun's view of the Moon"],
        answer: "option3"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
const totalQuestions = questions.length;

// Initialize the quiz with the first question
function initializeQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    displayQuestion();
    checkButton.disabled = false;
    resultText.textContent = '';
    checkButton.textContent = 'Check Answer';
    checkButton.removeEventListener('click', tryAgain); // Remove the tryAgain event listener
    checkButton.addEventListener('click', checkAnswer); // Add a new event listener for checking answers
}

// Display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    option1.textContent = currentQuestion.options[0];
    option2.textContent = currentQuestion.options[1];
    option3.textContent = currentQuestion.options[2];
}

// Check the selected answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (!selectedOption) {
        resultText.textContent = 'Please select an answer.';
        resultText.style.color = 'red';
    } else {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            correctAnswers++;
            resultText.textContent = 'Correct! Well done.';
            resultText.style.color = 'green';
        } else {
            resultText.textContent = 'Oops! That\'s not correct. Try again.';
            resultText.style.color = 'red';
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            setTimeout(() => {
                displayQuestion();
                resultText.textContent = '';
                selectedOption.checked = false; // Clear the selected option for the next question
            }, 2000);
        } else {
            const averageScore = (correctAnswers / totalQuestions) * 100;

            if (averageScore >= 70) {
                resultText.textContent = `Quiz completed. You got ${correctAnswers} out of ${totalQuestions} correct. Great job!`;
            } else {
                resultText.textContent = `Quiz completed. You got ${correctAnswers} out of ${totalQuestions} correct. Your score is below average. Would you like to try again?`;
                checkButton.textContent = 'Try Again';
                checkButton.removeEventListener('click', checkAnswer); // Remove the checkAnswer event listener
                checkButton.addEventListener('click', tryAgain); // Add a new event listener to restart the quiz
            }

            checkButton.disabled = true;
        }
    }
}

// Event listener for trying again
function tryAgain() {
    initializeQuiz(); // Restart the quiz
}

// Initialize the quiz when the page loads
initializeQuiz();

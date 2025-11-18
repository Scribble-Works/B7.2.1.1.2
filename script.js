// Data structure for the 10 questions
const questions = [
    {
        id: 1,
        table: [
            [1, 2], [2, 3], [3, 4], [4, 5]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is two more than x",
            "y is one more than x", // Correct: y = x + 1
            "y is twice x",
            "y is x less one"
        ],
        correctAnswerIndex: 1 
    },
    {
        id: 2,
        table: [
            [3, 6], [5, 10], [10, 20], [20, 40]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is three times x",
            "y is five less than x",
            "y is twice x", // Correct: y = 2x
            "y is x plus seven"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 3,
        table: [
            [5, 4], [10, 9], [15, 14], [20, 19]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is one less than x", // Correct: y = x - 1
            "y is one more than x",
            "y is half of x",
            "y is x divided by five"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 4,
        table: [
            [1, 3], [2, 5], [3, 7], [4, 9]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is one more than x",
            "y is three times x",
            "y is one more than twice x", // Correct: y = 2x + 1
            "y is two less than x"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 5,
        table: [
            [4, 1], [8, 2], [12, 3], [16, 4]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is four less than x",
            "y is x divided by 4", // Correct: y = x / 4
            "y is three less than x",
            "y is four more than x"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 6,
        table: [
            [0, 5], [1, 6], [2, 7], [3, 8]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is five less than x",
            "y is x times five",
            "y is five more than x", // Correct: y = x + 5
            "y is x plus one"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 7,
        table: [
            [10, 8], [20, 18], [30, 28], [40, 38]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is two less than x", // Correct: y = x - 2
            "y is ten less than x",
            "y is half of x",
            "y is x minus one"
        ],
        correctAnswerIndex: 0
    },
    {
        id: 8,
        table: [
            [2, 7], [3, 10], [4, 13], [5, 16]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is three more than x",
            "y is one less than three times x", // Correct: y = 3x - 1
            "y is three times x",
            "y is five more than x"
        ],
        correctAnswerIndex: 1
    },
    {
        id: 9,
        table: [
            [6, 3], [8, 4], [10, 5], [12, 6]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is six less than x",
            "y is two less than x",
            "y is half of x", // Correct: y = x / 2
            "y is x minus three"
        ],
        correctAnswerIndex: 2
    },
    {
        id: 10,
        table: [
            [1, 1], [2, 4], [3, 9], [4, 16]
        ],
        question: "What is the rule for this relation?",
        options: [
            "y is twice x",
            "y is one more than x",
            "y is x multiplied by itself", // Correct: y = x^2 (x squared)
            "y is x divided by one"
        ],
        correctAnswerIndex: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false; // Flag to prevent multiple answers per question

const quizBox = document.getElementById('quiz-box');
const nextBtn = document.getElementById('next-btn');

// --- Functions ---

/**
 * Renders the current question to the DOM.
 */
function displayQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = 'Select an Answer';
    
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        
        // Build the HTML for the question, table, and options
        let questionHTML = `
            <h3>Question ${q.id} of 10</h3>
            <p>${q.question}</p>
            <table>
                <tr><th>x</th><th>y</th></tr>
        `;

        // Add table rows
        q.table.forEach(pair => {
            questionHTML += `<tr><td>${pair[0]}</td><td>${pair[1]}</td></tr>`;
        });
        
        questionHTML += `</table><div class="options">`;

        // Add option buttons
        q.options.forEach((option, index) => {
            questionHTML += `
                <button onclick="checkAnswer(${index})" data-index="${index}">
                    ${String.fromCharCode(65 + index)}. ${option}
                </button>
            `;
        });
        
        questionHTML += `</div>`;
        quizBox.innerHTML = questionHTML;
    } else {
        showResults();
    }
}

/**
 * Checks the selected answer against the correct one.
 * @param {number} selectedIndex - The index of the button the user clicked.
 */
function checkAnswer(selectedIndex) {
    if (answered) return; // Stop if already answered

    answered = true;
    nextBtn.disabled = false;
    nextBtn.textContent = 'Next Question';
    
    const q = questions[currentQuestionIndex];
    const optionButtons = quizBox.querySelectorAll('.options button');

    // Disable all buttons and apply feedback classes
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;

        if (index === selectedIndex) {
            if (selectedIndex === q.correctAnswerIndex) {
                btn.classList.add('correct');
                score++;
            } else {
                btn.classList.add('incorrect');
            }
        }
        
        // Always highlight the correct answer if the user was wrong
        if (index === q.correctAnswerIndex && selectedIndex !== q.correctAnswerIndex) {
            btn.classList.add('correct');
        }
    });
}

/**
 * Moves to the next question or ends the quiz.
 */
function nextQuestion() {
    if (!answered) return; // Prevent skipping without answering
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

/**
 * Displays the final score and results screen.
 */
function showResults() {
    quizBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    document.getElementById('score-display').textContent = score;
    document.getElementById('results').classList.remove('hidden');
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', displayQuestion);
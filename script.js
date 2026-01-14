// ======================
// QUIZ DATA
// ======================
const questions = [
    {
        id: 1,
        table: [[1, 2], [2, 3], [3, 4], [4, 5]],
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
        table: [[3, 6], [5, 10], [10, 20], [20, 40]],
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
        table: [[5, 4], [10, 9], [15, 14], [20, 19]],
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
        table: [[1, 3], [2, 5], [3, 7], [4, 9]],
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
        table: [[4, 1], [8, 2], [12, 3], [16, 4]],
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
        table: [[0, 5], [1, 6], [2, 7], [3, 8]],
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
        table: [[10, 8], [20, 18], [30, 28], [40, 38]],
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
        table: [[2, 7], [3, 10], [4, 13], [5, 16]],
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
        table: [[6, 3], [8, 4], [10, 5], [12, 6]],
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
        table: [[1, 1], [2, 4], [3, 9], [4, 16]],
        question: "What is the rule for this relation?",
        options: [
            "y is twice x",
            "y is one more than x",
            "y is x multiplied by itself", // Correct: y = x²
            "y is x divided by one"
        ],
        correctAnswerIndex: 2
    }
];

// ======================
// STATE
// ======================
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// ======================
// DOM ELEMENTS
// ======================
const quizBox = document.getElementById('quiz-box');
const nextBtn = document.getElementById('next-btn');
const resultsDiv = document.getElementById('results');
const scoreDisplay = document.getElementById('score-display');

// ======================
// SOUND HELPER
// ======================
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}

// ======================
// DISPLAY QUESTION
// ======================
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestionIndex];
    answered = false;
    nextBtn.textContent = 'Next Question';
    nextBtn.disabled = true; // Disable until answer is selected

    let html = `
        <h3>Question ${q.id} of 10</h3>
        <p>${q.question}</p>
        <table class="relation-table">
            <thead><tr><th>x</th><th>y</th></tr></thead>
            <tbody>
    `;

    q.table.forEach(([x, y]) => {
        html += `<tr><td>${x}</td><td>${y}</td></tr>`;
    });

    html += `</tbody></table><div class="options">`;

    q.options.forEach((option, index) => {
        html += `
            <button onclick="handleAnswerClick(${index})" class="option-btn">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });

    html += `</div>`;
    quizBox.innerHTML = html;
}

// ======================
// HANDLE ANSWER
// ======================
function handleAnswerClick(selectedIndex) {
    if (answered) return;

    answered = true;
    nextBtn.disabled = false;

    const q = questions[currentQuestionIndex];
    const buttons = quizBox.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === q.correctAnswerIndex;

    // Update score and play sound
    if (isCorrect) {
        score++;
        playSound('correct-sound');
    } else {
        playSound('wrong-sound');
    }

    // Visual feedback
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === selectedIndex) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (idx === q.correctAnswerIndex) {
            btn.classList.add('correct-answer');
        }
    });
}

// ======================
// NAVIGATION
// ======================
function nextQuestion() {
    if (!answered) return; // Prevent skipping

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// ======================
// SHOW RESULTS
// ======================
function showResults() {
    quizBox.innerHTML = '';
    quizBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    scoreDisplay.textContent = score;
    resultsDiv.classList.remove('hidden');
}

// ======================
// INIT
// ======================
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
});
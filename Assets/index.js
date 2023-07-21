const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const saveScoreElement = document.getElementById('save-score');
const usernameElement = document.getElementById('username');
const saveButton = document.getElementById('save');

let shuffledQuestions, currentQuestionIndex, score, timer;

startButton.addEventListener('click', startGame);
saveButton.addEventListener('click', saveScore);

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'Who is the current President of USA?',
        answers: [
            {text: 'Joe Biden', correct: true},
            {text: 'Donald Trump', correct: false}
        ]
    },
    {
        question: 'Is Final Fantasy XVI out now?',
        answers: [
            {text: 'YES', correct: true},
            {text: 'NO', correct: false}
        ]
    },
    {
        question: 'What gets bigger the more you take from it?',
        answers: [
            {text: 'A pineapple', correct: false},
            {text: 'A hole', correct: true},
            {text: 'A pineapple shaped hole', correct: true}
        ]
    }
];

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeftElement.textContent = 75;
    questionContainerElement.classList.remove('hide');
    timer = setInterval(() => {
        let time = Number(timeLeftElement.textContent);
        if(time <= 0) {
            endGame();
        } else {
            timeLeftElement.textContent = time - 1;
        }
    }, 1000);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score += 1;
    } else {
        let time = Number(timeLeftElement.textContent);
        timeLeftElement.textContent = time > 10 ? time - 10 : 0;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionContainerElement.classList.add('hide');
    resultElement.classList.remove('hide');
    scoreElement.textContent = score;
    saveScoreElement.classList.remove('hide');
}

function saveScore() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    let userScore = {
        username: usernameElement.value,
        score: score
    };
    scores.push(userScore);
    localStorage.setItem('scores', JSON.stringify(scores));
    alert('Score saved!');
}

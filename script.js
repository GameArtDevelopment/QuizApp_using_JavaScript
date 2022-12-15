const question= document.getElementById("questions");
/* You can create a snippet for quicker code */
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which choice is part of fullstack wed dev?",
        choice1: "HTML",
        choice2: "Python",
        choice3: "C#",
        choice4: "Java",
        answer: 1

    },
    {
        question: "Which choice one makes fullstack web development prettier?",
        choice1: "HTML",
        choice2: "Python",
        choice3: "CSS",
        choice4: "Java",
        answer: 3

    },
    {
        question: "Which one is not a programming language?",
        choice1: "Java",
        choice2: "Python",
        choice3: "C#",
        choice4: "HTML",
        answer: 4

    },
]

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    };
    questionCounter++;
    progressText.innerText = 'Question ' + questionCounter + '/' + MAX_QUESTIONS; 
    /* A better to do the same above code in ES6 is with the below code */
    /*questionCounterText.innerText = '${questionCounter}/${MAX_QUESTIONS}';*/
    // Update the progressBarFull
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
// These two codes do the same thing. This one is mre readable
        /*const classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        };*/

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
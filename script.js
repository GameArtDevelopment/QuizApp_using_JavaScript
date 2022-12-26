const question= document.getElementById("questions");
/* You can create a snippet for quicker code */
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById("loader");
const game = documnet.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions.results.map ( loadedQuestion => {
        const formattedQuestions = {
            questions: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice( formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choices, index) => {
            formattedQuestion["choice" + (index+1)] = choices;
        })

        return formattedQuestion;
    });
    
    startGame();
})
.catch(err => {
    /*add a fail toload question ALERT, try again*/
});
//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    };
    questionCounter++;
    progressText.innerText = 'Question ' + questionCounter + '/' + MAX_QUESTIONS; 
    /* A better way to do the same above code in ES6 is with the below code */
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


const quizQuestions = document.getElementById("quiz-questions");
const quizFinished = document.getElementById("quiz-finished-screen");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const rightAnswer = document.getElementById("commentCorrect");
const wrongAnswer = document.getElementById("commentIncorrect");
const questionCounterText = document.getElementById("questionCounter");
const introduction = document.getElementById("introduction");
const startButton = document.getElementById("startQuiz");
const highScoresButton = document.getElementById("high-scores-button");
const highScores = document.getElementById("high-scores-screen");
const tryAgain = document.getElementById("tryAgain");
const playAgain = document.getElementById("playAgain");
const timer = document.getElementById("timer");
const outOfTime = document.getElementById("outOfTime");
const finalScore = document.getElementById("finalScore");

const MAX_QUESTIONS = 5;

let beginQuiz = false;
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let secondsLeft = 46;

let questions = [
    {
        question: "Which of the following is NOT a sibling of Tanjiro and Nezuko?",
        choice1: "Takeo Kamado",
        choice2: "Hanako Kamado",
        choice3: "Shigeru Kamado",
        choice4: "Kie Kamado",
        answer: 4
    },
    {
        question: "Who trained Tanjiro in the Water Breathing style?",
        choice1: "Sakonji Urokodaki",
        choice2: "Jigoro Kuwajima",
        choice3: "Tengen Uzui",
        choice4: "Giyu Tomioka",
        answer: 1
    },
    {
        question: "Against what demon did Tanjiro first unleash the Hinokami Kagura?",
        choice1: "Enmu",
        choice2: "Rui",
        choice3: "Daki",
        choice4: "Kyogai",
        answer: 2
    },
    {
        question: "Which of the following is not a canonical breathing style?",
        choice1: "Insect Breathing",
        choice2: "Sound Breathing",
        choice3: "Love Breathing",
        choice4: "Shadow Breathing",
        answer: 4
    },
    {
        question: "Of all the hashira, which one is physically incapable of decapitating a demon?",
        choice1: "Obanai Iguro",
        choice2: "Muichiro Tokito",
        choice3: "Shinobu Kocho",
        choice4: "Gyomei Himejima",
        answer: 3
    },
]

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.innerText = "Time left: " + secondsLeft;
      timer.setAttribute("style", "display: block;");
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        quizQuestions.setAttribute("style", "display: none;");
        quizFinished.setAttribute("style", "display: block;");
        outOfTime.innerText = "Oops... out of time.";
        finalScore.innerText = "Your score: 0";
      }

      if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
      }
    }, 1000);
};


startGame = () => {
    setTime ();
    questionCounter = 0;
    availableQuestions = [...questions];
    highScoresButton.setAttribute("style", "display: none;");
    getNewQuestion();
};

getNewQuestion = () => {
    // go to the end page //
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        quizQuestions.setAttribute("style", "display: none;");
        quizFinished.setAttribute("style", "display: block;");
        timer.setAttribute("style", "display: none;");
        finalScore.innerText = "Your score: " + secondsLeft + "!";
        highScoresButton.setAttribute("style", "display: block;");
    }
    
    questionCounter++;
    questionCounterText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            };

        selectedChoice.parentElement.classList.add(classToApply);
            if (selectedAnswer == currentQuestion.answer) {
                rightAnswer.setAttribute("style", "display: block;");
            } else {
                wrongAnswer.setAttribute("style", "display: block;");
            }

        if (selectedAnswer == currentQuestion.answer) {
            secondsLeft +=5;
        } else {
            secondsLeft -=5;
        }

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            rightAnswer.setAttribute("style", "display: none;");
            wrongAnswer.setAttribute("style", "display: none;");
            getNewQuestion();
        }, 1000);
        
    })
})

startButton.addEventListener("click", e => {
    introduction.setAttribute("style", "display: none;");
    quizQuestions.setAttribute("style", "display: block;");
    startGame();
})

highScoresButton.addEventListener("click", e => {
    introduction.setAttribute("style", "display: none;");
    quizQuestions.setAttribute("style", "display: none;");
    quizFinished.setAttribute("style", "display: none;");
    highScores.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    clearInterval(timerInterval);
    secondsLeft = 46;
    
})

playAgain.addEventListener("click", e => {
    quizFinished.setAttribute("style", "display: none;");
    introduction.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    secondsLeft = 46;
    finalScore.innerText = "";
})

tryAgain.addEventListener("click", e => {
    highScores.setAttribute("style", "display: none;");
    introduction.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    secondsLeft = 46;
    finalScore.innerText = "";
})
// declared constants found throughout the HTML //
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
const highScoresScreen = document.getElementById("high-scores-screen");
const tryAgain = document.getElementById("tryAgain");
const playAgain = document.getElementById("playAgain");
const timer = document.getElementById("timer");
const outOfTime = document.getElementById("outOfTime");
const finalScore = document.getElementById("finalScore");
const submitScore = document.getElementById("submitScore");
const username = document.getElementById("username");
const highScoresList = document.getElementById("highScores");
const clear = document.getElementById("clearScores");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_QUESTIONS = 5;

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let secondsLeft = 46;

// the following array houses 5 different questions which are presented as objects //
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

// this function starts a timer feature and makes it visible in the upper right corner of the screen //
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.innerText = "Time left: " + secondsLeft;
      timer.setAttribute("style", "display: block;");
        
      // if time runs out, stop the timer, and go to the quiz finished screen with a custom header //
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        quizQuestions.setAttribute("style", "display: none;");
        quizFinished.setAttribute("style", "display: block;");
        outOfTime.innerText = "Oops... out of time.";
        finalScore.innerText = "Your score: 0";
        return;
      }

      // if there are no more questions in the available questions array, stop the timer //
      if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
      }
    }, 1000);
};

// this function initiates the game when called. Starts the timer, resets the question counter and available questions, hides the high scores button, and fetches a question //
startGame = () => {
    setTime ();
    questionCounter = 0;
    availableQuestions = [...questions];
    highScoresButton.setAttribute("style", "display: none;");
    getNewQuestion();
};

// this block of code handles generating random questions from the available questions array //
getNewQuestion = () => {
    // if there are no more questions in the array, set final score and set display to the finished screen //
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        quizQuestions.setAttribute("style", "display: none;");
        quizFinished.setAttribute("style", "display: block;");
        timer.setAttribute("style", "display: none;");
        outOfTime.innerText = "Quiz finished!";
        finalScore.innerText = "Your score: " + secondsLeft + "!";
        highScoresButton.setAttribute("style", "display: block;");
        return;
    }
    // updates question counter hud //
    questionCounter++;
    questionCounterText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;

    //selects a random question from those remaining in the available questions array //
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // loads the available answer options for the question that was randomly selected //
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // removes the current question from the available questions array //
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

// This next block of code handles choice selection and correctness, with visual feedback //
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        // each choic is given a click event listener and the choice that is selected is assigned to the variable "selectedAnswer" //
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // applies a class of "incorrect" or "correct" to the selected choice which provides visual feedback to the user //
        let classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            };

        // feedback is provided below question based on how questions was answered //
        selectedChoice.parentElement.classList.add(classToApply);
            if (selectedAnswer == currentQuestion.answer) {
                rightAnswer.setAttribute("style", "display: block;");
            } else {
                wrongAnswer.setAttribute("style", "display: block;");
            }

        // applies a time bonus or penalty based on how questions are answered //
        if (selectedAnswer == currentQuestion.answer) {
            secondsLeft +=5;
        } else {
            secondsLeft -=5;
        }

        // sets a 1 second delay after selecting an answer and then hides answer feedback //
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            rightAnswer.setAttribute("style", "display: none;");
            wrongAnswer.setAttribute("style", "display: none;");
            getNewQuestion();
        }, 1000);
        
    })
})

// Below are a series of button event listeners that help to "redirect" the content on the screen when clicked //

// The start button hides the intro, makes visible the quiz questions html element and calls the startGame function //
startButton.addEventListener("click", e => {
    introduction.setAttribute("style", "display: none;");
    quizQuestions.setAttribute("style", "display: block;");
    startGame();
})

// the high scores button "redirects" to the high scores screen by hiding certain elements //
highScoresButton.addEventListener("click", e => {
    introduction.setAttribute("style", "display: none;");
    quizFinished.setAttribute("style", "display: none;");
    highScoresButton.setAttribute("style", "display: none;");
    highScoresScreen.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    secondsLeft = 46;
})

// the play again and try again buttons appear under different circumstances but perform the same function of "redirecting" to the intro, while resetting certain variables //
playAgain.addEventListener("click", e => {
    quizFinished.setAttribute("style", "display: none;");
    introduction.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    highScoresButton.setAttribute("style", "dispay; block;");
    secondsLeft = 46;
    finalScore.innerText = "";
    username.value = "";
    submitScore.disabled = true;
})

tryAgain.addEventListener("click", e => {
    highScoresScreen.setAttribute("style", "display: none;");
    introduction.setAttribute("style", "display: block;");
    timer.setAttribute("style", "display: none;");
    highScoresButton.setAttribute("style", "dispay; block;");
    secondsLeft = 46;
    finalScore.innerText = "";
    username.value = "";
    submitScore.disabled = true;
})

// the user will be unable to save their high score if they do not input a username value //
username.addEventListener("keyup", (e) => {
    submitScore.disabled = !username.value;
})

// the submit score button does many things:
submitScore.addEventListener("click", e => {
    // prevents the page from refreshing when submitting a form //
    e.preventDefault();

    // stores the username input and secondsLeft variable as a new const //
    const mostRecentHighScore = {
        username: username.value,
        score: secondsLeft,
    }
  
    // it pushes that const to the local storage //
    // and then sorts the scores stored in local storage from highest to lowest, and only keeps the top 5 //
    highScores.push(mostRecentHighScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    
    // stores the highScores array as a string in local storage //
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // uses a map to set the html content of the high scores unordered list from the locally stored high scores array //
    highScoresList.innerHTML = highScores.map( score => {
        return `<li class="high-score">${score.username} - ${score.score}</li>`;
    }).join("")

    // "redirects" to the high scores screen and hides the high scores button //
    quizFinished.setAttribute("style", "display: none;");
    highScoresButton.setAttribute("style", "display: none;");
    highScoresScreen.setAttribute("style", "display: block;");
})

// this button provides the user the ability to cleaer the high scores table stored in local storage //
clear.addEventListener("click", e => {
    localStorage.clear();
    highScoresList.innerHTML = "";
})
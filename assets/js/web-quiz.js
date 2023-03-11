const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const MAX_QUESTIONS = 5;

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];

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

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion ();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) 
        // go to the end page //
       

    questionCounter++;
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

        getNewQuestion();
    })
})

startGame();
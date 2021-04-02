const startButton = document.querySelector('#start-button');
const nextButton = document.querySelector('#next-button');
const guestionContainerElement = document.querySelector('.question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('.answer-buttons')


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame () {
startButton.classList.add('hide');
shuffledQuestions = questions.sort( () => Math.random()-0.5);
currentQuestionIndex = 0;
guestionContainerElement.classList.remove('hide');
setNextQuestion();
}

function setNextQuestion () {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);   
}


function showQuestion (question) {
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
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


function selectAnswer (e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex+1) {
        nextButton.classList.remove('hide');
    }
    else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: 'How to write correctly?',
        answers: [
            {text:'I have done it yesterday', correct:false},
            {text:'I did it yesterday', correct:true},
            {text:'I do it yesterday', correct:false},
            {text:'I will do it yesterday', correct:false},
        ]
    },
    {
        question: 'Do you like Ivano-Frankivsk',
        answers: [
            {text:'Yes, I do', correct:true},
            {text:'No, I am not', correct:false},
            {text:'So can I', correct:false},
            {text:'No, I like not', correct:false},
        ]
    },
    {
        question: 'Choose Conditional 0',
        answers: [
            {text:'If you give me money I will buy a car', correct:false},
            {text:'If I were you I would do that', correct:false},
            {text:'If I just knew that...', correct:false},
            {text:'If you heat ice, it melts', correct:true},
        ]
    },
    {
        question: 'Choose Past Perfect',
        answers: [
            {text:'I had a headache last week', correct:false},
            {text:'I had had a breakfast before you came', correct:true},
            {text:'I have a car', correct:false},
            {text:'I have been trying for a long time', correct:false},
        ]
    },
    {
        question: 'Choose right one',
        answers: [
            {text:'He doesn\'t lives in Lviv ', correct:false},
            {text:'He does like it', correct:true},
            {text:'He live in Kyiv', correct:false},
            {text:'It makes you life better', correct:false},
        ]
    }
]
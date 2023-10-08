const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 15;

// Define 15 sample questions
const sampleQuestions = [
    {
        question: "What makes eclipse seasons happen approximately every six months?",
        choices: [
            "Solar eclipses happen during the day, lunar eclipses at night",
            "Solar eclipses involve the Sun, lunar eclipses involve the Moon",
            "Solar eclipses are more common",
            "Lunar eclipses are longer than solar eclipses"
        ],
        correctAnswer: "The Moon's orbit is a bit tilted"
    },
    {
        question: "What is the difference between a solar and lunar eclipse?",
        choices: [
            "Solar eclipses happen during the day, lunar eclipses at night",
            "Solar eclipses involve the Sun, lunar eclipses involve the Moon",
            "Solar eclipses are more common",
            "Lunar eclipses are longer than solar eclipses"
        ],
        correctAnswer: "Solar eclipses involve the Sun, lunar eclipses involve the Moon"
    },
    {
        question: "When does an eclipse occur?",
        choices: [
            "When the Moon is closest to the Earth",
            "When the Sun is closest to the Earth",
            "When the Sun, Moon, and Earth are aligned just right",
            "When there is a full moon"
        ],
        correctAnswer: "When the Sun, Moon, and Earth are aligned just right"
    },
    {
        question: "What do scientists study to predict eclipses?",
        choices: [
            "Animal behavior",
            "Ocean currents",
            "Movements of the Sun, Moon, and Earth",
            "Volcanic eruptions"
        ],
        correctAnswer: "Movements of the Sun, Moon, and Earth"
    },
    {
        question: "Why do eclipses only cover a small area on Earth?",
        choices: [
            "Because the Moon is very tiny",
            "Because the Sun is too far away",
            "Because Earth is really big, and the alignment is precise",
            "Because the Moon is too bright"
        ],
        correctAnswer: "Because Earth is really big, and the alignment is precise"
    },
    {
        question: "What causes the Moon to appear dark and mysterious during a lunar eclipse?",
        choices: [
            "Clouds in the Earth's atmosphere",
            "The Moon is hidden behind the Earth",
            "The Moon is turning off its light",
            "The Moon's natural dark color"
        ],
        correctAnswer: "The Moon is hidden behind the Earth"
    },
    {
        question: "Which celestial body moves between the Earth and the Sun during a solar eclipse?",
        choices: [
            "The Earth",
            "The Moon",
            "The Sun",
            "A comet"
        ],
        correctAnswer: "The Moon"
    },
    {
        question: "How many eclipse seasons occur in a year?",
        choices: [
            "One",
            "Two",
            "Four",
            "Twelve"
        ],
        correctAnswer: "Two"
    },
    {
        question: "What happens during a lunar eclipse?",
        choices: [
            "The Moon covers the Sun",
            "The Earth's shadow covers the Moon",
            "The Earth moves between the Sun and the Moon",
            "The Moon disappears completely"
        ],
        correctAnswer: "The Earth's shadow covers the Moon"
    },
    {
        question: "During a solar eclipse, what does the Moon cover?",
        choices: [
            "The Earth",
            "The Sun",
            "The stars",
            "The clouds"
        ],
        correctAnswer: "The Sun"
    },
    {
        question: "What do scientists use to predict when and where eclipses will occur?",
        choices: [
            "Magic crystals",
            "Special tools and math",
            "Weather forecasts",
            "Astrology"
        ],
        correctAnswer: "Special tools and math"
    },
    {
        question: "Why do only some people on Earth see an eclipse at a given time?",
        choices: [
            "Because eclipses only happen at night",
            "Because Earth is too big",
            "Because the Sun, Moon, and Earth have to be in a special alignment",
            "Because the Moon is too small"
        ],
        correctAnswer: "Because the Sun, Moon, and Earth have to be in a special alignment"
    },
    {
        question: "How often do eclipse seasons occur?",
        choices: [
            "Every month",
            "Approximately every six months",
            "Once a year",
            "Only once in a lifetime"
        ],
        correctAnswer: "Approximately every six months"
    },
    {
        question: "Why do eclipses occur?",
        choices: [
            "Because the Earth stops spinning",
            "Because of the way the Sun, Moon, and Earth align",
            "Because of earthquakes",
            "Because of strong winds"
        ],
        correctAnswer: "Because the Sun, Moon, and Earth have to be in a special alignment"
    },
    {
        question: "What are the two main types of eclipses mentioned in the article?",
        choices: [
            "Solar and stellar",
            "Solar and lunar",
            "Stellar and lunar",
            "Solar and celestial"
        ],
        correctAnswer: "Solar and lunar"
    }
];

// Manually set a question
function setQuestion(questionData) {
    _result.innerHTML = "";
    showQuestion(questionData);
}

// Event listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    // Set the first sample question
    setQuestion(sampleQuestions[0]);
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

// Display a question and options
function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correctAnswer;
    let incorrectAnswers = data.choices.filter(choice => choice !== correctAnswer);
    let optionsList = [...incorrectAnswers, correctAnswer];

    _question.innerHTML = `${data.question}`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

// Options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// Answer checking
function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer === correctAnswer){
            correctScore++;
            _result.innerHTML = `<p><i class="fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// To convert HTML entities into normal text of the correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);

        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            // Set the next sample question
            const nextQuestion = sampleQuestions[askedCount];
            if (nextQuestion) {
                setQuestion(nextQuestion);
            }
        }, 300);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    // Set the first sample question
    setQuestion(sampleQuestions[0]);
}



const words = [
     {
        word: "eclipse",
        hint: "the process of partial darkenees"
    },
    {
        word: "shadow",
        hint: "it happens when the sun reflects on a body"
    },
    {
        word: "solar",
        hint: "another name for the sun"
    },
    {
        word: "moon",
        hint: "a heavenly body that is seen at night"
    },
    {
        word: "lunar",
        hint: "another name for the moon"
    },
]

const wordText = document.querySelector(".word");
hintText = document.querySelector(".hint span");
timeText= document.querySelector(".time b");
inputField= document.querySelector("input");
refreshBtn = document.querySelector(".refresh-word");
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
   if(maxTime > 0){
    maxTime--;
    return timeText.innerText = maxTime
   }
   clearInterval(timer);
   alert(`time ia up!! ${correctWord.toUpperCase()} is the correct word`);
   initGame();
    }, 1000) ;
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];  //getting random objects from words
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));   //getting random number
        //shuffling and swiping wordArray letters randomly
        [wordArray[i] ,wordArray[j]] =  [wordArray[j] ,wordArray[i]]
    }
    wordText.innerText = wordArray.join(""); //passing shuffled word as word text
    hintText.innerText = randomObj.hint; //passing random object as hint text
    correctWord = randomObj.word.toLowerCase(); //passing random word to correctWord
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}

initGame();

const checkWord = ()=> {
     let userWord = inputField.value.toLocaleLowerCase();
     if(!userWord) return  alert("please kindly give it a try")
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`)
    alert(`Smart kid ${userWord.toUpperCase()} is the correct word`)

    initGame();
}


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
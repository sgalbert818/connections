// make it so that user cannot guess the same combination twice

let gameContent = [
    {
        words: ['Brain', 'Prune', 'Pug', 'Walnut'],
        category: 'Wrinkly things',
    },
    {
        words: ['Clip', 'Cut', 'Pare', 'Trim'],
        category: 'To make shorter',
    },
    {
        words: ['Buff', 'Fan', 'Nut', 'Lover'],
        category: 'Enthusiast',
    },
    {
        words: ['Built', 'Jacked', 'Ripped', 'Swole'],
        category: 'Muscular',
    },
    {
        words: ['Holly', 'Dog', 'Drift', 'Sandal'],
        category: '___wood',
    },
    {
        words: ['Recess', 'Break', 'Leave', 'Holiday'],
        category: 'Time off',
    },
    {
        words: ['Ink', 'Lack', 'Old', 'Range'],
        category: 'Colors minus their first letters',
    },
    {
        words: ['Fluffy', 'Rex', 'Rover', 'Spot'],
        category: 'Classic dog names',
    },
]

let boxes = document.querySelectorAll('.box');
let groups = document.querySelectorAll('.group');
const shuffle = document.getElementById('shuffle');
const clear = document.getElementById('clear');
const submit = document.getElementById('submit');
const remainingBox = document.querySelector('.remaining-guesses');
const oneAway = document.querySelector('.one-away');
let alreadyChosenCombos = [];
let selected = [];
let gameWords = [];
let remainingGuesses = 4;
let correctCounter = 0;
let checkAgainstIndex = 0;
let findIndex;

function setUpGame() {
    shuffle.disabled = false;
    let preventRepeats = Array.from(Array(gameContent.length), (_, x) => x);
    for (let i = 0; i < 4; i++) {
        let randInt = Math.floor(Math.random() * preventRepeats.length)
        let chosenWordsIndex = preventRepeats[randInt];
        preventRepeats.splice(randInt, 1);
        for (let j = 0; j < 4; j++) {
            let spliceIndex = Math.floor(Math.random() * gameWords.length)
            gameWords.splice(spliceIndex, 0, gameContent[chosenWordsIndex].words[j])
        }
    }
    for (i = 0; i < boxes.length; i++) {
        boxes[i].textContent = gameWords[i];
    }
    remainingBox.textContent = `Guesses remaining: ${remainingGuesses}`
};

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (box.style.border == '1px solid red') {
            box.style.border = '1px solid green';
            selected.splice(selected.indexOf(box.textContent), 1);
            submit.disabled = true;
        } else {
            box.style.border = '1px solid red';
            selected.push(box.textContent);
        }
        if (selected.length == 4) {
            submit.disabled = false;
        }
        if (selected.length > 4) {
            box.style.border = '1px solid green';
            selected.splice(selected.indexOf(box.textContent), 1);
        }
    })
})

function checkForMatches() {
    for (let i = 0; i < gameContent.length; i++) {
        findIndex = 0;
        for (let j = 0; j < selected.length; j++) {
            if (gameContent[i].words.includes(selected[j]) == true) {
                findIndex++
            }
        }
        if (findIndex > 2) {
            checkAgainstIndex = i;
        }
    }
    let matchCounter = 0;
    for (let l = 0; l < selected.length; l++) {
        if (gameContent[checkAgainstIndex].words.includes(selected[l]) == true) {
            matchCounter += 1;
        }
    }
    if (matchCounter == 4) {
        selected.forEach((word) => {
            let removalIndex = gameWords.indexOf(word);
            gameWords.splice(removalIndex, 1);
        })
        selected = [];
        resetBoxes();
        redistributeWords();
    } else if (matchCounter == 3) {
        oneAway.textContent = 'One away!'
        setTimeout(() => {
            oneAway.textContent = '';
        }, "2000");
        incorrectGuess();
    } else {
        selected = [];
        incorrectGuess();
        resetBoxes();
    }
}


function incorrectGuess() {
    submit.disabled = true;
    remainingGuesses--;
    if (remainingGuesses == 0) {
        remainingBox.textContent = `Sorry, you have no guesses left. Refresh the page to play again.`;
        shuffle.disabled = true;
    } else {
        remainingBox.textContent = `Guesses remaining: ${remainingGuesses}`;
    }
}

function resetBoxes() {
    boxes.forEach((box) => {
        box.style.border = '1px solid green';
    })
}

function redistributeWords() {
    groups[correctCounter].innerHTML = `<div class="correct-answer">
    <h3>Category: ${gameContent[checkAgainstIndex].category}</h3>
    <h5>${gameContent[checkAgainstIndex].words.toString().replaceAll(',', ', ')}</h5>
    </div>`
    for (n = 0; n < gameWords.length; n++) {
        boxes[n + ((correctCounter + 1) * 4)].textContent = gameWords[n];
    }
    correctCounter++;
    submit.disabled = 'true';
    if (correctCounter == 4) {
        remainingBox.textContent = 'Congratulations! Refresh the page to play again.'
    }
}

shuffle.addEventListener('click', function () {
    selected = [];
    for (let i = gameWords.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = gameWords[i];
        gameWords[i] = gameWords[j];
        gameWords[j] = temp;
    }
    for (n = 0; n < gameWords.length; n++) {
        boxes[n + (16 - gameWords.length)].textContent = gameWords[n];
        resetBoxes();
    }
})

submit.addEventListener('click', function () {
    checkForMatches();
})

clear.addEventListener('click', function () {
    selected = [];
    boxes.forEach((box) => {
        box.style.border = '1px solid green';
    })
})

setUpGame();
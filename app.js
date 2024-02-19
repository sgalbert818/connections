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
let group1 = document.querySelector('.group-1');
let group2 = document.querySelector('.group-2');
let group3 = document.querySelector('.group-3');
let group4 = document.querySelector('.group-4');
let selected = [];
let gameWords = [];
let checkAgainstIndex;

function setUpGame() {
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

    for (i=0; i<boxes.length; i++) {
        boxes[i].textContent = gameWords[i];
    }
};

boxes.forEach((box) => {
    box.addEventListener('click', function() {
        if (box.style.border == '1px solid red') {
            box.style.border = '1px solid green';
            selected.splice(selected.indexOf(box.textContent), 1);
        } else {
            box.style.border = '1px solid red';
            selected.push(box.textContent);
            if (selected.length == 4) {
                checkForMatches();
            }
        }
    })
})

function checkForMatches() {
    let matchCounter = 0;
    for (let k=0; k<gameContent.length; k++) {
        if (gameContent[k].words.includes(selected.sort()[0]) == true) {
            checkAgainstIndex = k;
        }
    }
    for (let l=0; l<selected.length; l++) {
        if (selected.sort()[l] == gameContent[checkAgainstIndex].words.sort()[l]) {
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
    } else {
        selected = [];
        resetBoxes();
    }
}

function resetBoxes() {
    boxes.forEach((box) => {
        box.style.border = '1px solid green';
    })
}

function redistributeWords() {
    group1.innerHTML = `<div class="correct-answer">
    <h3>Category: ${gameContent[checkAgainstIndex].category}</h3>
    <h5>${gameContent[checkAgainstIndex].words.toString().replaceAll(',', ', ')}</h5>
    </div>`
}

setUpGame();
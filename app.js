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
let selected = [];

function setUpGame() {
    let gameWords = [];
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

function checkForMatches() {
    console.log(selected.sort());
    console.log(gameContent[0].words.sort());
    if (selected.sort() === gameContent[0].words.sort()) {
        console.log('match');
    }
    /*for (let k=0; k<gameContent.length; k++) {
        if (selected.sort() == gameContent[k].words.sort()) {
            console.log('match detected');
        }
    }*/
}

boxes.forEach((box) => {
    box.addEventListener('click', function() {
        box.style.border = '1px solid red';
        selected.push(box.textContent);
        if (selected.length == 4) {
            checkForMatches();
        }
    })
})

setUpGame();
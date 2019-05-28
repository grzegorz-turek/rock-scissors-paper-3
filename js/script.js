var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonPaper = document.getElementById('paper');
var buttonNewGame = document.getElementById('new-game');
var output = document.getElementById('output');
var result = document.getElementById('result');
var finalResult = document.getElementById('final-result');
var message = document.getElementById('message');

var roundNumber = 0;
var roundWonByComputerNumber = 0;
var roundWonByPlayerNumber = 0;
var roundToWinNumber = 0;

buttonNewGame.addEventListener ('click', function() {
    roundToWinNumber = window.prompt('Specify game distance (number of rounds to win)');
    roundNumber = 0;
    roundWonByComputerNumber = 0;
    roundWonByPlayerNumber = 0;
    output.innerHTML = 'You started a New Game';
    finalResult.innerHTML = '';
    display();
});

function calculateWinner(playerMove) {
    if ((roundToWinNumber <= roundWonByComputerNumber) || (roundToWinNumber <= roundWonByPlayerNumber)) {
        pleasePressTheNewGameButton();
        return;
    } 
    var computerMove = getRandomIntInclusive(1, 3);
    if ((computerMove == 1 && playerMove == 2) || (computerMove == 2 && playerMove == 3) || (computerMove == 3 && playerMove == 1)) {
        output.innerHTML = 'ROUND LOST';
        roundWonByComputerNumber++;
    } else if (computerMove == playerMove) {
        output.innerHTML = 'TIE';
    } else {
        output.innerHTML = 'YOU WON';
        roundWonByPlayerNumber++;
    }
    roundCount();
    winnerWonEntireGameDisplay();
}

buttonRock.addEventListener ('click', function() {
        calculateWinner(1);
});

buttonScissors.addEventListener ('click', function() {
        calculateWinner(2);
});

buttonPaper.addEventListener ('click', function() {
        calculateWinner(3);
});

function pleasePressTheNewGameButton() {
    finalResult.innerHTML += 'Game over, please press the new game button !!!' + '<br>';
}

function winnerWonEntireGameDisplay() {
    if (roundToWinNumber == roundWonByComputerNumber) {
        output.innerHTML += ', COMPUTER WON ENTIRE GAME !!!';
    }
    if (roundToWinNumber == roundWonByPlayerNumber) {
        output.innerHTML += ', YOU WON ENTIRE GAME !!!';
    }
}

function roundCount() {
    roundNumber++;
    display();
}

function display() {
    result.innerHTML = '(You) ' + roundWonByPlayerNumber + ' - ' + roundWonByComputerNumber + ' (Computer)';
    message.innerHTML = 'The first one who wins ' + roundToWinNumber + ' rounds is the entire game winner';
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

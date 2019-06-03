'use strict';
(function(){
    var buttonRock = document.getElementById('rock');
    var buttonScissors = document.getElementById('scissors');
    var buttonPaper = document.getElementById('paper');
    var buttonNewGame = document.getElementById('new-game');
    var output = document.getElementById('output');
    var result = document.getElementById('result');
    var finalResult = document.getElementById('final-result');
    var message = document.getElementById('message');

    var params = {
        roundNumber: 0,
        roundWonByComputerNumber: 0,
        roundWonByPlayerNumber: 0,
        roundToWinNumber: 0,
        roundWinner: 0,
        computerMove: 0,
        progress: []
    };

    buttonNewGame.addEventListener ('click', function() {
        params.roundToWinNumber = window.prompt('Specify game distance (number of rounds to win)');
        params.roundNumber = 0;
        params.roundWonByComputerNumber = 0;
        params.roundWonByPlayerNumber = 0;
        params.progress = [];
        output.innerHTML = 'You started a New Game';
        finalResult.innerHTML = '';
        display();
    });

    function calculateWinner(playerMove) {
        if ((params.roundToWinNumber <= params.roundWonByComputerNumber) || (params.roundToWinNumber <= params.roundWonByPlayerNumber)) {
            pleasePressTheNewGameButton();
            return;
        }
        params.computerMove = newGetRandomIntInclusive();
        if ((params.computerMove == 'rock' && playerMove == 'scissors') || (params.computerMove == 'scissors' && playerMove == 'paper') || (params.computerMove == 'paper' && playerMove == 'rock')) {
            output.innerHTML = 'ROUND LOST';
            params.roundWonByComputerNumber++;
            params.roundWinner = 'computer';
        } else if (params.computerMove == playerMove) {
            output.innerHTML = 'TIE';
            params.roundWinner ='tie';
        } else {
            output.innerHTML = 'YOU WON';
            params.roundWonByPlayerNumber++;
            params.roundWinner = 'you';
        }
        roundCount();
        addGameStats(playerMove);
        winnerWonEntireGameDisplay();
    }

    var buttonClick = document.querySelectorAll('.player-move');
    buttonClick.forEach(function(arg1) {
        arg1.addEventListener('click', function() {
            var buttonAttribute = arg1.getAttribute('data-move');
            calculateWinner(buttonAttribute);
        });
    });

    function addGameStats(playerMove) {
        params.progress.push({
            keyRoundNumber: params.roundNumber,
            keyComputerMove: params.computerMove,
            keyPlayerMove: playerMove,
            keyRoundWinner: params.roundWinner,
            keyGameResult: (params.roundWonByPlayerNumber + ' - ' + params.roundWonByComputerNumber)
        });
    }

    function pleasePressTheNewGameButton() {
        finalResult.innerHTML += 'Game over, please press the new game button !!!' + '<br>';
    }

    function winnerWonEntireGameDisplay() {
        if (params.roundToWinNumber == params.roundWonByComputerNumber) {
            output.innerHTML += ', COMPUTER WON ENTIRE GAME !!!';
            showModalOne();
            document.getElementById('tablemessage').innerHTML = 'Computer won entire game!';

        }
        if (params.roundToWinNumber == params.roundWonByPlayerNumber) {
            output.innerHTML += ', YOU WON ENTIRE GAME !!!';
            showModalOne();
            document.getElementById('tablemessage').innerHTML = 'You won entire game!';
        }
    }

    function roundCount() {
        params.roundNumber++;
        display();
    }

    function display() {
        result.innerHTML = '(You) ' + params.roundWonByPlayerNumber + ' - ' + params.roundWonByComputerNumber + ' (Computer)';
        message.innerHTML = 'The first one who wins ' + params.roundToWinNumber + ' rounds is the entire game winner';
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function newGetRandomIntInclusive() {
        var getRandomIntInclusiveValue = getRandomIntInclusive(1, 3);
        switch(getRandomIntInclusiveValue) {
            case 1:
                return 'rock';
            case 2:
                return 'scissors';
            case 3:
                return 'paper';
            default:
                return 'error';
        }
    }

    var showModalOne = function() {
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('#modal-one').classList.add('show');
        showGameStats();
    };

    var hideModal = function(event) {
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    var closeButtons = document.querySelectorAll('.modal .close');
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }

    document.querySelector('#modal-overlay').addEventListener('click', hideModal);
    var modals = document.querySelectorAll('.modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    function createTableCell(container, content) {
        var div = document.createElement('div');
        container.appendChild(div);
        div.innerHTML += content;
    }

    function showGameStats() {
        var mainDiv = document.getElementById('modalcontent');
        mainDiv.innerHTML = '';
        var divContainer = document.createElement('div');
        mainDiv.appendChild(divContainer);
        divContainer.setAttribute('class', 'table__row');

        createTableCell(divContainer, 'Round Number');
        createTableCell(divContainer, 'Player Move');
        createTableCell(divContainer, 'Computer Move');
        createTableCell(divContainer, 'Round Winner');
        createTableCell(divContainer, 'Score');

        for (var i = 0; i < params.progress.length; i++) {
            var divContainer = document.createElement('div');
            mainDiv.appendChild(divContainer);
            divContainer.setAttribute('class', 'table__row');
            Object.values(params.progress[i]).forEach(function(el) {
                createTableCell(divContainer, el);
            })
        /*
        createTableCell(divContainer, params.progress[i].keyRoundNumber);
        createTableCell(divContainer, params.progress[i].keyPlayerMove);
        createTableCell(divContainer, params.progress[i].keyComputerMove);
        createTableCell(divContainer, params.progress[i].keyRoundWinner);
        createTableCell(divContainer, params.progress[i].keyGameResult);
        */
        }
    };
})();
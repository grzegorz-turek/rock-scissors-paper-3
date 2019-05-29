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

    var roundNumber = 0;
    var roundWonByComputerNumber = 0;
    var roundWonByPlayerNumber = 0;
    var roundToWinNumber = 0;

    var params = {
        roundNumber: roundNumber,
        roundWonByComputerNumber: roundWonByComputerNumber,
        roundWonByPlayerNumber: roundWonByPlayerNumber,
        roundToWinNumber: roundToWinNumber,
        progress: []
    };

    buttonNewGame.addEventListener ('click', function() {
        params.roundToWinNumber = window.prompt('Specify game distance (number of rounds to win)');
        params.roundNumber = 0;
        params.roundWonByComputerNumber = 0;
        params.roundWonByPlayerNumber = 0;
        output.innerHTML = 'You started a New Game';
        finalResult.innerHTML = '';
        display();
    });

    function calculateWinner(playerMove) {
        if ((params.roundToWinNumber <= params.roundWonByComputerNumber) || (params.roundToWinNumber <= params.roundWonByPlayerNumber)) {
            pleasePressTheNewGameButton();
            return;
        } 
        var computerMove = newGetRandomIntInclusive();
        if ((computerMove == 'rock' && playerMove == 'scissors') || (computerMove == 'scissors' && playerMove == 'paper') || (computerMove == 'paper' && playerMove == 'rock')) {
            output.innerHTML = 'ROUND LOST';
            params.roundWonByComputerNumber++;
        } else if (computerMove == playerMove) {
            output.innerHTML = 'TIE';
        } else {
            output.innerHTML = 'YOU WON';
            params.roundWonByPlayerNumber++;
        }
        roundCount();
        winnerWonEntireGameDisplay();
        addGameStats();


        console.log('computerMove:', computerMove, 'playerMove:', playerMove); // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
        console.log('params:', params); // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
        console.log('params.roundNumber:', params.roundNumber, 'params.roundWonByComputerNumber:', params.roundWonByComputerNumber, 'params.roundWonByPlayerNumber:', params.roundWonByPlayerNumber, 'params.roundToWinNumber:', params.roundToWinNumber); // TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
        console.log('params.progress:', params.progress);
//        console.log('params.progress[0]:', params.progress[0]);
    }

    var buttonClick = document.querySelectorAll('.player-move');
    buttonClick.forEach(function(arg1) {
        arg1.addEventListener('click', function() {
            var buttonAttribute = arg1.getAttribute('data-move');
            calculateWinner(buttonAttribute);
        });
    });

    function addGameStats () {
        params.progress.push({
            proundNumber: params.roundNumber,
            proundWonByComputerNumber: params.roundWonByComputerNumber,
            proundWonByPlayerNumber: params.roundWonByPlayerNumber,
            proundResult: 'x',
            pgameResult: 'y'
        });
    }




    function pleasePressTheNewGameButton() {
        finalResult.innerHTML += 'Game over, please press the new game button !!!' + '<br>';
    }

    function winnerWonEntireGameDisplay() {
        if (params.roundToWinNumber == params.roundWonByComputerNumber) {
            output.innerHTML += ', COMPUTER WON ENTIRE GAME !!!';
            showModalOne();
        }
        if (params.roundToWinNumber == params.roundWonByPlayerNumber) {
            output.innerHTML += ', YOU WON ENTIRE GAME !!!';
            showModalOne();
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
        var getRandomIntInclusiveValue = getRandomIntInclusive(1, 3)
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

	var showModalOne = function(){
		event.preventDefault();
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('#modal-one').classList.add('show');
    };
	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	var closeButtons = document.querySelectorAll('.modal .close');
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	var modals = document.querySelectorAll('.modal');
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
})(); 
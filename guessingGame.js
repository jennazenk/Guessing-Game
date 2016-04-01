/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {

	var playersGuess;
	var winningNumber = generateWinningNumber();
	var guessRemaining=5;
	var attempts = [];


	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor(Math.random()*100+1);
	};

	// Fetch the Players Guess

	function playersGuessSubmission(){
			playersGuess = +$('#guess').val();
			
			checkGuess();

			$('#guess').val("");
	};

	function lowerOrHigher(){
			if(playersGuess>winningNumber) {
				return "The number you picked is higher than the winning number. ";
			} else {
				return "The number you picked is lower than the winning number. ";

			}
		}

		//check if the player entered a number he already tried
	function duplicateCheck(x) {
		for(var i=0; i<attempts.length ; i++) {
			if(x===attempts[i]) {
				attempts.pop();
				return true;
			}
		}
		return false;
	}

		//feedback message for the player
	function guessMessage() {
		var one = lowerOrHigher();
		var two = (Math.abs(playersGuess- winningNumber));
		var feedback;

		if(two>30) {
			feedback = one + "The distance between your number and the winning number is greater than 30. ";
		} else if(two<=30 && two>=20) {
			feedback = one + "The distance between your number and the winning number ranges between 20 and 30. "
		} else if(two<20 && two>=10) {
			feedback = one + "The distance between your number and the winning number ranges between 10 and 20. "
		} else {
			feedback = one + "You are CLOSE. The distance between your number and the winning number is lower than 10. "
		}

		$('#guessMessage').text(feedback);
			
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		// add code here
		if(playersGuess === winningNumber) {
			$('#domMessage').text('Good catch, YOU WIN!!!!');
			$('#domMessage').css({'font-size': '60px', 'font-weight': 'bold', 'text-align': 'center', 'margin': '0', 'color': 'white', 'font-family': 'palatino','background-color':'green'});
			$(".guess").hide();
			$("#guessmessage").hide();
			$("#Hint").hide();
		} 

		else if(duplicateCheck(playersGuess)===true) {
			$('#domMessage').text('You already tried this number; input a different one ');
			$('#domMessage').css({'font-size': '50px', 'font-weight': 'bold', 'text-align': 'center', 'margin': '0', 'color': 'orange', 'font-family': 'palatino'});
		}

		else if(guessRemaining >=1) {
			guessRemaining--;
			attempts.push(playersGuess);

			if(guessRemaining===1) {
				$('#domMessage').text('Error. This is your last guess ! ');
				$('#domMessage').css({'font-size': '50px', 'font-weight': 'bold', 'text-align': 'center', 'margin': '0', 'color': 'orange', 'font-family': 'palatino'});
				guessMessage();
			} else if(guessRemaining>1){
				$('#domMessage').text('You have ' + guessRemaining + ' remaining guesses.');
				$('#domMessage').css({'font-size': '50px', 'font-weight': 'bold', 'text-align': 'center', 'margin': '0', 'color': 'black', 'font-family': 'palatino'});
				guessMessage();
			}
		}

		else if(guessRemaining===0) {
			$('#domMessage').text('GAME OVER. Reset if you want to give it another try.');
			$('#domMessage').css({'font-size': '60px', 'font-weight': 'bold', 'text-align': 'center', 'margin': '0', 'color': 'white', 'font-family': 'palatino','background-color':'red'});
			$(".guess").hide();
			$("#guessmessage").hide();
			$("#Hint").hide();
		}
	}

	function provideHint(){
		var hints = [];

		
		if(guessRemaining === 5) {
			$("#domMessage").text('You need to give a first shot before being able to earn a hint.');
		} else if(guessRemaining===4) {
			hints = [Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1), winningNumber, Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1), Math.floor(Math.random()*100), Math.floor(Math.random()*100)];
			$('#hintMessage').text('The winning number is between those number : '+ hints);
		} else if(guessRemaining===3) {
			hints = [Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1), winningNumber, Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1)];
			$('#hintMessage').text('The winning number is between those number : '+ hints);
		} else if(guessRemaining===2) {
			hints = [Math.floor(Math.random()*100+1), winningNumber, Math.floor(Math.random()*100+1), Math.floor(Math.random()*100+1)];
			$('#hintMessage').text('The winning number is between those number : '+ hints);
		} else if(guessRemaining===1) {
			hints = [winningNumber, Math.floor(Math.random()*100+1)];
			$('#hintMessage').text('The winning number is between those number : '+ hints);
		}
	}

function playAgain(){
	window.location.reload();
	
}

/* **** Event Listeners/Handlers ****  */
$("#submit").click(playersGuessSubmission);
$("#hint").click(provideHint);
$("#reset").click(playAgain);

});
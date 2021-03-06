
// deal two cards cards to both the player and the dealer (dealer card shows the back)

(function () {

	let deck = [];
	let dealer = [];
	let player = [];

	function deal() {
	var dealButton = document.getElementById('deal');
	dealButton.addEventListener('click', function (){
	document.getElementById("deal").style.visibility = "hidden";
	document.getElementById("hit").className = "shown";
	document.getElementById("stand").className = "shown";
	
		deck = shuffle();
		console.log(deck);

		player.push(deck.shift());
		dealer.push(deck.shift());
		player.push(deck.shift());
		dealer.push(deck.shift());

		console.log(deck);
		
// show the player and dealer cards on the table - the player goes first so the dealer cards are not shown yet.

		var playerCards = document.getElementById('playerCards');
		showCardOnTable(player[0], playerCards, true);
		showCardOnTable(player[1], playerCards, true);
		console.log('player: ', player);
		console.log(getHandValue(player));

		var dealerCards = document.getElementById('dealerCards');
			showCardOnTable(dealer[0], dealerCards, true);
			showCardOnTable(dealer[1], dealerCards, false)
			console.log('dealer: ', dealer);
			console.log(getHandValue(dealer));
	
	//var totalDealerHand = getCardValue(dealer[0]) + getCardValue(dealer[1]);
				//console.log(totalDealerHand);
//This is if the player or both have blackjack
		var winner;
				if (getHandValue(dealer) === 21 && getHandValue(player) !== 21) {
					var winner = "Dealer";
					return showWinner();
				}
				else if(getHandValue(player) === 21 && getHandValue(dealer) !== 21) {
					var winner = "Player";
					return showWinner();
				}
				else if(getHandValue(dealer) === 21 && getHandValue(player) === 21) {
					var winner = "No One";
					return showWinner();
				}
	
	})
	deal();
	}
	

	//This function shows the front of the card if the card is showing isFaceUp

	function showCardOnTable(card, cardsDiv, isFaceUp) {
		
				var cardImage = document.createElement('img');
		
				cardImage.classList.add('card');
		
				if (isFaceUp) {
					cardImage.src = 'img/' + card + '.png';
				}
				else {
					cardImage.src = 'img/back.png';
				}
				cardsDiv.appendChild(cardImage);
			}

	//Hit Button
	var hitButton = document.getElementById('hit');
	
	hitButton.addEventListener('click', function () {
		
		player.push(deck.shift());

		console.log('player: ', player);
		console.log(deck);

		if (getHandValue(player) === 21) {
			var winner = "Player";
			return showWinner();
			
		}
		if (getHandValue(player) > 21) {
			var winner = "Dealer";
			return showWinner();
		
		}
		else if(getHandValue(player) < 21) {
			alert("Want to Hit Again? " + "You only have " + getHandValue(player));
	}
	
	})
	
	//Stand Button

	var standButton = document.getElementById('stand');
	

	standButton.addEventListener('click', function () {
		document.getElementById("hit").className = "hidden";
		document.getElementById("stand").className = "hidden";
		
		dealer.push(deck.shift());
		showCardOnTable(dealer[2], dealerCards, true);

	})


//get value for player hand

function getHandValue(player) {
	var sum = 0
	for (var i = 0; i < player.length; i++) {
	  sum += getCardValue(player[i]);
	}
	return sum;
}
console.log(getHandValue(player));

//get value for dealer hand

function getHandValue(dealer) {
	var sum = 0
	for (var i = 0; i < dealer.length; i++) {
	  sum += getCardValue(dealer[i]);
	}
	return sum;
}
console.log(getHandValue(dealer));

//get value for a single card


/*function getCardValue(handType) {

	for (var i = 0; i <= handType.length; i++) {
	  return getCardValue(handType[i]);
	}
}
console.log("Card Value " + getHandValue(dealer));
*/

//Show Winner Function
function showWinner(winner) {
	if (winner === "Player") {
	alert(winner + " Wins!" + "Your Hand Was " + getHandValue(player));
}
else if (winner === "Dealer") {
	alert(winner + " Wins!" + "Your Hand Was " + getHandValue(dealer));
}
else if (winner === "No One") {
	alert(winner + " Wins!");
}
return alert(winner);
}

/*Play Again Button
function playAgain(deal) {
	playAgainButton = document.getElementById('playagain');
	playAgainButton.addEventListener('click', function (){
	//return playAgain(deal());
})
console.log(playAgain);
}
*/


// This function gets the value of the card to count with

	function getCardValue(card) {
		switch (card[0]) {
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				return parseInt(card[0]);
			break;
			case '1':
			case 'J':
			case 'Q':
			case 'K':
				return 10;
			break;
			default:
				return 11;
		}
	}

	
	


	function shuffle() {
		
				// Fisher–Yates Shuffle        
				// Source: https://bost.ocks.org/mike/shuffle/
		
				let array = [
					'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
					'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
					'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
					'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
				];
			
				var m = array.length, t, i;
		
				// While there remain elements to shuffle…
				while (m) {
		
					// Pick a remaining element…
					i = Math.floor(Math.random() * m--);
		
					// And swap it with the current element.
					t = array[m];
					array[m] = array[i];
					array[i] = t;
				}
		
				return array;
			}

})();

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
		
				console.log('dealer: ', dealer);
				console.log(getHandValue(dealer));
	
					if (getHandValue(dealer) === 21 && getHandValue(player) !== 21) {
						showCardOnTable(dealer[1], dealerCards, true);
						return showWinner();
					}
					else if(getHandValue(dealer) === 21 && getHandValue(player) === 21) {
						showCardOnTable(dealer[1], dealerCards, true);
						return showWinner();
					}
					else if(getHandValue(dealer) < 21 && getHandValue(player) === 21) {
						showCardOnTable(dealer[1], dealerCards, true);
						return showWinner();
					}
					else {
						showCardOnTable(dealer[1], dealerCards, false);
				}
		})
		}
		deal();

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
			var newCard = player[player.length -1];
			showCardOnTable(newCard, playerCards, true);

            console.log('player: ', player);
			console.log(deck);
			
			if (getHandValue(player) === 21) {
                return showWinner();
                document.getElementById("playagain").className = "shown";
                document.getElementById("hit").className = "hidden";
                document.getElementById("stand").className = "hidden";
            }
            if (getHandValue(player) > 21) {
                return showWinner();
                document.getElementById("playagain").className = "shown";
                document.getElementById("hit").className = "hidden";
                document.getElementById("stand").className = "hidden";
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

			while (getHandValue(dealer) < 16) {
				dealer.push(deck.shift());
			}
			return showWinner();
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
	
	
	//show Winner Function 
	function showWinner() {
		if (getHandValue(dealer) === 21 && getHandValue(player) !== 21) {
			alert("Dealer Wins! With a Score of " + getHandValue(dealer));
		}
		else if(getHandValue(dealer) === 21 && getHandValue(player) === 21) {
			alert("Its A Push and No one Wins ");
		}
		else if(getHandValue(dealer) < 21 && getHandValue(player) === 21) {
			alert("Player Wins! With a Score of " + getHandValue(player));
		}
		else if(getHandValue(dealer) > 21 && getHandValue(player) < 21) {
			alert("Dealer is Bust and Player Wins With a Score of " + getHandValue(player));
		}
		else if (getHandValue(player) > 21 && getHandValue(dealer) < 21) {
			alert("Player is Bust and Delaer Wins With a Score of " + getHandValue(dealer));
	}
	else if (getHandValue(player) < 21 && getHandValue(dealer) < 21) {
		if (getHandValue(player) > getHandValue(dealer)) {
		    alert("Player Wins With a Score of " + getHandValue(player));
		}
		else {
			alert("Dealer Wins! With a Score of " + getHandValue(dealer));
		}
	
}

}
	//Play Again Button

	
	
	// This function gets the value of a single card
	
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
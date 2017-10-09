(function () {
	var dealButton = document.getElementById('deal');


	let deck = [
		'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
		'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
		'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
		'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
	];

	let dealer = [];
	let player = [];

	dealButton.addEventListener('click', function () {
		deck = shuffle(deck);
		
		console.log(deck);

		player.push(deck.shift());
		dealer.push(deck.shift());
		player.push(deck.shift());
		dealer.push(deck.shift());

		console.log('player: ', player);

		var playerCards = document.getElementById('playerCards');

		showCardOnTable(player[0], playerCards, true);
		showCardOnTable(player[1], playerCards, true);

	})

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
			case '1':
			case 'J':
			case 'Q':
			case 'K':
				return 10;
			default:
				return 11;
		}
	}

	function shuffle(array) {

		// Fisher–Yates Shuffle		
		// Source: https://bost.ocks.org/mike/shuffle/

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
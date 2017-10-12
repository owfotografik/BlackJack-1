// deal two cards cards to both the player and the dealer (dealer card shows the back)

(function () {

    //need to put all variables at the top
    var playerBetInput = document.getElementById('playerBetInput');
    var playerCards = document.getElementById('playerCards');
    var dealerCards = document.getElementById('dealerCards');

    var dealButton = document.getElementById('deal');
    var playAgainButton = document.getElementById('playagain');
    var hitButton = document.getElementById('hit');
    var standButton = document.getElementById('stand');

    let deck = [];
    let dealer = [];
    let player = [];

    let dealerPoints = 0;
    let playerPoints = 0;
    let playerBank = 100;
    let playerBet = 5;

    dealButton.addEventListener('click', function () {
        deal();
        document.getElementById("deal").style.visibility = "hidden";
        document.getElementById("hit").classList.remove("hidden");
        document.getElementById("stand").classList.remove("hidden");
    })

    function deal() {
        deck = shuffle();
        console.log(deck);

        player.push(deck.shift());
        dealer.push(deck.shift());
        player.push(deck.shift());
        dealer.push(deck.shift());
        playerBet = playerBetInput.valueAsNumber;
        playerBank -= playerBet;
        document.getElementById("playerBankDiv").innerHTML = "\$" + playerBank;



        // show the player and dealer cards on the table - the player goes first so the dealer cards are not shown yet.

        showCardOnTable(player[0], playerCards, true);
        showCardOnTable(player[1], playerCards, true);
        showCardOnTable(dealer[0], dealerCards, true);
        showCardOnTable(dealer[1], dealerCards, false);

        dealerPoints = getHandValue(dealer);
        playerPoints = getHandValue(player);
        
        console.log(dealerPoints);
        console.log(playerPoints);
        //Blackjack with First Deal

        if (dealerPoints === 21 || playerPoints === 21) {
            showWinner();
        }
      

    }


    //This function shows the front of the card if the card is showing isFaceUp

    function showCardOnTable(card, cardsDiv, isFaceUp) {

        var cardImage = document.createElement('img');

        cardImage.classList.add('card');
        cardImage.id = card;

        if (isFaceUp) {
            cardImage.src = 'img/' + card + '.png';
        }
        else {
            cardImage.src = 'img/back.png';
        }
        cardsDiv.appendChild(cardImage);
    }

    //Hit Button

    hitButton.addEventListener('click', function () {

        //add a card and then show faceup the last card in the array
        player.push(deck.shift());
        var newCard = player[player.length - 1];
        showCardOnTable(newCard, playerCards, true);
        ///end show card


        playerPoints = getHandValue(player);
        console.log(playerPoints);
        if (playerPoints > 21) {
            showWinner();
        }

    })

    //Stand Button

    standButton.addEventListener('click', function () {
        document.getElementById("hit").classList.add("hidden");
        document.getElementById("stand").classList.add("hidden");

        //need to now show the dealer card faceup
        var downCard = document.getElementById(dealer[1]);
        downCard.src = 'img/' + dealer[1] + '.png';
        ///////
        while (dealerPoints < 17) {
            dealer.push(deck.shift());
            var newCard = dealer[dealer.length - 1];
            showCardOnTable(newCard, dealerCards, true);
            dealerPoints = getHandValue(dealer);
        }
        document.getElementById("playagain").className = "shown";
        showWinner();

    })

    //get value for hand

    function getHandValue(hand) {
        var total = 0;
        var nonAces = [];
        var aces = [];

        nonAces = hand.filter(function (card) {
            return card[0] !== "A";

        });
        aces = hand.filter(function (card) {
            return card[0] === "A";

        });

        nonAces.forEach(function (card) {
            total += getCardValue(card);

        });

        aces.forEach(function (card) {
            total += getCardValue(card);
            if (total > 21) {
                total -= 10;
            }
        });
        return total;
    }

    //show Winner Function

    function showWinner() {
        var isWinner = true;
        if (dealerPoints === 21 && playerPoints !== 21) {
            isWinner = false;
            document.getElementById("winner").classList.add("alert-danger");
            document.getElementById("winner").innerHTML = ("Dealer Wins!" + "<br>" + "With a Score of " + dealerPoints + "<br>" + "Player loses " + "\$" + playerBet);
        }
        else if (dealerPoints < 21 && playerPoints === 21) {
            document.getElementById("winner").classList.add("alert-success");
            document.getElementById("winner").innerHTML = ("Player Wins!" + "<br>" + "With a Score of " + playerPoints + "<br>" + "Player wins " + "\$" + playerBet);
        }
        else if (dealerPoints > 21 && playerPoints < 21) {
            document.getElementById("winner").classList.add("alert-success");
            document.getElementById("winner").innerHTML = ("Dealer is Bust" + "<br>" + "Player Wins With a Score of " + playerPoints + "<br>" + "Player wins " + "\$" + playerBet);
        }
        else if (playerPoints > 21 && dealerPoints < 21) {
            isWinner = false;
            document.getElementById("winner").classList.add("alert-danger");
            document.getElementById("winner").innerHTML = ("Player is Bust!" + "<br>" + "Dealer Wins With a Score of " + dealerPoints + "<br>" + "Player loses " + "\$" + playerBet);
        }
        else if (dealerPoints === 21 & playerPoints === 21) {
            isWinner = false;
            document.getElementById("winner").classList.add("alert-success");
            document.getElementById("winner").innerHTML = ("Its A Push and No one Wins ");
        }
        else if (dealerPoints === playerPoints && (dealerPoints < 21 && playerPoints) < 21) {
            isWinner = false;
            document.getElementById("winner").classList.add("alert-warning");
            document.getElementById("winner").innerHTML = ("Its A Push and No one Wins ");
        }
        else if (playerPoints < 21 && dealerPoints < 21) {
            if (playerPoints > dealerPoints) {
                document.getElementById("winner").classList.add("alert-success");
                document.getElementById("winner").innerHTML = ("Player Wins!" + "<br>" + "With a Score of " + playerPoints + "<br>" + "Player wins " + "\$" + playerBet);
            }
            else if (playerPoints < dealerPoints) {
                isWinner = false;
                document.getElementById("winner").classList.add("alert-danger");
                document.getElementById("winner").innerHTML = ("Dealer Wins!" + "<br>" + "With a Score of " + dealerPoints + "<br>" + "Player loses " + "\$" + playerBet);
            }
        }

        if (isWinner) {
            playerBank += playerBet * 2;
            document.getElementById("playerBankDiv").innerHTML = playerBank;
        }
        document.getElementById("winner").classList.remove("hidden");
        document.getElementById("playagain").classList.remove("hidden");
        document.getElementById("hit").classList.add("hidden");
        document.getElementById("stand").classList.add("hidden");

    }
    //Play Again Button

    playAgainButton.addEventListener('click', function () {
        document.getElementById("playerCards").innerHTML = " ";
        document.getElementById("dealerCards").innerHTML = " ";
        document.getElementById("hit").classList.remove("hidden");
        document.getElementById("stand").classList.remove("hidden");

        deck = [];
        dealer.length = 0;
        player.length = 0;
        deal();
        document.getElementById("playagain").classList.add("hidden");
        document.getElementById("winner").classList.remove("alert-danger");
        document.getElementById("winner").classList.remove("alert-success");
        document.getElementById("winner").innerHTML = " ";
    })

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
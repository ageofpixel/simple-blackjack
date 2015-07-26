/**
 * Created by Andrei on 20/07/2015.
 *
 * Basic blackjack game
 * Available money starts at 500
 */
$(function(){
    deal();

    /**
     * Reset the game, starting a new one
     */
    function resetGame() {
        // Reset
        $(".dealer-cards").html("<div class='card card1'></div><div class='card card2 flipped'></div><div class='new-cards'></div><div class='clear'></div><div id='dealerTotal' class='dealer-total'></div>");
        $(".player-cards").html("<div class='card card1'></div><div class='card card2'></div><div class='new-cards'></div><div class='clear'></div><div id='playerTotal' class='player-total'></div>");

        var reloadGame = "<button type='button' class='btn btn-primary' id='hit'>Hit</button><button type='button' class='btn btn-primary' id='stand'>Stand</button><button type='button' class='btn btn-primary' id='new-game'>New Game</button>";
        $(".buttons").html(reloadGame);

        $(".dealer-cards").css("width","");
        $(".player-cards").css("width","");

        $("#playerTotal").html("");
        $("#dealerTotal").html("");
        $("#message").html("");
    }

    /**
     * Deal out the initial hands and start the game
     */
    function deal() {
        resetGame();

        // Store card ranks and values
        var cards = [
            ["ace-of-clubs", 11],
            ["two-of-clubs", 2],
            ["three-of-clubs", 3],
            ["four-of-clubs", 4],
            ["six-of-clubs", 5],
            ["six-of-clubs", 6],
            ["seven-of-clubs", 7],
            ["eight-of-clubs", 8],
            ["nine-of-clubs", 9],
            ["ten-of-clubs", 10],
            ["jack-of-clubs", 10],
            ["queen-of-clubs", 10],
            ["king-of-clubs", 10],
            ["ace-of-spades", 11],
            ["two-of-spades", 2],
            ["three-of-spades", 3],
            ["four-of-spades", 4],
            ["six-of-spades", 5],
            ["six-of-spades", 6],
            ["seven-of-spades", 7],
            ["eight-of-spades", 8],
            ["nine-of-spades", 9],
            ["ten-of-spades", 10],
            ["jack-of-spades", 10],
            ["queen-of-spades", 10],
            ["king-of-spades", 10],
            ["ace-of-hearts", 11],
            ["two-of-hearts", 2],
            ["three-of-hearts", 3],
            ["four-of-hearts", 4],
            ["six-of-hearts", 5],
            ["six-of-hearts", 6],
            ["seven-of-hearts", 7],
            ["eight-of-hearts", 8],
            ["nine-of-hearts", 9],
            ["ten-of-hearts", 10],
            ["jack-of-hearts", 10],
            ["queen-of-hearts", 10],
            ["king-of-hearts", 10],
            ["ace-of-diamonds", 11],
            ["two-of-diamonds", 2],
            ["three-of-diamonds", 3],
            ["four-of-diamonds", 4],
            ["six-of-diamonds", 5],
            ["six-of-diamonds", 6],
            ["seven-of-diamonds", 7],
            ["eight-of-diamonds", 8],
            ["nine-of-diamonds", 9],
            ["ten-of-diamonds", 10],
            ["jack-of-diamonds", 10],
            ["queen-of-diamonds", 10],
            ["king-of-diamonds", 10]
        ];

        // Get the dealer's score
        var dealerTotal = 0;
        $(".dealer-cards .card").each(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num][0];

            // Display the card on screen
            $(this).addClass(cardClass);
            // Store tha card's value
            $(this).attr("data-value", cards[num][1]);

            // Add to the dealer's current score
            dealerTotal = parseInt(dealerTotal) + parseInt(cards[num][1]);

            // If the dealer gets an Ace, determine whether it is worth 1 or 11
            if (dealerTotal > 21) {
                $(".dealer-cards .card").each(function(){
                    if ($(this).attr("data-value") === 11) {
                        dealerTotal = parseInt(dealerTotal) - 10;
                        $(this).attr("data-value", 1);
                    }
                });
            }

            // Display the dealer's score
            $("#dealerTotal").html(dealerTotal);

            cards.splice(num, 1);
        });

        // Get the player's score
        var playerTotal = 0;
        $(".player-cards .card").each(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num][0];

            // Display the card on screen
            $(this).addClass(cardClass);
            // Store tha card's value
            $(this).attr("data-value", cards[num][1]);

            // Add to the player's current score
            playerTotal = parseInt(playerTotal) + parseInt(cards[num][1]);

            // If the player gets an Ace, determine whether it is worth 1 or 11
            if (playerTotal > 21) {
                $(".player-cards .card").each(function(){
                    if ($(this).attr("data-value") === 11) {
                        playerTotal = parseInt(playerTotal) - 10;
                        $(this).attr("data-value", 1);
                    }
                });
            }

            // Display the player's score
            $("#playerTotal").html(playerTotal);

            cards.splice(num, 1);
        });

        // If the player hits
        $("#hit").click(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num][0];

            // Display the card on screen
            var newCard = "<div class='card " +  cardClass + "' data-value='" + cards[num][1] + "'></div>";
            $(".player-cards .new-cards").append(newCard);

            // Add to the player's current score
            playerTotal = parseInt(playerTotal) + parseInt(cards[num][1]);

            // If the player gets an Ace, determine whether it is worth 1 or 11
            if (playerTotal > 21) {
                $(".player-cards .card").each(function(){
                    if ($(this).attr("data-value") === 11) {
                        playerTotal = parseInt(playerTotal) - 10;
                        $(this).attr("data-value", 1);
                    }
                });
            }

            cards.splice(num, 1);
            //values.splice(num, 1);

            // Display the player's score
            $("#playerTotal").html(playerTotal);
            $(".player-cards").width($(".player-cards").width() + 84);

            // New game if the player goes over 21
            if(playerTotal > 21){
                $("#message").html('Bust!');
                var reloadGame = "<button type='button' class='btn btn-primary' id='deal'>Deal</button>";
                $(".buttons").html(reloadGame);
                /// Pay up
                $("#bet").html('0');
                return false;
            }

        });

        // If player chooses to stand
        $("#stand").click(function(){
            $("#dealerTotal").css("visibility","visible");
            $(".card2").removeClass("flipped");

            // Keep adding a card until over 17 or the dealer busts
            var continueDealing = setInterval(function(){
                var dealerTotal = $("#dealerTotal").html();
                var playerTotal = $("#playerTotal").html();

                // If there are Aces
                if (dealerTotal > 21) {
                    $(".dealer-cards .card").each(function(){
                        // Keep checking if over 21 in the loop
                        if ($(this).attr("data-value") === 11 && dealerTotal > 21) {
                            dealerTotal = parseInt(dealerTotal) - 10;
                            $(this).attr("data-value", 1);
                        }
                    });
                }

                // Player wins if the dealer goes over 21
                if (dealerTotal > 21) {
                    $("#message").html('Dealer Bust! Play again?');
                    var reloadGame = "<button type='button' class='btn btn-primary' id='deal'>Deal</button>";
                    $(".buttons").html(reloadGame);
                    // Stop dealing out cards to the dealer
                    clearInterval(continueDealing);

                    // Pay up
                    var bet = $("#bet").html();
                    var money = $("#money").html();
                    var winnings = bet * 2;
                    $("#bet").html('0');
                    $("#money").html(parseInt(winnings) + parseInt(money));
                    return false;
                }

                // When the dealer's score is 17 or higher
                if (dealerTotal >= 17 && dealerTotal <= 21) {
                    // Player wins if their score is higher than the dealer and is not higher than 21
                    if (playerTotal > dealerTotal && playerTotal <= 21) {
                        $("#message").html('You Win! Play again?');

                        // Pay up
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        var winnings = bet * 2;
                        $("#bet").html('0');
                        $("#money").html(parseInt(winnings) + parseInt(money));
                    }

                    // Dealer wins if their score is higher than the player and is not higher than 21
                    if (playerTotal < dealerTotal && dealerTotal <= 21) {
                        $("#message").html('You Lose! Play again?');

                        // Pay up
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        $("#bet").html('0');
                        $("#money").html(parseInt(money) - parseInt(bet));

                        if (money === 0) {
                            $("#message").html('You have run out of funds! Play again?');
                        }
                    }

                    // If the score is even
                    if (playerTotal === dealerTotal) {
                        $("#message").html('Push!');
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        $("#money").html(parseInt(bet) + parseInt(money));
                        $("#bet").html('0');
                    }

                    var reloadGame = "<button type='button' class='btn btn-primary' id='deal'>Deal</button>";
                    $(".buttons").html(reloadGame);
                    clearInterval(continueDealing);
                    return false;
                }

                // Get a random number between 1 - 52
                var num = Math.floor(Math.random()*cards.length);
                // Get the card rank
                var cardClass = cards[num][0];

                // Display the card on screen
                var newCard = "<div class='card " +  cardClass + "' data-value='" + cards[num][1] + "'></div>";
                $(".dealer-cards .new-cards").append(newCard);

                // Add to the dealer's current score
                dealerTotal = parseInt(dealerTotal) + parseInt(cards[num][1]);

                $("#dealerTotal").html(dealerTotal);
                $(".dealer-cards").width($(".dealer-cards").width() + 84);

                cards.splice(num, 1);

            }, 500);
        });

        // Reset funds and start a new game
        $("#new-game").click(function(){
            resetGame();
        });

    }

    /**
     * Increase the current bet
     */
    $("#more").click(function(){
        var bet = 10;
        var currentBet = $("#bet").html();
        var money = $("#money").html();

        if (money === 0) {
            $("#message").html('You have no available funds.');
            return false;
        }

        if (currentBet) {
            $("#bet").html(parseInt(currentBet) + bet);
        } else {
            $("#bet").html(bet);
        }

        $("#money").html(money - bet);
    });

    /**
     * Decrease the current bet
     */
    $("#less").click(function(){
        var bet = -10;
        var currentBet = $("#bet").html();
        if (currentBet === 0) {
            return false;
        }

        var money = $("#money").html();

        if (currentBet) {
            $("#bet").html(parseInt(currentBet) + bet);
        } else {
            $("#bet").html(bet);
        }

        $("#money").html(money - bet);
    });

    /**
     * Run the deal() function on a set interval
     */
    setInterval(function(){
        $("#deal").unbind('click');
        $("#deal").click(function(){
            deal();
        });
    }, 500);

});
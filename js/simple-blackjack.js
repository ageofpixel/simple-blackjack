/**
 * Created by Andrei on 20/07/2015.
 *
 * Basic blackjack game
 * Available money starts at 500
 *
 * @Todo Reset available money balance if the player's balance reaches zero
 * @Todo Set different amounts for increasing/decreasing the bet
 * @Todo Add a better messaging system to let the player know if they win or lose
 * @Todo Better use of available screen space
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

        var reloadGame = "<div class='btn' id='hit'>Hit</div><div class='btn' id='stand'>Stand</div>";
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

        // Store card ranks in an array
        var cards = ["ace-of-clubs",
            "two-of-clubs",
            "three-of-clubs",
            "four-of-clubs",
            "five-of-clubs",
            "six-of-clubs",
            "seven-of-clubs",
            "eight-of-clubs",
            "nine-of-clubs",
            "ten-of-clubs",
            "jack-of-clubs",
            "queen-of-clubs",
            "king-of-clubs",
            "ace-of-spades",
            "two-of-spades",
            "three-of-spades",
            "four-of-spades",
            "five-of-spades",
            "six-of-spades",
            "seven-of-spades",
            "eight-of-spades",
            "nine-of-spades",
            "ten-of-spades",
            "jack-of-spades",
            "queen-of-spades",
            "king-of-spades",
            "ace-of-hearts",
            "two-of-hearts",
            "three-of-hearts",
            "four-of-hearts",
            "five-of-hearts",
            "six-of-hearts",
            "seven-of-hearts",
            "eight-of-hearts",
            "nine-of-hearts",
            "ten-of-hearts",
            "jack-of-hearts",
            "queen-of-hearts",
            "king-of-hearts",
            "ace-of-diamonds",
            "two-of-diamonds",
            "three-of-diamonds",
            "four-of-diamonds",
            "five-of-diamonds",
            "six-of-diamonds",
            "seven-of-diamonds",
            "eight-of-diamonds",
            "nine-of-diamonds",
            "ten-of-diamonds",
            "jack-of-diamonds",
            "queen-of-diamonds",
            "king-of-diamonds"];

        // Store correlating values in an array
        var values = [11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10];

        // Get the dealer's score
        var dealerTotal = 0;
        $(".dealer-cards .card").each(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num];

            // Display the card on screen
            $(this).addClass(cardClass);
            // Store tha card's value
            $(this).attr("data-value",values[num]);

            // Add to the dealer's current score
            dealerTotal = parseInt(dealerTotal) + parseInt(values[num]);

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
            values.splice(num, 1);
        });

        // Get the player's score
        var playerTotal = 0;
        $(".player-cards .card").each(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num];

            // Display the card on screen
            $(this).addClass(cardClass);
            // Store tha card's value
            $(this).attr("data-value",values[num]);

            // Add to the player's current score
            playerTotal = parseInt(playerTotal) + parseInt(values[num]);

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
            values.splice(num, 1);
        });

        // If the player hits
        $("#hit").click(function(){
            // Get a random number between 1 - 52
            var num = Math.floor(Math.random()*cards.length);
            // Get the card rank
            var cardClass = cards[num];

            // Display the card on screen
            var newCard = "<div class='card " +  cardClass + "' data-value='" + values[num] + "'></div>";
            $(".player-cards .new-cards").append(newCard);

            // Add to the player's current score
            playerTotal = parseInt(playerTotal) + parseInt(values[num]);

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
            values.splice(num, 1);

            // Display the player's score
            $("#playerTotal").html(playerTotal);
            $(".player-cards").width($(".player-cards").width() + 84);

            // New game if the player goes over 21
            if(playerTotal > 21){
                $("#message").html('Bust!');
                var reloadGame = "<div class='btn' id='deal'>Deal</div>";
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
                    $("#message").html('Dealer Bust!');
                    var reloadGame = "<div class='btn' id='deal'>Deal</div>";
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
                        $("#message").html('You Win!');

                        // Pay up
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        var winnings = bet * 2;
                        $("#bet").html('0');
                        $("#money").html(parseInt(winnings) + parseInt(money));
                    }

                    // Dealer wins if their score is higher than the player and is not higher than 21
                    if (playerTotal < dealerTotal && dealerTotal <= 21) {
                        $("#message").html('You Lose!');

                        // Pay up
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        $("#bet").html('0');
                        $("#money").html(parseInt(money) - parseInt(bet));
                    }

                    // If the score is even
                    if (playerTotal === dealerTotal) {
                        $("#message").html('Push!');
                        var bet = $("#bet").html();
                        var money = $("#money").html();
                        $("#money").html(parseInt(bet) + parseInt(money));
                        $("#bet").html('0');
                    }

                    var reloadGame = "<div class='btn' id='deal'>Deal</div>";
                    $(".buttons").html(reloadGame);
                    clearInterval(continueDealing);
                    return false;
                }

                // Get a random number between 1 - 52
                var num = Math.floor(Math.random()*cards.length);
                // Get the card rank
                var cardClass = cards[num];

                // Display the card on screen
                var newCard = "<div class='card " +  cardClass + "' data-value='" + values[num] + "'></div>";
                $(".dealer-cards .new-cards").append(newCard);

                // Add to the dealer's current score
                dealerTotal = parseInt(dealerTotal) + parseInt(values[num]);

                $("#dealerTotal").html(dealerTotal);
                $(".dealer-cards").width($(".dealer-cards").width() + 84);

                cards.splice(num, 1);
                values.splice(num, 1);

            }, 500);
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
// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}

// created a play again button that is hidden until the game is over
let playAgainButton = document.getElementById("playAgainButton");
playAgainButton.style.display = "none";
// add event listener to the button which would call playAgain function 
playAgainButton.addEventListener("click", playAgain);

// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayerOne() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        let randomDamage = Math.floor(Math.random() * 20);
        playerTwoHealthNum -= randomDamage
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;
        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealthNum = 0;
            playerTwoHealth.innerHTML = 0;
            // ends the game
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;
            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
}

// similar to the previous function, this second function changes the ui accordingly
function changePlayerTwo() {
    if (gameState.whoseTurn === 2) {
// declared variables so that they can be manipulated when player two attacks
        let playerOneHealth = document.getElementById("playerOneHealth");
// used Number() to convert string to number value
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
// used Math.floor to round to round down Math.random's number 
// then multiplied that number by 20 to get a larger number
        let randomDamage = Math.floor(Math.random() * 20);
// subtract the damage from player one's health when function is called
        playerOneHealthNum -= randomDamage;
// decalared the number in the playerOneHealth in html to the playerOneHealthNum variable in js
        playerOneHealth.innerHTML = playerOneHealthNum;
// used if statement so that if player one's health is below 0 then call the gameOver function
        if (playerOneHealthNum <= 0) {
            playerOneHealthNum = 0;
            playerOneHealth.innerHTML = 0;
            gameOver();
        }
// if player one's health is not less than or equal to 0 then change whoseTurn value 
        else {
            gameState.whoseTurn = 1;
            let playerName = document.getElementById("playerName");
// change html element according to whose player turn it is
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
    
}



// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
// when gameOver function is called set gameOver value to true
    gameState.gameOver = true;
    let title = document.getElementById("title");
// hide title html element
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
// hide player turn html element 
    playerTurnDisplay.style = "display: none;";
// display winning player 
    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`
// display game over screen
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
// display the play again button
    playAgainButton.style.display = "block";
}

// created play again function
function playAgain() {
// used if statement to only run code if gameOver = true
    if (gameState.gameOver === true) {
// hide play again button
    playAgainButton.style.display = "none";
// hide game over screen
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: none;";
// display title again
    let title = document.getElementById("title");
    title.style = "display: block; color: red;";
// display turn again
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: block;";
// hide winning player html element
    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = ``;
// reset health value for both players to 100 again
    let playerTwoHealth = document.getElementById("playerTwoHealth");
    playerTwoHealth.innerHTML = 100;
    let playerOneHealth = document.getElementById("playerOneHealth");
    playerOneHealth.innerHTML = 100;
    }
// depending on who wins it will switch the whoseTurn value accordingly
    if (gameState.whoseTurn === 1) {
    gameState.whoseTurn = 2;
    } else {
    gameState.whoseTurn = 1;
    }
// lastly switch gameOver back to false since we are starting a new game
gameState.gameOver = false;
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];
        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");
        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();
        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }
    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayerOne();
    }
}


// created a function that holds other functions to reduce player one's health, animate sprite, and add sound 
function attackPlayerOne() {
// this function changes the colors and interactivity of the attack buttons accordingly 
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
// makes player two attack button clickable 
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");
// does the opposite and makes player one attack unclickable
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");
    }
// created function to animate player using images storeed in an array
    function animatePlayer() {
        let playerTwoFrames = [
            "./images/L_Idle.png",
            "./images/L_Attack.png"
        ];
// set player sprite to idle and when function is called sprite is will no longer be idle
// but instead have an attack image
        let playerSprite = document.getElementById("playerTwoSprite");
        playerSprite.src = playerTwoFrames[1];
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack2");

// I grabbed html element player one sprite and store it in enemy sprite variable
        let enemySprite = document.getElementById("playerOneSprite");
// stored sound effect in enemy damage variable
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
// when function is called enemy sprite will no longer be idle but instead have 
// a damage image
        enemySprite.classList.remove("idle");
        enemySprite.classList.add("damage2");
// play sound when function is called
        enemyDamage.play();
// create a function to remove damage/attack images and return sprite to idle 
        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage2");
            enemySprite.classList.add("idle");

            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack2");
            playerSprite.classList.add("idle");
        }
// use setTimeout() to execute the function after a specified amount of time
        setTimeout(changePlayerTwoSprite, 350);
    } 
// lastly run all the functions created in this function only if it is player 2's turn
    if (gameState.whoseTurn === 2) {
        animatePlayer();
        changeButtonStatus();
        changePlayerTwo();
    }
}






//Enable/disable farmer only button based on state.
foBtn = [false, true,  false, true,  false, true,  false, false,
         false, false, true,  false, true,  false, true,  true];


//Enable/disable farmer and seeds button based on state.
fsBtn = [false, true, true, true, false, true, true, false,
         false, true, true, false, true, true, true, true];

//Enable/disable farmer and fox button based on state.
ffBtn = [false, true, false, true, true, true, true, false,
         false, true, true, true, true, false, true, true];

//Enable/disable farmer and chicken button based on state.
fcBtn = [false, true,  false, true,  false, true,  false, true,
         true,  false, true,  false, true,  false, true,  true];

//Message to display based on current state.
msgArr = [0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 0, 1, 3];

//Update image based on state.
imgArr = ["state0.jpg",  "state1.jpg",  "state2.jpg",  "state3.jpg", 
          "state4.jpg",  "state5.jpg",  "state6.jpg",  "state7.jpg",
          "state8.jpg",  "state9.jpg",  "state10.jpg", "state11.jpg",
          "state12.jpg", "state13.jpg", "state14.jpg", "state15.jpg"];

//Possible game messages.
var gameMessages = ["<p><b>Safe move! Make another move</b></p>",
                    "<p><b>Oh no! The fox ate the chicken! The game is over!</b></p>", 
                    "<p><b>Oh no! The chicken ate the seeds! The game is over!</b></p>", 
                    "<p><b>Congratulations! The farmer has crossed the river! You won!</b></p>"];

var gameState = 0;

function moveToState(buttonNum)
{
    switch(gameState)
    {
        case 0:
            if(buttonNum == 0){gameState = 1;}
            else if(buttonNum == 1){gameState = 3;}
            else if(buttonNum == 2){gameState = 5;}
            else{gameState = 9;}
        break;

        case 1:
            if(buttonNum == 0){gamestate = 0;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){} //Invalid
            else{} //Invalid
        break;

        case 2:
            if(buttonNum == 0){gamestate = 3}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){gameState = 7;} 
            else{gameState = 11;}
        break;

        case 3:
            if(buttonNum == 0){gameState = 2;}
            else if(buttonNum == 1){gameState = 0;}
            else if(buttonNum == 2){} //Invalid
            else{} //Invalid
        break;

        case 4:
            if(buttonNum == 0){gameState = 5;}
            else if(buttonNum == 1){gameState = 7;}
            else if(buttonNum == 2){} //Invalid
            else{gameState = 13;}
        break;

        case 5:
            if(buttonNum == 0){gameState = 4;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){gameState = 0;}
            else{} //Invalid
        break;

        case 6:
            if(buttonNum == 0){gameState = 7;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){} //Invalid
            else{gameState = 15;}
        break;

        case 7:
            if(buttonNum == 0){gameState = 6;}
            else if(buttonNum == 1){gameState = 4;}
            else if(buttonNum == 2){gameState = 2;}
            else{} //Invalid
        break;

        case 8:
            if(buttonNum == 0){gameState = 9;}
            else if(buttonNum == 1){gameState = 11;}
            else if(buttonNum == 2){gameState = 13;}
            else{} //Invalid
        break;

        case 9:
            if(buttonNum == 0){gameState = 8;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){} //Invalid
            else{gameState = 0;}
        break;

        case 10:
            if(buttonNum == 0){gameState = 11;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){gameState = 15;}
            else{} //Invalid
        break;

        case 11:
            if(buttonNum == 0){gameState = 10;}
            else if(buttonNum == 1){gameState = 8;}
            else if(buttonNum == 2){} //Invalid
            else{gameState = 2;}
        break;

        case 12:
            if(buttonNum == 0){gameState = 13;}
            else if(buttonNum == 1){gameState = 15;}
            else if(buttonNum == 2){} //Invalid
            else{} //Invalid
        break;

        case 13:
            if(buttonNum == 0){gameState = 12;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){gameState = 8;}
            else{gameState = 4;}
        break;

        case 14:
            if(buttonNum == 0){gameState = 15;}
            else if(buttonNum == 1){} //Invalid
            else if(buttonNum == 2){} //Invalid
            else{} //Invalid
        break;

        case 15:
            if(buttonNum == 0){} //Game over. Must reset.
            else if(buttonNum == 1){} //Game over. Must reset.
            else if(buttonNum == 2){} //Game over. Must reset.
            else{} //Game over. Must reset.
        break;

        //Invalid state.  Reset the game.
        default:
            resetGame();
        break;
    }

    updateState();
}

function updateState()
{
    document.getElementById("farmerOnlyBtn").disabled = foBtn[gameState];
    document.getElementById("farmerAndSeedsBtn").disabled = fsBtn[gameState];
    document.getElementById("farmerAndFoxBtn").disabled = ffBtn[gameState];
    document.getElementById("farmerAndChknBtn").disabled = fcBtn[gameState];
    document.getElementById("game-status-text").innerHTML = gameMessages[msgArr[gameState]];
    document.getElementById("game-img").src = "assets/images/" + imgArr[gameState];
}

function resetGame()
{
    gameState = 0;
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = false;
    document.getElementById("farmerAndFoxBtn").disabled = false;
    document.getElementById("farmerAndChknBtn").disabled = false;
    document.getElementById("game-status-text").innerHTML = "<p><b>Use the buttons above to select your next move</b></p>";
    document.getElementById("game-img").src = "assets/images/state0.jpg";
}

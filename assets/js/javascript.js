//Constants used as indexes into the gameMessage array.
const MSGSAFEMOVE    = 0;
const MSGFOXEATCHKN  = 1;
const MSGCHKNEATSEED = 2;
const MSGWIN         = 3;
const MSGINTRO       = 4;

//Bitwise AND constants for items and their state.
const BITFARMER  = 1;
const BITSEEDS   = 2;
const BITFOX     = 4;
const BITCHICKEN = 8;

//Class that stores the next state and display messages for the current state.
//BtnNextStates contains an array of 4 next possible states. -1 indicates an
//invalid next state.  MsgIndex is the message to display for the current state.
class State
{
    constructor(BtnNextStates, msgIndex)
    {
        this.BtnNextStates = BtnNextStates;
        this.msgIndex = msgIndex;
    }
}

//The heart of the game.  There are a total of 16 states and the staesArr
//contains all the information for moving between states.  The 4 elements
//in each sub-array correspond to farmerOnlyBtn, farmerAndSeedsBtn, 
//farmerAndFoxBtn and farmerAndChknBtn respectively.  The numbers in the
//arrays indicate the next state index when the corresponding button
//is clicked.
statesArr =
[
    new State([ 1,  3,  5,  9], MSGSAFEMOVE)   , //Initial state.
    new State([-1, -1, -1, -1], MSGFOXEATCHKN) , //Losing state.
    new State([ 3, -1,  7, 11], MSGSAFEMOVE)   ,
    new State([-1, -1, -1, -1], MSGFOXEATCHKN) , //Losing state.
    new State([ 5,  7, -1, 13], MSGSAFEMOVE)   ,
    new State([-1, -1, -1, -1], MSGCHKNEATSEED), //Losing state.
    new State([ 7, -1, -1, 15], MSGSAFEMOVE)   ,
    new State([ 6,  4,  2, -1], MSGSAFEMOVE)   ,
    new State([ 9, 11, 13, -1], MSGSAFEMOVE)   ,
    new State([ 8, -1, -1,  0], MSGSAFEMOVE)   ,
    new State([-1, -1, -1, -1], MSGCHKNEATSEED), //Losing state.
    new State([10,  8, -1,  2], MSGSAFEMOVE)   ,
    new State([-1, -1, -1, -1], MSGFOXEATCHKN) , //Losing state.
    new State([12, -1,  8,  4], MSGSAFEMOVE)   ,
    new State([-1, -1, -1, -1], MSGFOXEATCHKN) , //Losing state.
    new State([-1, -1, -1, -1], MSGWIN)          //Winning state.
];

//Possible game messages.
var gameMessages =
[
    "<p><b>Safe move! Make another move</b></p>",
    "<p><b>Oh no! The fox ate the chicken! The game is over!</b></p>", 
    "<p><b>Oh no! The chicken ate the seeds! The game is over!</b></p>", 
    "<p><b>Congratulations! The farmer has crossed the river! You win!</b></p>",
    "<p><b>Use the buttons above to select your next move</b></p>"
];

//Main variable that controls the game progression.
var gameState = 0;

//Initialize the game when the webpage is loaded. 
window.onload = function() {
    resetGame();
};


//Called everytime a button is clicked.  Advances the state of the game.
function moveToState(buttonNum)
{
    gameState = statesArr[gameState].BtnNextStates[buttonNum];
    updateImages();

    document.getElementById("farmerOnlyBtn").disabled = (statesArr[gameState].BtnNextStates[0] < 0);
    document.getElementById("farmerAndSeedsBtn").disabled = (statesArr[gameState].BtnNextStates[1] < 0);
    document.getElementById("farmerAndFoxBtn").disabled = (statesArr[gameState].BtnNextStates[2] < 0);
    document.getElementById("farmerAndChknBtn").disabled = (statesArr[gameState].BtnNextStates[3] < 0);
    document.getElementById("game-status-text").innerHTML = gameMessages[statesArr[gameState].msgIndex];
}

//Reset the game back to its initial state.
function resetGame()
{
    gameState = 0;
    updateImages();
    
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = false;
    document.getElementById("farmerAndFoxBtn").disabled = false;
    document.getElementById("farmerAndChknBtn").disabled = false;
    document.getElementById("game-status-text").innerHTML = gameMessages[MSGINTRO];
}

//This function moves and resizes all the images used in the game.
function updateImages()
{
    var imgBackground = document.getElementById("img-background");
    var bkgHeightWidth = imgBackground.clientHeight;

    var imgContainer = document.getElementById("img-container");
    imgContainer.style.height = bkgHeightWidth + "px";

    var itemHeightWidth = bkgHeightWidth / 6;
    var itemSpacer = itemHeightWidth / 6;

    var imgFarmer = document.getElementById("img-farmer");
    imgFarmer.style.height = itemHeightWidth + "px";
    imgFarmer.style.top = itemSpacer + "px";

    gameState & BITFARMER ? imgFarmer.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                            imgFarmer.style.left = itemSpacer + "px";

    var imgSeeds = document.getElementById("img-seeds");
    imgSeeds.style.height = itemHeightWidth + "px";
    imgSeeds.style.top = 2 * itemSpacer + itemHeightWidth + "px";
                        
    gameState & BITSEEDS ? imgSeeds.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                           imgSeeds.style.left = itemSpacer + "px";

    var imgFox = document.getElementById("img-fox");
    imgFox.style.height = itemHeightWidth + "px";
    imgFox.style.top = 3 * itemSpacer + 2 * itemHeightWidth + "px";
                        
    gameState & BITFOX ? imgFox.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                         imgFox.style.left = itemSpacer + "px";

    var imgChicken = document.getElementById("img-chicken");
    imgChicken.style.height = itemHeightWidth + "px";
    imgChicken.style.top = 4 * itemSpacer + 3 * itemHeightWidth + "px";
                                               
    gameState & BITCHICKEN ? imgChicken.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                             imgChicken.style.left = itemSpacer + "px";

    var imgBoat = document.getElementById("img-boat");
    imgBoat.style.height = itemHeightWidth + "px";
    imgBoat.style.top = 5 * itemSpacer + 4 * itemHeightWidth + "px";
                                                                        
    gameState & BITFARMER ? imgBoat.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                            imgBoat.style.left = itemSpacer + "px";
}

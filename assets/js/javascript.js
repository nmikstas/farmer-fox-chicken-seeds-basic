
class State
{
    constructor(BtnNextStates, msgIndex, stateImg)
    {
        this.BtnNextStates = BtnNextStates;
        this.msgIndex = msgIndex;
        this.stateImg = stateImg;
    }
}

statesArr =
[
    new State([ 1,  3,  5,  9], 0, "state0.jpg" ), //Initial state.
    new State([-1, -1, -1, -1], 1, "state1.jpg" ), //Losing state.
    new State([ 3, -1,  7, 11], 0, "state2.jpg" ),
    new State([-1, -1, -1, -1], 1, "state3.jpg" ), //Losing state.
    new State([ 5,  7, -1, 13], 0, "state4.jpg" ),
    new State([-1, -1, -1, -1], 2, "state5.jpg" ), //Losing state.
    new State([ 7, -1, -1, 15], 0, "state6.jpg" ),
    new State([ 6,  4,  2, -1], 0, "state7.jpg" ),
    new State([ 9, 11, 13, -1], 0, "state8.jpg" ),
    new State([ 8, -1, -1,  0], 0, "state9.jpg" ),
    new State([-1, -1, -1, -1], 2, "state10.jpg"), //Losing state.
    new State([10,  8, -1,  2], 0, "state11.jpg"),
    new State([-1, -1, -1, -1], 1, "state12.jpg"), //Losing state.
    new State([12, -1,  8,  4], 0, "state13.jpg"),
    new State([-1, -1, -1, -1], 1, "state14.jpg"), //Losing state.
    new State([-1, -1, -1, -1], 3, "state15.jpg")  //Winning state.
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

function moveToState(buttonNum)
{
    gameState = statesArr[gameState].BtnNextStates[buttonNum];

    document.getElementById("farmerOnlyBtn").disabled = (statesArr[gameState].BtnNextStates[0] < 0);
    document.getElementById("farmerAndSeedsBtn").disabled = (statesArr[gameState].BtnNextStates[1] < 0);
    document.getElementById("farmerAndFoxBtn").disabled = (statesArr[gameState].BtnNextStates[2] < 0);
    document.getElementById("farmerAndChknBtn").disabled = (statesArr[gameState].BtnNextStates[3] < 0);
    document.getElementById("game-status-text").innerHTML = gameMessages[statesArr[gameState].msgIndex];
    document.getElementById("game-img").src = "assets/images/" + statesArr[gameState].stateImg;
}

function resetGame()
{
    gameState = 0;
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = false;
    document.getElementById("farmerAndFoxBtn").disabled = false;
    document.getElementById("farmerAndChknBtn").disabled = false;
    document.getElementById("game-status-text").innerHTML = gameMessages[4];
    document.getElementById("game-img").src = "assets/images/state0.jpg";
}

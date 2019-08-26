//Constants used as indexes into the gameMessage array.
const MSGSAFEMOVE    = 0;
const MSGFOXEATCHKN  = 1;
const MSGCHKNEATSEED = 2;
const MSGWIN         = 3;
const MSGINTRO       = 4;

//Numbers assicated with user button presses.
const BTNFARMER = 0;
const BTNSEEDS  = 1;
const BTNFOX    = 2;
const BTNCHKN   = 3;

//Position variable for each item. false=left river bank, true=right river bank.
var isfarmerRight  = false;
var isseedsRight   = false;
var isfoxRight     = false;
var ischickenRight = false;

//Variables used for animation.
var animBtn;     //Button clicked by user.  Determines what objects to animate.
var doAnimation; //Animation interval variable.
var dx;          //Distance to move animated object per frame.

//Possible game messages.
var gameMessages =
[
    "<p><b>Safe move! Make another move</b></p>",
    "<p><b>Oh no! The fox ate the chicken! The game is over!</b></p>", 
    "<p><b>Oh no! The chicken ate the seeds! The game is over!</b></p>", 
    "<p><b>Congratulations! The farmer has crossed the river! You win!</b></p>",
    "<p><b>Use the buttons above to select your next move</b></p>"
];

//Initialize the game when the webpage is loaded. 
window.onload = function() {
    resetGame();
};

function animate()
{
    //Get references to the ojbects that can be animated.
    var imgFarmer = document.getElementById("img-farmer");
    var imgBoat = document.getElementById("img-boat");
    var imgSeeds = document.getElementById("img-seeds");
    var imgFox = document.getElementById("img-fox");
    var imgChicken = document.getElementById("img-chicken");

    //Animation takes the same amount of time no matter the size of the playing field.
    //These calculations are used to get the sizes of things and determine where the
    //stopping points are located.
    var imgBackground = document.getElementById("img-background");
    var bkgHeightWidth = imgBackground.clientHeight / 1.0;
    var itemHeightWidth = bkgHeightWidth / 4.7;
    var itemSpacer = itemHeightWidth / 6;

    //Calculate the extents of the animations.
    var leftLimit = Math.floor(itemSpacer);
    var rightLimit = Math.ceil(bkgHeightWidth - itemSpacer - itemHeightWidth);
    var farmerPos = parseInt(imgFarmer.style.left);
   
    //Check if the animation has reached the end.
    if ((farmerPos < leftLimit) || (farmerPos > rightLimit))
    {
      clearInterval(doAnimation);
      updateState(animBtn);
    }
    else //Keep animating.
    {
        //Always animate the farmer and the boat.
        imgFarmer.style.left = farmerPos + dx + "px";
        imgBoat.style.left = farmerPos + dx + "px";

        //Check for any other necessary animations.
        if(animBtn == BTNSEEDS)
        {
            imgSeeds.style.left = farmerPos + dx + "px";
        }
        else if(animBtn == BTNFOX)
        {
            imgFox.style.left = farmerPos + dx + "px";
        }
        else if(animBtn == BTNCHKN)
        {
            imgChicken.style.left = farmerPos + dx + "px";
        } 
    }
}

function moveToState(buttonNum)
{
    //Get width/2 of the back ground for determining wich direction to animate.
    var imgBackground = document.getElementById("img-background");
    var midPoint = imgBackground.clientHeight / 2;

    //Calculate dx per animation frame.
    dx = imgBackground.clientWidth / 80;

    //Check if moving from right to left. If so, move object in a negative direction.
    var farmerObj = document.getElementById("img-farmer");
    if(parseInt(farmerObj.style.left) > midPoint)
    {
        dx *= -1;
    }

    disableAllButtons(); //Disable buttons during animation to avoid weird behavior.
    doAnimation = setInterval(animate, 10);
    animBtn = buttonNum;
}

//Advances the state of the game.
function updateState(buttonNum)
{
    //Always toggle the farmer's river bank variable.
    isfarmerRight = !isfarmerRight;

    //Update river bank variables.  They alway toggle when the object is moved.
    switch(buttonNum)
    {
        case BTNFARMER: //Already toggled above.
            break;

        case BTNSEEDS: 
            isseedsRight = !isseedsRight;
            break;

        case BTNFOX:
            isfoxRight = !isfoxRight;
            break;

        case BTNCHKN:
            ischickenRight = !ischickenRight;
            break;

        default:
            resetGame(); //Should never get here but reset the game if it does.
            break;
    }

    updateImages(); //Place and size the images.

    //Enable the proper buttons.
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = (isfarmerRight != isseedsRight);
    document.getElementById("farmerAndFoxBtn").disabled = (isfarmerRight != isfoxRight);
    document.getElementById("farmerAndChknBtn").disabled = (isfarmerRight != ischickenRight);
   
    //Check for winning state.
    if(isfarmerRight && isseedsRight && isfoxRight && ischickenRight)
    {
        document.getElementById("game-status-text").innerHTML = gameMessages[MSGWIN];
        disableAllButtons();
    }
    //Check if the fox ate the chicken.
    else if((isfoxRight == ischickenRight) && (isfarmerRight != ischickenRight))
    {
        document.getElementById("game-status-text").innerHTML = gameMessages[MSGFOXEATCHKN];
        disableAllButtons();
    }
    //Check if the chicken ate the seeds.
    else if((ischickenRight == isseedsRight) && (isfarmerRight != ischickenRight))
    {
        document.getElementById("game-status-text").innerHTML = gameMessages[MSGCHKNEATSEED];
        disableAllButtons();
    }
    //Must have been a safe move.
    else
    {
        document.getElementById("game-status-text").innerHTML = gameMessages[MSGSAFEMOVE];
    }
}

//Reset the game back to its initial state.
function resetGame()
{
    clearInterval(doAnimation);
    isfarmerRight = isseedsRight = isfoxRight = ischickenRight = false;
    
    updateImages(); //Place and size the images.
    
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = false;
    document.getElementById("farmerAndFoxBtn").disabled = false;
    document.getElementById("farmerAndChknBtn").disabled = false;
    document.getElementById("game-status-text").innerHTML = gameMessages[MSGINTRO];
}

//Disable all the buttons when the game is over or while animating.
function disableAllButtons()
{
    document.getElementById("farmerOnlyBtn").disabled = true;
    document.getElementById("farmerAndSeedsBtn").disabled = true;
    document.getElementById("farmerAndFoxBtn").disabled = true;
    document.getElementById("farmerAndChknBtn").disabled = true;
}

//This function places and resizes all the images used in the game.
function updateImages()
{
    var imgBackground = document.getElementById("img-background");
    var bkgHeightWidth = imgBackground.clientHeight;

    //This is required to make the website look right with the xs media query.
    var imgContainer = document.getElementById("img-container");
    imgContainer.style.height = bkgHeightWidth + "px";

    //These variables can be tweeked to change the
    //size of the objects and the spacing between them.
    var itemHeightWidth = bkgHeightWidth / 4.7;
    var itemSpacer = itemHeightWidth / 6;

    //Set the farmer image size.
    var imgFarmer = document.getElementById("img-farmer");
    imgFarmer.style.height = itemHeightWidth + "px";
    imgFarmer.style.top = itemSpacer + "px";

    //Set the farmer on the left or right river bank.
    isfarmerRight ? imgFarmer.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                    imgFarmer.style.left = itemSpacer + "px";

    //Set the seeds image size.
    var imgSeeds = document.getElementById("img-seeds");
    imgSeeds.style.height = itemHeightWidth + "px";
    imgSeeds.style.top = 1 * itemSpacer + itemHeightWidth + "px";
                        
    //Set the seeds on the left or right river bank.
    isseedsRight ? imgSeeds.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                   imgSeeds.style.left = itemSpacer + "px";

    //Set the fox image size.
    var imgFox = document.getElementById("img-fox");
    imgFox.style.height = itemHeightWidth + "px";
    imgFox.style.top = 0 * itemSpacer + 2 * itemHeightWidth + "px";
                        
    //Set the fox on the left or right river bank.
    isfoxRight ? imgFox.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                 imgFox.style.left = itemSpacer + "px";

    //Set the chicken image size.
    var imgChicken = document.getElementById("img-chicken");
    imgChicken.style.height = itemHeightWidth + "px";
    imgChicken.style.top = 0 * itemSpacer + 3 * itemHeightWidth + "px";
                                         
    //Set the chicken on the left or right river bank.
    ischickenRight ? imgChicken.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                     imgChicken.style.left = itemSpacer + "px";

    //Set the boat image size.
    var imgBoat = document.getElementById("img-boat");
    imgBoat.style.height = itemHeightWidth + "px";
    imgBoat.style.top = 0 * itemSpacer + 3.7 * itemHeightWidth + "px";
                                               
    //Set the boat on the left or right river bank.
    isfarmerRight ? imgBoat.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                    imgBoat.style.left = itemSpacer + "px";
}

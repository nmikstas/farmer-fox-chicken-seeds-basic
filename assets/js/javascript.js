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
var isfarmerRight = false;
var isseedsRight = false;
var isfoxRight = false;
var ischickenRight = false;

//Variables used for animation.
var animBtn;
var doAnimation;
var dx;

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

    var imgBackground = document.getElementById("img-background");
    var bkgHeightWidth = imgBackground.clientHeight / 1.0;
    var itemHeightWidth = bkgHeightWidth / 4.7;
    var itemSpacer = itemHeightWidth / 6;

    //Calculate the extents of the animations.
    var leftLimit = Math.floor(itemSpacer);
    var rightLimit = Math.floor(bkgHeightWidth - itemSpacer - itemHeightWidth);
    var farmerPos = parseInt(imgFarmer.style.left);
   
    //Check if the animation has reached the end.
    if ((farmerPos < leftLimit) || (farmerPos > rightLimit))
    {
      clearInterval(doAnimation);
      updateState(animBtn);
    }
    else  //Keep animating.
    {
        imgFarmer.style.left = farmerPos + dx + "px";
        imgBoat.style.left = farmerPos + dx + "px";

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

    //Check if moving from right to left.
    var farmerObj = document.getElementById("img-farmer");
    if(parseInt(farmerObj.style.left) > midPoint)
    {
        dx = dx * -1;
    }

    doAnimation = setInterval(animate, 10);
    animBtn = buttonNum;
}

//Advances the state of the game.
function updateState(buttonNum)
{
    //Always toggle the farmer's river bank.
    isfarmerRight = !isfarmerRight;

    //Update river bank variables.
    switch(buttonNum)
    {
        case BTNFARMER:
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
            resetGame();
            break;
    }

    updateImages();

    //Enable the proper buttons.
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
    isfarmerRight = isseedsRight = isfoxRight = ischickenRight = false;
    
    updateImages();
    
    document.getElementById("farmerOnlyBtn").disabled = false;
    document.getElementById("farmerAndSeedsBtn").disabled = false;
    document.getElementById("farmerAndFoxBtn").disabled = false;
    document.getElementById("farmerAndChknBtn").disabled = false;
    document.getElementById("game-status-text").innerHTML = gameMessages[MSGINTRO];
}

//Disable all the buttons when the game is over.
function disableAllButtons()
{
    document.getElementById("farmerOnlyBtn").disabled = true;
    document.getElementById("farmerAndSeedsBtn").disabled = true;
    document.getElementById("farmerAndFoxBtn").disabled = true;
    document.getElementById("farmerAndChknBtn").disabled = true;
}

//This function moves and resizes all the images used in the game.
function updateImages()
{
    var imgBackground = document.getElementById("img-background");
    var bkgHeightWidth = imgBackground.clientHeight;

    //This is required to make the website look right with the xs media query.
    var imgContainer = document.getElementById("img-container");
    imgContainer.style.height = bkgHeightWidth + "px";

    var itemHeightWidth = bkgHeightWidth / 4.7;
    var itemSpacer = itemHeightWidth / 6;

    var imgFarmer = document.getElementById("img-farmer");
    imgFarmer.style.height = itemHeightWidth + "px";
    imgFarmer.style.top = itemSpacer + "px";

    isfarmerRight ? imgFarmer.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                    imgFarmer.style.left = itemSpacer + "px";

    var imgSeeds = document.getElementById("img-seeds");
    imgSeeds.style.height = itemHeightWidth + "px";
    imgSeeds.style.top = 1 * itemSpacer + itemHeightWidth + "px";
                        
    isseedsRight ? imgSeeds.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                   imgSeeds.style.left = itemSpacer + "px";

    var imgFox = document.getElementById("img-fox");
    imgFox.style.height = itemHeightWidth + "px";
    imgFox.style.top = 0 * itemSpacer + 2 * itemHeightWidth + "px";
                        
    isfoxRight ? imgFox.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                 imgFox.style.left = itemSpacer + "px";

    var imgChicken = document.getElementById("img-chicken");
    imgChicken.style.height = itemHeightWidth + "px";
    imgChicken.style.top = 0 * itemSpacer + 3 * itemHeightWidth + "px";
                                               
    ischickenRight ? imgChicken.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                     imgChicken.style.left = itemSpacer + "px";

    var imgBoat = document.getElementById("img-boat");
    imgBoat.style.height = itemHeightWidth + "px";
    imgBoat.style.top = 0 * itemSpacer + 3.7 * itemHeightWidth + "px";
                                                                        
    isfarmerRight ? imgBoat.style.left = bkgHeightWidth - itemSpacer - itemHeightWidth + "px" :
                    imgBoat.style.left = itemSpacer + "px";
}

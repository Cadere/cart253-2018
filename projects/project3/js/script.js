/*****************

Prototype 1
Eugene Fournier

For now this is a very boring, non interactive program
which just displays cards
on a grid
with each card at a different location on the grid everytime the program is loaded
it will be used to create a memory card game
******************/

//variables for the card grid
var column = 4;
//rangee is the number of lines on the grid - had to resort to a french name since line is already a thing in p5
var rangee = 3;
var cardNb = rangee*column;
//variable for the cards
var card;
var preCard = [];
//variables for the positions
var pY = [];
var pX = [];
var position = [];
var shuffledPosition;
//variables for the space allocated to the sidebar and the space allocated to game
var sidebarWidth;
var gameWidth;
//variables for the images
var cardFace;
var cardFaceOrdered = [];
var cardBack;
//a variable for the card size
var cardSize;
//a variable for the value of the last card clicked
var lastCardValue;
//a variable for the CardValue object
var valueChecker;
//a variable to hold if two cards were clicked
var twoCardsClicked = false;
// a variable for the nb of attempts
var attempts = 0;
//a variable that indicates if there is a timer running at the moment
var timerIsRunning = false;


function preload() {
  cardFaceOrdered = [
    loadImage("assets/images/card1.png"),
    loadImage("assets/images/card2.png"),
    loadImage("assets/images/card3.png"),
    loadImage("assets/images/card4.png"),
    loadImage("assets/images/card5.png"),
    loadImage("assets/images/card6.png"),
    loadImage("assets/images/card7.png"),
    loadImage("assets/images/card8.png"),
    loadImage("assets/images/card9.png"),
    loadImage("assets/images/card10.png"),
    loadImage("assets/images/card11.png"),
    loadImage("assets/images/card12.png"),
  ]
  cardBack = loadImage("assets/images/cardback.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  //give their values to sidebarWidth and gameWidth
  screenRatio();
  //gives values to an array of coordinates for x and for y
  pXpY();
  // push the x and y position values to an array of position objects
  for (var i = 0; i < rangee; i++){
    for (var j = 0; j < column; j++){
      position.push(new Position(pX[j],pY[i]));
    }
  }

  //adjust card size to canvas size
  setCardSize();
  //creates the cards
  createCards();


  for (var i = 0; i < cardNb; i++){
    card[i].givePosition(position[i]);
  }

  valueChecker = new CardValue();
}


function draw() {
  background("#61a08e");
  //draw the sidebar background
  push();
  fill("#9acf87");
  noStroke();
  rect(0,0,sidebarWidth,height);
  pop();
  //display the cards
  for (var i = 0; i < cardNb; i++){
    card[i].display();
  }
}


function mouseClicked(){
  if (!timerIsRunning){
    //sets lastCardValue to the value of the card clicked
    for (var i = 0; i < cardNb; i++){
      card[i].clickedValue();
    }

    //updates the cardValue object valueChecker with the value of the last card clicked
    valueChecker.updateValue();

    //turns the card that has been clicked
    for (var i = 0; i < cardNb; i++){
      card[i].turnCard();
    }

    //if the player has clicked a third time
    //ie. selected 2 cards and wants to continue
    //this compares the values of the 2 cards
    //if the cards match, their found status becomes true
    //afterwards value checker is resetted and all unfound cards are flipped back
    if(valueChecker.clickedAgain){
      if(valueChecker.compareValues()){
        for (var i = 0; i < cardNb; i++){
          if(card[i].turned){
            card[i].foundStatus();
          }
        }
        valueChecker.reset();
      }
      else{
        timerIsRunning = true;
        setTimeout(attemptReset, 1000);
      }
    }
  }
}

//checks if the window has been resized and resizes the canvas accordingly
function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  //adjusts the ratio of the sidebar and game space to the size of the screen
  screenRatio();
  //adjust cardSize to the window
  setCardSize();
  //recreate the pX and pY arrays to fit the new screen
  pXpY();
  // update the positions objects to fit the new screen
  resizePosition();
  for (var i = 0; i < cardNb; i++){
    card[i].givePosition(position[i]);
  }
}

//pXpY()
//
// clears then fills the pX and pY arrays
function pXpY(){
  //create positions
  //variables for the coordinates in x and y
  // so that the code adapts to changing the number of cards more easily
  //the arrays are first cleared so that when the function is used in windowResized()
  //the number of values in each array remains the same
  pY = [];
  pX = [];
  //then gives them values
  for (var i = 0; i < rangee; i++){
    pY.push(height/(rangee+1)*(i+1));
  }
  for (var i = 0; i < column; i++){
    pX.push(sidebarWidth+gameWidth/(column+1)*(i+1));
  }
}

//screenRatio()
//
// adjusts the ratio of the sidebar and game space to the size of the screen
function screenRatio(){
  sidebarWidth = width*0.25
  gameWidth = width*0.75;
}

//setCardSize()
//
//adjusts the cardSize to match the window
function setCardSize(){
  if (windowHeight/rangee < gameWidth/column){
    cardSize = windowHeight/rangee*0.7;
  }
  else {
    cardSize = gameWidth/column*0.7;
  }
}

//randomizeCards()
//
//shuffles the position and cardface arrays
function createCards(){
  //this shuffles the card faces
  //the cardFace array produces different cards as the i first cards
  //every time the game is reloaded
  cardFace = shuffle(cardFaceOrdered);
  //creates the card objects
  for (var i = 0; i < cardNb; i++){
    if(i < cardNb/2){
      preCard.push(new Card(cardFace[i],i));
    }
    //this allocates the same images and values so that each image appears twice
    else{
      preCard.push(new Card(cardFace[i-(cardNb/2)],i-cardNb/2));
    }
  }
  //shuffles preCard so that the cards are distributed randomly
  card = shuffle(preCard);
}

//resizePosition()
//
//updates the position array with the pX and pY arrays
function resizePosition(){
  i = 0;
  for (var n = 0; n < rangee; n++){
    for (var m = 0; m < column; m++){
      position[i].update(pX[m],pY[n]);
      i++;
    }
  }
}

function attemptReset(){
  valueChecker.reset();
  for (var i = 0; i < cardNb; i++){
    card[i].reset();
  }
  timerIsRunning = false;
}

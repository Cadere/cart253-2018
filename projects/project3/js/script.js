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
var card = [];
//variables for the positions
var pY = [];
var pX = [];
var position = [];
var shuffledPosition;
//variables for the space allocated to the sidebar and the space allocated to game
var sidebarWidth;
var gameWidth;
//variables for the images
var cardFace = [];
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


function preload() {
  cardFace = [
    loadImage("assets/images/card1.png"),
    loadImage("assets/images/card2.png"),
    loadImage("assets/images/card3.png"),
    loadImage("assets/images/card4.png"),
    loadImage("assets/images/card5.png"),
    loadImage("assets/images/card6.png"),
  ]
  cardBack = loadImage("assets/images/cardback.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  //give their values to sidebarWidth and gameWidth
  sidebarWidth = width*0.25
  gameWidth = width*0.75;
  //create positions
  //variables for the positions in x and y
  // so that the code adapts to changing the number of cards more easily
  for (var i = 0; i < rangee; i++){
    pY.push(height/(rangee+1)*(i+1));
  }
  for (var i = 0; i < column; i++){
    pX.push(sidebarWidth+gameWidth/(column+1)*(i+1));
  }

  // push the x and y position values to an array of position objects
  for (var i = 0; i < rangee; i++){
    for (var j = 0; j < column; j++){
      position.push(new Position(pX[j],pY[i]));
    }
  }

  //adjust card size to canvas size
  if (windowHeight/rangee < gameWidth/column){
    cardSize = windowHeight/rangee*0.7;
  }
  else {
    cardSize = gameWidth/column*0.7;
  }


  //this shuffles the order of the positions
  shuffledPosition = shuffle(position);
  //this allocates positions to cards
  for (var i = 0; i < cardNb; i++){
    if(i < cardNb/2){
      card.push(new Card(cardFace[i],shuffledPosition[i],i));
    }
    //this allocates the same images to positions again so that each image appears twice
    else{
      card.push(new Card(cardFace[i-(cardNb/2)],shuffledPosition[i],i-cardNb/2));
    }
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
  //sets lastCardValue to the value of the card clicked
  for (var i = 0; i < cardNb; i++){
    card[i].clickedValue();
  }

  //updates the cardValue object valueChecker with the value of the last card clicked
  valueChecker.updateValue();

  //turns the card that has been clicked if .clickedAgain is not  true
  if(!valueChecker.clickedAgain){
    for (var i = 0; i < cardNb; i++){
      card[i].turnCard();
    }
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
      valueChecker.reset();
      for (var i = 0; i < cardNb; i++){
        card[i].reset();
      }
    }
  }
}

/*****************

Prototype 1
Eugene Fournier

For now this is a very boring, non interactive program which just displays cards
on a grid
with each card at a different location on the grid everytime the program is loaded
******************/

//variables for the card grid
var column = 3;
var line = 2;
var cardNb = line*column;
//variable for the cards
var card = [];
//variables for the positions
var pY;
var pX;
var position = [];
var shuffledPosition;
//variables for the images
var cardFace = [];

function preload() {
  cardFace = [
    loadImage("assets/images/card1.png"),
    loadImage("assets/images/card2.png"),
    loadImage("assets/images/card3.png"),
    loadImage("assets/images/card4.png"),
    loadImage("assets/images/card5.png"),
    loadImage("assets/images/card6.png"),
  ]
}


function setup() {
  createCanvas(800,1000);
  //create positions
  //variables for the positions
  pY = [height/(line+1),height/(line+1)*2];
  pX = [width/(column+1),width/(column+1)*2,width/(column+1)*3];
  //in a very uneficient manner
  position.push(new Position(pY[0],pX[0]));
  position.push(new Position(pY[0],pX[1]));
  position.push(new Position(pY[0],pX[2]));
  position.push(new Position(pY[1],pX[0]));
  position.push(new Position(pY[1],pX[1]));
  position.push(new Position(pY[1],pX[2]));

  //this shuffles the order of the positions
  shuffledPosition = shuffle(position);
  //this allocates positions to cards
  for (var i = 0; i < cardNb; i++){
  card.push(new Card(cardFace[i],shuffledPosition[i]));
  }
}

function draw() {
 background(0);
 //display the cards
 for (var i = 0; i < cardNb; i++){
    card[i].display();
  }
}

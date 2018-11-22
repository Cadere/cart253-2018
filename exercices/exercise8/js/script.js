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
var column = 3;
//rangee is the number of lines on the grid - had to resort to a french name since line is already a thing in p5
var rangee = 2;
var cardNb = rangee*column;
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
  createCanvas(1000,800);
  //create positions
  //variables for the positions
  console.log(rangee+1);
  pY = [height/(rangee+1),height/(rangee+1)*2];
  pX = [width/(column+1),width/(column+1)*2,width/(column+1)*3];
  //in a very uneficient manner
  position.push(new Position(pX[0],pY[0]));
  position.push(new Position(pX[1],pY[0]));
  position.push(new Position(pX[2],pY[0]));
  position.push(new Position(pX[0],pY[1]));
  position.push(new Position(pX[1],pY[1]));
  position.push(new Position(pX[2],pY[1]));

  //this shuffles the order of the positions
  shuffledPosition = shuffle(position);
  //this allocates positions to cards
  for (var i = 0; i < cardNb; i++){
  card.push(new Card(cardFace[i],shuffledPosition[i]));
  }
  console.log(card[0].position)
}


function draw() {
 background(0);
 //display the cards
 for (var i = 0; i < cardNb; i++){
    card[i].display();
  }
}

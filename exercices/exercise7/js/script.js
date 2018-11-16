/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//variables for the card grid
var column = 3;
var line = 2;
var cardNb = line*column;
//variables for the positions
var pY = [height/(line+1),height/(line+1)*2];
var pX = [width/(column+1),width/(column+1)*2,width/(column+1)*3];
var position = [];
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
  for (var i = 0; i < cardNb; i++){
    position.push(new Decoy(random(-150,150), random(-150.150), 0, random(-1,1), random(0.05,0.5)));
  }
}

}

function draw() {

}

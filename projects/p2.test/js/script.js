/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var stateArray;
var menu;


function setup() {
createCanvas(640,480);

}

function draw() {
  background(0);
  // Set up all the styling elements
  push();
  textAlign(CENTER,CENTER);
  textFont("Agency FB");
  textSize(32);
  fill(255);
  stroke(255);
  // Display the text
  text("HERDER PONG",width/2,height/5);
  // Font size goes down
  textSize(16);
  // Display the instructions
  text("Press SPACE to play\nUse WS and UP AND DOWN ARROWS",width/2,height*0.9);
  pop();

}

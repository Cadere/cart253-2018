/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/



function setup() {


}

function draw() {
  // Set up all the styling elements
  push();
  textAlign(CENTER,CENTER);
  textFont("Agency FB");
  textSize(32);
  fill(255);
  stroke(255);
  // Display the text
  text("HERDER PONG",width/2,height/2);
  // Font size goes down
  textSize(16);
  // Display the instructions
  text("Press SPACE to play\nUse WS and UP AND DOWN ARROWS",width/2,3*height/4);
  pop();

}

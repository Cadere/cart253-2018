/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
var stateArray;
var menu;
var state;

function setup() {
createCanvas(640,480);
menu = new Menu(3);
stateArray = [
  new MenuState(0,undefined,"TITLE"),
  new MenuState(1,menu.edge+menu.size/menu.choiceNumber,"GAME 1"),
  new MenuState(2,menu.edge+menu.size/menu.choiceNumber*2,"GAME 2"),
  new MenuState(3,menu.edge+menu.size/menu.choiceNumber*3, "GAME 3")
]
}

function draw() {
  background(0);
  // Set up all the styling elements
  menu.handleInput();
  // menu.update();
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
  menu.display();
  console.log(menu.state);

  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "TITLE" so the switch statement in draw()
    // will display the title instead
    state = stateArray[menu.state].gameState;
    console.log(state);
  }
}

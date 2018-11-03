// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
///////// NEW ////////
//variables to contain the scoreboards
var leftScoreboard;
var rightScoreboard;
//variables to contain the Decoys
// var decoy;
var decoys = [];
var decoyNumber = 25;
//variables to contain the enclosures
var enclosure;
//variables for the menu
var stateArray;
var menu;
///////// END NEW ////////

/////// NEW //////
// this variable contains the score needed for the game to be over
var finishScore = 10;

// these variables are used for the appearance of the scoreboards
var edge = 15;
var scoreboardSize = 75;

///// NEW /////
// Taken from the spacelove game
// Tracking the current state of the program (title screen to begin)
var state = "TITLE";
/////// END NEW //////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,10,8);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  //sets the starting velocity of the ball object we just created
  //////////// NEW ////////////
  //create left Scoreboard
  leftScoreboard = new Scoreboard (edge,edge,scoreboardSize,100,"LEFT",leftPaddle);
  // this variable is used for the position of the rightScoreboard's left corner
  var rightCorner = width - (edge + scoreboardSize);
  // create right Scoreboard
  rightScoreboard = new Scoreboard (rightCorner,edge,scoreboardSize,100, "RIGHT", rightPaddle);
  // create multiple Decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys.push(new Decoy(random(-150,150), random(-150.150), 0, random(-1,1), random(0.05,0.5)));
  }
  // // setup the multiple Decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].setup();
  }
  //setup the enclosure
  enclosure = new Enclosure(width/2, height-edge/2, 200, edge, 200);
  //create the main menu
  menu = new Menu(3);
  //create an array of menu states for the main menu
  stateArray = [
    //state 0 has undefined as a second argument so no rectangle appears
    // it has title as a 3rd argument so if the spacebar is clicked and no
    //menu option is selected, the state remains title
    new MenuState(0,undefined,"TITLE"),
    new MenuState(1,menu.edge+menu.size/menu.choiceNumber,"GAME 1"),
    new MenuState(2,menu.edge+menu.size/menu.choiceNumber*2,"GAME 2"),
    new MenuState(3,menu.edge+menu.size/menu.choiceNumber*3, "GAME 3")
  ]
  //this sets the initial velocity for the ball
  ball.setup();
  ///////// END NEW ///////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  ////// NEW //////////
  // the switch statement checks the state of the game
  // and displays the proper screen
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME 1":
    displayGame1();
    break;

    case "GAME 2":
    displayGame2();
    break;

    case "GAME OVER":
    displayGameOver();
    break;
  }
}

/////// NEW ///////
// displayTitle()
//
//This function displays the intro title and controls
function displayTitle() {
  //handle imput for the menu to respond
  menu.handleInput();
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
  text("Press SPACE to play\nUse WS and UP AND DOWN ARROWS",width/2,0.9*height);
  pop();

  //display menu
  menu.display();
  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // if it was, change the state to the appropriate item in the menu
    state = stateArray[menu.state].gameState;
    console.log(state);
  }
}

// displayGame1()
//
// This function displays the actual game
function displayGame1() {
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  /////// NEW ////////
  // scoreboard updates its score
  leftScoreboard.update();
  rightScoreboard.update();
  //decoys update their angles
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].update();
  }
  // decoy.update();
  // ball.isOffScreen now recognizes which side of the screen the ball went off to
  // The paddle's scores update accordingly
  if (ball.isOffScreen() === "left") {
    ball.reset()
    leftPaddle.updateScore();
  }
  else if (ball.isOffScreen() === "right"){
    ball.reset()
    rightPaddle.updateScore();
  }

  /////// END NEW ////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ///////// NEW ////////
  //display scoreboards
  leftScoreboard.display();
  rightScoreboard.display();
  //display decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].display();
  }


  //////// END NEW ////////
  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  /////// NEW //////
  // if either player reaches 11 points they lose
  // this means the game is over - this checks if the game is over
  // and changes the state accordingly
  if (gameOver()) {
    state = "GAME OVER";
  }
}

// displayGame2()
//
// This function displays the actual game
function displayGame2() {
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  /////// NEW ////////
  // scoreboard updates its score
  leftScoreboard.update();
  rightScoreboard.update();

  // ball.isOffScreen now recognizes which side of the screen the ball went off to
  // The paddle's scores update accordingly
  if (ball.isOffScreen() === "left") {
    ball.reset()
    leftPaddle.updateScore();
  }
  else if (ball.isOffScreen() === "right"){
    ball.reset()
    rightPaddle.updateScore();
  }

  // handleCollision with the enclosure
  if (ball.enclosureCollision(enclosure)){
    ball.reset();
    enclosure.updateScore();
  }
  /////// END NEW ////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ///////// NEW ////////
  //display scoreboards
  leftScoreboard.display();
  rightScoreboard.display();

  //display enclosure
  enclosure.display();

  //////// END NEW ////////
  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  console.log(enclosure.score)
  /////// NEW //////
  // if either player reaches 11 points they lose
  // this means the game is over - this checks if the game is over
  // and changes the state accordingly
  if (gameOver()) {
    state = "GAME OVER";
  }
}

// displayGameOver()
//
// Displays game over text
function displayGameOver() {
  push();
  textAlign(CENTER,CENTER);
  textFont("Agency FB");
  textSize(32);
  fill(255);
  stroke(255);
  // this text indicates which player lost
  if (leftPaddle.score > rightPaddle.score){
    text("LEFT PLAYER LOST",width/2,height/2);
  }
  else {
    text("RIGHT PLAYER LOST", width/2, height/2);
  }
  textSize(24);
  text("PRESS ENTER TO RETURN TO TITLE", width/2, height*0.7);
  pop();
  // Check whether the spacebar was pressed to restart the game
  if (keyIsDown(ENTER)) {
    // ... if it was, change the state to "TITLE" so the switch statement in draw()
    // will display the title instead
    state = "TITLE";
    leftPaddle.resetScore();
    rightPaddle.resetScore();
  }
}

/////// END NEW //////

/////// NEW ///////
//randomNegative()
//
//this spits a value or its negative at random
function randomNegative(value) {
  var r = random();
  var result;
  if (r < 0.5){
    result = value;
  }
  else {
    result = -value;
  }
  return result;
}

//gameOVer
//
// this function checks if the game has been lost by one of the players
function gameOver() {
  if (leftPaddle.score === finishScore || rightPaddle.score === finishScore){
    return true;
  }
  else {
    return false;
  }
}

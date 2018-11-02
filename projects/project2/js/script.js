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
///////// END NEW ////////

/////// NEW //////
// this variable contains the score needed for the game to be over
var finishScore = 3;

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
  ball = new Ball(width/2,height/2,10,5);
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
  for (var i = 0; i < 10; i++){
    decoys.push(new Decoy(random(-50,50), random(-50.50), 0, random(0.01,0.2)));
  }
  // // setup the multiple Decoys
  for (var i = 0; i < 10; i++){
    decoys[i].setup();
  }
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

    case "GAME":
    displayGame();
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

  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // ... if it was, change the state to "GAME" so the switch statement in draw()
    // will display the game instead
    state = "GAME";
  }
}

// displayGame()
//
// This function displays the actual game
function displayGame() {
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
  for (var i = 0; i < 10; i++){
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
  for (var i = 0; i < 10; i++){
    decoys[i].display();
  }
  // decoy.display();
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
  text("PRESS SPACE TO RETURN TO TITLE", width/2, height*0.7);
  pop();
  // Check whether the spacebar was pressed to restart the game
  if (keyIsPressed && key === ' ') {
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
